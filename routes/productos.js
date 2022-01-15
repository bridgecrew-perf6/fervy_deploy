const mongoose = require('../mongo');
const productos = mongoose.connection.collection("productos");;
const ObjectId = require('mongodb').ObjectId;

var express = require('express');
var router = express.Router();



router.get("/:uid", (req, res) => {
    // * Obtener todos los productos de dicho usuario
    productos.find({ "owner": req.params.uid }).toArray((err, items) => {   
        if (err) {
            return res.status(400).send({
                "success": false,
                "message": err.message,
                "error": err
            });
        }
        return res.status(200).send({
            "success": true,
            "message": `Con éxito se encontraron ${items.length} productos`,
            "productos": items
        });
    });
});

router.get("/:uid/:pid", (req, res) => {
    // * Obtener un producto de dicho usuario
    productos.findOne({ "owner": req.params.uid, "_id": ObjectId(req.params.pid) }, (err, producto) => {
        if (err) {
            return res.status(400).send({
                "success": false,
                "message": err.message,
                "error": err
            });
        }
        return res.status(200).send({
            "success": true,
            "message": `El producto con ID: ${req.params.pid} del usuario: ${req.params.uid} ha sido encontrado correctamente`,
            "productos": producto
        });
    });
});

router.put("/:uid/:pid", (req, res) => {
    // * Obtener un producto de dicho usuario
    productos.updateOne({ "owner": ObjectId(req.params.uid), "_id": ObjectId(req.params.pid) }, {"$set": req.body}, (err, producto) => {
        if (err) {
            return res.status(400).send({
                "success": false,
                "message": err.message,
                "error": err
            });
        }
        return res.status(200).send({
            "success": true,
            "message": `El producto con ID: ${req.params.pid} del usuario: ${req.params.uid} ha sido actualizado correctamente`,
            "productos": producto
        });
    });
});

router.post("/:uid", (req, res) => {
    // * Obtener un producto de dicho usuario
    productos.insertMany(req.body, (err, items) => {
        if (err) {
            return res.status(400).send({
                "success": false,
                "message": err.message,
                "error": err
            });
        }
        return res.status(200).send({
            "success": true,
            "message": `Los productos ${req.body.length} del usuario: ${req.params.uid} han sido añadidos correctamente`,
            "productos": items
        });
    });
});