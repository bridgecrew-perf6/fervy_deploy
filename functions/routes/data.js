const mongoose =  require('../mongo')
const operadores = mongoose.connection.collection("operatormodels")
const transports = mongoose.connection.collection("transportmodels")

var express = require("express")
var router = express.Router()

router.get('/operators', (req, res) => {
    let objReturn = []
    operadores.find({}).toArray((err, items) => {
        if(err){
            return res.status(400).send({
                message:err.message,
                err:err
            })
        }

        items.forEach((obj) => {
            objReturn = [
                ...objReturn,
                {
                    id:obj._id,
                    firstName:obj.firstName,
                    lastName:obj.lastName,
                    age:obj.age,
                    TipoFigura:obj.tipoFigura,
                    NumLicencia:obj.NumLicencia,
                    NSS:obj.NSS,
                    RFC:obj.RFC
                }
        ]
        })
        console.log(objReturn)
        
        return res.status(200).send({
            message:"Datos obtenidos con exito",
            data:objReturn
        })
    })
    
})

router.get('/transports', (req, res) => {
    let objReturn = []
    transports.find({}).toArray((err, items) => {
        if(err){
            return res.status(400).send({
                message:err.message,
                err:err
            })
        }

        items.forEach((obj) => {
            objReturn = [
                ...objReturn,
                {
                    id:obj._id,
                    ConfigVehicular:obj.type,
                    año:obj.model,
                    poliza:obj.poliza,
                    permisoSCT:"TPAF01",
                    NUMpermisoSCT:obj.permisoSCT,
                    placa_trac:obj.placaTractor,
                    placa_caja:obj.placaCaja,
                    SubtipoRem:obj.tipoRem,
                    aeguraRespCivil:obj.polizaName,
                    polizaRespCivil:obj.poliza,
                }
        ]
        })
        console.log(objReturn)
        
        return res.status(200).send({
            message:"Datos obtenidos con exito",
            data:objReturn
        })
    })
    
})

module.exports = router