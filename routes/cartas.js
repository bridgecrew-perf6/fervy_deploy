const mongoose = require('../mongo');
const cartas = mongoose.connection.collection("cartas");;
const xml2js = require('xml2js').parseString
const ObjectId = require('mongodb').ObjectId;


var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    // * Obtener todas las cartas
    cartas.find()
    .toArray((error, items) => {
        return res.status(200).send(items);
    });
});

router.get('/:id', (req, res) => {
    // * Obtener carta por ID
    cartas.findOne({ "_id" : ObjectId(req.params.id) }, (error, item) => {
        if (error) {
            console.error(`Error la obtener la carta: ${req.params.id}`, er)
            return res.status(400).send(er);
        }
        return res.status(200).send({
            "success": true,
            "message": `La carta con ID: ${req.params.id} ha sido obtenida correctamente`,
            "item": item
        });
    });
});

router.delete('/:id', (req, res) => {
    // * Borrar carta por ID
    cartas.deleteOne({ "_id" : ObjectId(req.params.id) }, (error, item) => {
        if (error) {
            console.error(`Error la borrar la carta: ${req.params.id}`, er)
            return res.status(400).send(er);
        }
        return res.status(200).send({
            "success": true,
            "message": `La carta con ID: ${req.params.id} ha sido borrada correctamente`,
            "item": item
        })
    });
});

router.put('/:id', (req, res) => {
    cartas.updateOne({ "_id" : ObjectId(req.params.id) }, {'$set': req.body}, (error, item) => {
        if (error) {
            console.error(`Error la actualizar la carta: ${req.params.id}`, er)
            return res.status(400).send(er);
        }
        return res.status(200).send({
            "success": true,
            "message": `La carta con ID: ${req.params.id} ha sido actualizada correctamente`
        });
    });
});

router.post('/', (req, res) => {
    // * Sube nueva carta porte
    cartas.insertOne(req.body, (error, item) => {
        if (error) {
            console.error("Error al escribir la carta en MongoDB", er)
            return res.status(400).send(er);
        }
        return res.status(201).send(item);
    })
});


router.post('/cartaPorte', async (req,res)=> {
    // * Comprobar recepción de archivos
    if (req.files) {
        let file = req.files
        console.log(file)
        let fileType = file[''] ? file[''].mimetype : file.CartaPorte.mimetype

        console.log(fileType)
        if(fileType === "text/xml" || "application/xml"){
            let fileData = file[''] ? file[''].data : file.CartaPorte.data
            let merch = []
            xml2js(fileData.toString(), (err, result) => {
                if(err){
                    res.send(err).status(500)
                    return
                }

                result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Mercancias'][0]['cartaporte20:Mercancia'].map((obj, res) => {
                    merch.push(obj["$"])
                })

                let porteJson = {
                    Receiver:{
                        Nombre:result.CARTAPORTEMX_V2.Receptor[0]['$'].Nombre,
                        Rfc:result.CARTAPORTEMX_V2.Receptor[0]['$'].Rfc,
                        CfdiUse:null
                    },
                    CfdiType:null,
                    PaymentForm:null,
                    PaymentMethod:null,
                    Currency:null,
                    NameId:null,
                    ExpeditionPlace:null,
                    Items:[
                        {
                            Quantity: null,
                            ProductCode: null,
                            UnitCode: "E48",
                            Description: null,
                            IdentificationNumber: null,
                            UnitPrice: null,
                            Subtotal: null,
                            Taxes: [
                                {
                                    "Name": "IVA RET",
                                    "IsRetention":"true",
                                    "Rate": "0.04",
                                    Base: null,
                                    Total:null
                                },
                                {
                                    "Name": "IVA",
                                    "Rate": "0.16",
                                    Base:null,
                                    Total:null
                                }
                            ],
                            Total: null
                        }
                    ],
                    Complemento:{
                        CartaPorte20:{
                            TranspInternac:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['$'].TranspInternac,
                            Ubicaciones:[
                                {
                                    TipoUbicacion:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][0]['$'].TipoUbicacion,
                                    RFCRemitenteDestinatario:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][0]['$'].RFCRemitenteDestinatario,
                                    FechaHoraSalidaLlegada:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][0]['$'].FechaHoraSalidaLlegada,
                                    Domicilio:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][0]['cartaporte20:Domicilio'][0]['$']
                                },
                                {
                                    TipoUbicacion:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][1]['$'].TipoUbicacion,
                                    RFCRemitenteDestinatario:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][1]['$'].RFCRemitenteDestinatario,
                                    FechaHoraSalidaLlegada:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][1]['$'].FechaHoraSalidaLlegada,
                                    DistanciaRecorrida:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][1]['$'].DistanciaRecorrida,
                                    Domicilio:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Ubicaciones'][0]['cartaporte20:Ubicacion'][1]['cartaporte20:Domicilio'][0]['$']
                                }
                            ],
                            Mercancias:{
                                UnidadPeso:"KGM",
                                NumTotalMercancias:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Mercancias'][0]['$'].NumTotalMercancias,
                                PesoBrutoTotal:result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:Mercancias'][0]['$'].PesoBrutoTotal,
                                Mercancia:merch,
                                AutoTransporte:{
                                    PermSCT:"TPAF01",
                                    NumPermisoSCT:null,
                                    IdentificacionVehicular: {
                                        ConfigVehicular:null,
                                        PlacaVM:null,
                                        AnioModeloVM:null
                                    },
                                    Seguros:{
                                        AseguraRespCivil:null,
                                        PolizaRespCivil:null
                                    }
                                }
                            },
                            FiguraTransporte:[result.CARTAPORTEMX_V2.Complemento[0]['cartaporte20:CartaPorte'][0]['cartaporte20:FiguraTransporte'][0]['cartaporte20:TiposFigura'][0]['$']],
                        },
                    }
                }


                return res.status(200).send({message:"Archivos recibidos y procesados exitosamente", cartaJson:porteJson})

            })
        }
    } else {
        return res.status(400).send("El archivo enviado no tiene el formato correcto")
    }
})

