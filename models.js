const mongoose = require('mongoose');

const Producto = new mongoose.Schema({
    owner: String,
    nombre: String,
    idBienes: String,
    descripcion: String,
    unidadPeso: String,
    matPeligroso: String,
    embalaje: String,
    descEmbalaje: String,
    pesoInd: String,
});

const CartaPorte = new mongoose.Schema({
    fecha: String,
    cliente: {
        nombre: String,
        direccion: String,
        RFC: String,
    },
    productos: [{ // * Arreglo que contendrá la informacion de los productos
        producto: Producto,
        cantidad: Number,
    }], 
    pesoTotal: Number,
    remitente: Object,
    destinatarios: [{
        nombre: String,
        direccion: String,
        RFC: String,
        pais: String,
        llegada: String,

    }],
    distancia: Number,
    transporte: {
        operador: {
            nombre: String,
            licencia: String,
            RFC: String,
            NSS: String,
        },
        descripcion: String,
        nomenclatura: String,
        permisoSCT: Number,
        placaTractor: String,
        placaCaja: String,
        modelo: String,
        aseguradora: {
            nombre: String,
            poliza: String,
        }
    }

})


const Operator = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    tipoFigura:String,
    NumLicencia:String,
    NSS:Number,
    RFC:String
})

const Transport = new mongoose.Schema({
    type:String, 
    model:Number,
    poliza:String,
    permisoSCT:String,
    placaTractor:String, 
    placaCaja:String,
    tipoRem:String,
    polizaName:String
})

module.exports = { Producto, CartaPorte, Operator, Transport }