const mongoose = require('../mongo');
const https = require('https')
var csvjson = require('csvjson')
const {parse} = require('csv-parse')
const axios = require("axios")


var express = require('express')
var router =express.Router()

router.get('/', (req, res) => {
    //*Retorna todos los servicios solicitados por el usuario o todos los servicios que han existido si es admin
})

router.post('/create', (req, res) => {
    //*Crea un servicio con los datos del transporte, cargandolo en base de datos
    //* Datos del servicio === datos carta porte + status del servicio
    //* Status del servicio completado, pendiente, activo */
})
router.post("/productsFile",async (req, res) => {
    let codes 
    let productsObject = []
   
    if(req.files){
        const options = {
            delimiter: ','
        }
        codes = req.files.productos.data.toString()
        let parsedCSV = csvjson.toObject(codes, options)
        //*Se mapea y se comprueba que el codigo exista en el catalogo del sat
        await Promise.all(parsedCSV.map(async (obj) => {
                try{
                    
                    let arrayKeyProducts = Object.entries(obj)[0]
                    console.log(arrayKeyProducts)
                    let arrayKeyEmpaque = Object.entries(obj)[3]
                    let resp = await axios.get(`https://api.facturama.mx/catalogs/ProductsOrServices?keyword=${arrayKeyProducts[1]}`,{
                        headers:{
                            Authorization: "Basic R1VHWUJSQTpQYW5pYWd1YTE3",
                            Accept: "application/json"
                        }}
                    )
                    let productValue = resp.data[0]

                    let embalajeResp = await axios.get(`https://api.facturama.mx/catalogs/Units?keyword=${arrayKeyEmpaque[1]}`,{
                        headers:{
                            Authorization: "Basic R1VHWUJSQTpQYW5pYWd1YTE3",
                            Accept: "application/json"
                        }}
                    ) 
                    let empaqueValue = embalajeResp.data[0]
                    productsObject.push({
                        BienesTransp:productValue.Value ,
                        Descripcion: productValue.Name,
                        Cantidad: obj.cantidad,
                        Embalaje:empaqueValue.ShortName,
                        ClaveUnidad: obj['clave unidad peso'],
                        Unidad: obj.unidad,
                        PesoEnKg: obj['peso en kg'],
                    })
                } catch (err) {
                    console.log("Error en la petición")
                    productsObject.push({
                        BienesTransp:obj["Codigo sat"] ,
                        Descripcion:"No es un valor del catalogo del SAT",
                        Cantidad:null,
                        ClaveUnidad:null,
                        Unidad:null,
                        PesoEnKg:null,
                    })
                }


            })
        )
        res.send({Message:"Procesado con éxito", data:productsObject}).status(200)
        return

    } else {
        res.send({message:"No se han recibido los archivos", status: 400}.status(400))
        return
    }
})

module.exports = router


