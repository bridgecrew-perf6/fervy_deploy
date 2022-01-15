const admin = require('firebase-admin');

require('dotenv').config({
    path: "./.env"
})

const config = require('./ferby-abbd4-firebase-adminsdk-e4kod-21dae5bcf1.json');

admin.initializeApp({
    credential: admin.credential.cert(config)
});

module.exports = admin;