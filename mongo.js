//Import Mongoose
const mongoose = require("mongoose");
//Set URI
const URI = process.env.MONGODB_URI;
//Store Connection Object
//Config Object to Avoid Deprecation Warnings
const config = {useNewUrlParser:true, useUnifiedTopology:true};

mongoose.connect(URI, config);
const db = mongoose.connection;

//CONNECTION EVENTS
db.on("open", () => {
    console.log(`You are connected to Mongo`);
})
.on("error", (err) => {
    console.log("No se ha podido conectar a la instancia de mongo")
    console.log(err);
})
.on("close", () => {
    console.log(`You are no longer connected to Mongo`);
});

module.exports = mongoose