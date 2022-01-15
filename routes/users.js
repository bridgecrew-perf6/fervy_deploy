const mongoose = require('../mongo');
const users = mongoose.connection.collection("users");;
const ObjectId = require('mongodb').ObjectId;

var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    users.find()
    .toArray((error, items) => {
        return res.status(200).send(items);
    });
});

router.get('/:id', (req, res) => {
    // * Obtener carta por ID
   users.findOne({ "_id" : ObjectId(req.params.id.substring(0, 12)) }, (error, item) => {
        if (error) {
            console.error(`Error la obtener el usuario: ${req.params.id}`, er)
            return res.status(400).send(er);
        }
        return res.status(200).send({
            "success": true,
            "message": `El usuario con ID: ${req.params.id} ha sido obtenido correctamente`,
            "item": item
        });
    });
});

module.exports = router;