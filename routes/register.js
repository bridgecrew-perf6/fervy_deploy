const mongoose = require("../mongo")
const operators = mongoose.connection.collection("Operadores")
const transports = mongoose.connection.collection("Transportes")
const {Operator} = require("../models")
const {Transport} = require("../models")
var https = require("https")

var express = require("express")
var router = express.Router()

const operatorModel = mongoose.model('operatorModel', Operator)

router.post('/operator', (req,res) => {
    console.log("Recibiendo conexiones en operadores")
    if(req.body.datos){
        console.log(req.body.datos)
        const operador = new operatorModel({
            firstName:req.body.datos.name,
            lastName:req.body.datos.lastName,
            age:req.body.datos.age,
            tipoFigura:req.body.datos.figure,
            NumLicencia:req.body.datos.licence,
            NSS:req.body.datos.nss,
            RFC:req.body.datos.rfc,
        })
        operador.save((err, data) => {
            if(err){
                console.log("Error: No ha sido posible registrar en base de datos")
                console.error(err)
            } else {
                console.log("Operador guardado exitosamente")
                console.log(data)
                return res.status(201).send({
                    message:"Operador guardado exitosamente"
                })
            }
        })
    } else {
        res.send({Message:"No se ha recibido información, conexión rechazada", status:400}.status(400))
        return
    }
})

const transportModel = new mongoose.model('transportModel', Transport)

router.post('/transport', (req, res) => {
    console.log("Recibiendo conexiones en transporte")
    if(req.body.datos){
        console.log(req.body.datos)
        const transport = new transportModel({
            type:req.body.datos.type,
            model:req.body.datos.model,
            polizaRespCivil:req.body.datos.poliza,
            polizaName:req.body.datos.polizaName,
            poliza:req.body.datos.poliza,
            permisoSCT:req.body.datos.permisoSCT,
            placaTractor:req.body.datos.placaTrac,
            placaCaja:req.body.datos.placaCaja,
            tipoRem:req.body.datos.tipoRem
        })
        transport.save((err, data) => {
            if(err){
                console.log("Error: No ha sido posible registrar en base de datos")
                console.error(err)
            } else {
                console.log("Transporte guardado exitosamente")
                console.log(data)
                return res.status(201).send({
                    message:"Transporte guardado exitosamente"
                })
            }
        })
    } else {
        return res.send({Message:"No se ha recibido información, conexión rechazada", status:400}.status(400))
    }
})

router.post('/certificates', (req, res) => {
    let cert
    let key
    let keypass
    let Rfc
    if(req.files){
        cert = Buffer.from(req.files.cert.toString('base64'))
        key = Buffer.from(req.files.key.toString('base64'))
        keypass = req.body.keypass
        Rfc = req.body.Rfc
        
        console.log(cert)
        // let buf = Buffer.from(JSON.stringify(
        //     {
        //         Rfc: Rfc,
        //         Certificate: cert,
        //         PrivateKey: key,
        //         PrivateKeyPassword: keypass
        //      }
        // )
        // )

        // res.send({Message:"Recibido exitosamente", TaxEntity: JSON.stringify({

        // })})

        // let auth = "GUGYBRA:Paniagua17" 
        // const request = https.request("https://api.facturama.mx/api-lite/csds",{
        //     method:"POST",
        //     headers: {
        //     Authorization: "Basic " + auth.toString('base64')
        // }},(resp) => {
        //     resp.on("data", (chunk) => {
        //         console.log(chunk.toString())
        //     })

        //     resp.on("end", () => {
        //         console.log("Carga completada")
        //     })
        // })
        // .on("error", (err) => {
        //     console.log("No se han podido registrar los certificados por error en la solicitud")
        //     console.error(err)
        // })
        // .on("data", (chunk) => {
        //     console.log(chunk.toString('utf-8'))
        // })

        // request.write()

        // request.end()

        // https.get("https://www.api.facturama.com.mx/api-lite/csds",{headers:{
        //     Authorization: "Basic " + auth.toString('base64')
        // }}, (resp) => {
        //     resp.on("data", (chunk) => {
        //         console.log(chunk.toString('utf-8'))
        //         console.log(chunk)
        //     })
        // })
        return
    }
    res.send("Petición incorrecta").status(400)
})

module.exports = router