// const express = require('express')
// const app  = express()
// const xml2js = require('xml2js').parseString
// const nodemailer = require('nodemailer')
// const mongoose = require('mongoose')
// const cors = require('cors')
// const {MongoClient}  = require('mongodb')
// const bodyParser = require('body-parser')
// var uploadFiles = require('express-fileupload')

// // require('body-parser-xml')(bodyParser)

// require('dotenv').config('./.env')


// const uri = process.env['MONGO_URI'] ||"mongodb://localhost:27017"
// const PORT = process.env.PORT || 3000 

// const whiteList =  [ "http://localHost:3000"]
// config = {
//     origin: (origin, callback) => {
//       if (whiteList.includes(origin) || !origin){
//           callback(null, true)
//       }  else {
//           callback(new Error('Conexión desde ' + origin + ' no permitida'))
//       }
//     }
// }

// app.use(cors(config), express.urlencoded())
// app.use(express.xml())
// app.use(uploadFiles())

// const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology:true})
// client.connect(err => {
//     if (err){
//         console.error("Error al conectarse a Mongo: " + err)
//     } else{
//         console.log("Conectado exitosamente")
//     }
// })

// client.close()
// app.listen(PORT || 3000, function(){
//     console.log("Está conectado al servidor")
// })
