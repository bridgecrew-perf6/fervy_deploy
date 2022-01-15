const firebase = require('../firebase');
const auth = firebase.auth();
const mongoose = require('../mongo');
const users = mongoose.connection.collection("users");
const ObjectId = require('mongodb').ObjectId;

var express = require('express');
var router = express.Router();

exports.isAuthorized = (hasRole, sameId = false) => {
    return (req, res, next) => {
        
        next();
        const { role, uid } = res.locals;

        if ( sameId && role === "user" && req.params.uid !== uid) {
            return res.status(403).send({ status: 'Unauthorized', message: "El usuario no puede acceder a la información de otro usuario" });
        } else if (!role) { // * no tiene rol el usuario
            return res.status(403).send({ status: 'Unauthorized', message: "El usuario no tiene rol" });
        } else if (hasRole.indexOf(role) > -1) { 
            // * revisa que el rol del usuario contenga los permitidos 
            return 
        }

        return res.status(403).send({ status: 'Unauthorized', message: "El usuario no tiene rol" });
    }
}

exports.isAuthenticated = (req, res, next) => {
    /* 
     * Verifica que el request contenga un ID Token.
     - Por convención el authorization header al portar 
     - un string 'Bearer ' justo antes del tokenId.
    */
   next()
    if (!(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) &&
    !(req.cookies && req.cookies.__session)) {
            console.error('Ningun Firebase ID token fue pasado como Bearer token en el Authorization header.',
            'Asegurate que autorizas tu request proveyendo el siguiente HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'o pasando una "__session" cookie.');
            return res.status(403).send({ 
                state:'Unauthorized',
                message: 'No se encontró un Token o Session en el request'
            });
    }

    let idToken;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        // * En este caso se encuentra exitosamente un formato de string que comience con 'Bearer '.
        //console.log('Encontrado "Authorization" header');
        // * Lee el ID Token del authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        // * Si no encuentra el authorization header procede a revisar si el reques cuenta con cookies de sesión.
        console.log('Encontrado "__session" cookie');
        // * Lee el ID Token de la cookie.
        idToken = req.cookies.__session;
    } else {
        // * No se encontró ni un authorization header válido o alguna cookie. 
        return res.status(403).send({ 
            state:'Unauthorized',
            message: 'No se encontró un Token o Session en el request'
        });
    }


    console.log(idToken)
    // * Una vez obtenido el ID Token, procedemos a verificar que sea correcto mediante firebase auth
    auth.verifyIdToken(idToken)
    .then( decodedIdToken => { // * Obtenemos el decodedIDToken como resultado de una operación exitosa
        console.log('ID Token verificado!');
        
        if (decodedIdToken.role === undefined) {
            console.log("Usuario sin rol asignado :C\nAsignando rol de 'user'")
            auth.setCustomUserClaims(decodedIdToken.uid, { role: "user" })
            .then(() => {
                console.log('Usuario registrado con rol "user" correctamente!');
                res.locals = { ...res.locals, uid: decodedIdToken.uid, role: "user" }
            })
            .catch( error => {
                console.error('Error asignando el rol de "user" al usuario', error)
                return res.status(400).send(error);
            })
        } else {
            //console.log("Usuario con rol")
            res.locals = { ...res.locals, uid: decodedIdToken.uid, role: decodedIdToken.role }
        }
        next();
    })
    .catch( error => {
        console.error('Error al verififcar el Firebase ID token:', error);
        return res.status(403).send({ 
            state:'Unauthorized',
            message: 'El Token o Cookie ya expiró o no es válido.'
        });
    });
}

exports.validateCartaPorte = (req, res, next) => {

    // * En esta objeto constante debe ir la estructura que debe seguir la carta porte 

    const { CartaPorte, Producto } = require('../models')

    let carta = req.body;

    let cartaValid = new CartaPorte(carta);
    let error = cartaValid.validateSync();

    // * Misma estructura en propiedades inicales
    // TODO: Pero también en los prductos debe coincidir el formato
    for (i in template)
        if (!carta.hasOwnProperty(i)) 
            return false;
    return true;
}

const createNewUserWithEmailAndPassword = (req, res) => {
    auth.createUser({
        email: req.body.email,
        password: req.body.password,
        disabled: false,
    })
    .then( user => {
        
        console.log("¡Usuario creado en firebase exitosamente! " + user.uid);
        users.insertOne({
            "_id": ObjectId(user.uid.substring(0,12)),
            ...req.body.userdata
        })
        .then(item => {
            console.log("¡Usuario creado en MongoDB exitosamente!");

            auth.setCustomUserClaims(user.uid, { role: "user" })
            .then(() => {
                console.log("Usuario asignado el rol de usuario exitosamente!");
                return res.status(201).send({
                    "success": true,
                    "message": "El usuario fue creado en firebase y MongoDB exitosamente",
                    "mongo_record": item,
                    "user": user
                });
            })
            .catch(err => {
                console.log("Hubo un error actualizando el rol del usuario");
                return res.status(400).send({
                    "success": false,
                    "message": err.message,
                    "error": {...err}
                });
            });     
        })
        .catch(err => {
            console.log("Hubo un error registrando el usuario en MongoDB");
            console.log(err.message)
            return res.status(400).send({
                "success": false,
                "message": err.message,
                "error": err
            });
        });
        

    })
    .catch(err => {
        console.log("Hubo un error registrando el usuario en FirebaseAuth");
        return res.status(400).send({
            "success": false,
            "message": err.message,
            "error": {...err}
        });
    });
}

router.post('/signup', createNewUserWithEmailAndPassword)

exports.authRouter = router;