router.post('/timbrar', (req, res) => {
    console.log(req.body.carta.Complemento.CartaPorte20.Ubicaciones)
})
    // if (req.files[''].mimetype || req.files.CartaPorte.mimetype === "application/xml"){
    //     res.json({"message":"XML recibido exitosamente", "status":200})
    //     //procesamiento de xml carta porte
    //     let json
    //     let xmlBuffer = req.files[''].data || req.files.CartaPorte.data
    //     let xml = xmlBuffer.toString()
        // xml2js(xml, (err, result) => {
        //     if (err) {
        //         res.send("No se ah podido procesar el archivo XML: " + err)
        //         return
        //     }

        //      json = result

        //      console.log(result)
        //      console.log(json)
        // })

        // envio de carta porte al correo de quien sea necesario o sellado y timbrado de la misma
        // let testAccount = await nodemailer.createTestAccount()
        
        // //transporter testeado en cuenta personal de gmail con LessSecureApps activado.
        // let transporter = nodemailer.createTransport({
        //     host: "smtp.gmail.com",
        //     port: 465,
        //     secure: true, // true for 465, false for other ports
        //     auth: {
        //       user: "luismtzesq@gmail.com", // utlizar gmail o server SMTP(evitar problemas de login con SMTP) 
        //       pass: "qu3t31mp0rt4", // implementar con password generado por servicio de ferby (si es gmail)
        //     },
        //   });
        
        //   // send mail with defined transport object
        //   try {
        //       let info = await transporter.sendMail({
        //         from: '"El esquizo" luismtzesq@gmail.com', // sender address
        //         to: "luismtzesq@gmail.com", // list of receivers
        //         subject: "Hello ✔", // Subject line
        //         text: "Hello world?", // plain text body
        //         html: "<b>Hello world?</b>", // html body
        //         attachments: [
        //             {
        //                 filename:req.files[''].name,
        //                 contentType:req.files[''].mimetype,
        //                 content:xmlBuffer
        //             }
        //         ]
        //       });
            
        //       console.log("Message sent: %s", info.messageId);
        //       // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
        //       // Preview only available when sending through an Ethereal account
        //       console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        //       // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        //   } catch(err){
        //     console.error(`Error al hacer test: ${err}`)
        //   }
    // }


    //conexion con api carta cartaPorte
    //respuesta con carta porte
// })

module.exports = router;