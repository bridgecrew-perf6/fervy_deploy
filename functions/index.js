const express = require("express");
const app = express();
const fileUpload = require('express-fileupload')
const path = require('path')

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

const { 
  isAuthorized, 
  isAuthenticated, 
  validateCartaPorte, 
  authRouter 
} = require('./routes/auth') 
const cartasRouter = require('./routes/cartas')
const serviceRouter = require('./routes/services')
const registerRouter = require('./routes/register')
const dataRouter = require('./routes/data')



var port = normalizePort(process.env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */


const buildPath = path.join(__dirname, '..', 'build')
   
app.use(express.static(buildPath))

app.use(express.json());
app.use(fileUpload())
const cors = require("cors");
// const { getAllCartas, postCarta, getCartaById, updateCarta, deleteCarta } = require('./routes/cartas');

app.use(cors());
// const list =  [
  //   "http://localhost:3000",
  //   "http://192.168.100.110:3000",
  //   "https://ferbytransportes.com"
  // ]
  // const local = list[0]
  // const fervyOffice = list[1] 
  // const home = list[0] 
  // const production = list[2] 
  // app.use((req, res, next) => {
    //     res.header("Access-Control-Allow-Origin",home);
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     next();
    // }); 
    
    
    const roles = {
      admin: ['admin'], // Only SA & Admin has access
      driver: ['admin', 'driver'], // Only SA & Admin & Editor has access
      user: ['admin', 'user'], // Everyone has access
    }
    

    //*routing in production
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'build', 'index.html')) 
    })
    
    /* 
    * CRUD de cartas porte 
    */
   // app.use('/carta',  isAuthenticated, isAuthorized(roles.user),cartasRouter)
   app.use('/carta',  cartasRouter)
   app.use('/service', serviceRouter)
   // app.use('/service',  isAuthenticated, isAuthorized(roles.user),serviceRouter)
   // app.use('/register',  isAuthenticated, isAuthorized(roles.user),registerRouter)
  app.use('/register',registerRouter)
/*
* QUERIES
 */ 
// app.use('/data',  isAuthenticated, isAuthorized(roles.user),operatorsRouter)
app.use('*/data',dataRouter)
app.use('/auth',authRouter);
// app.get("/carta", isAuthenticated, isAuthorized(roles.user), getAllCartas);
// app.get("/carta/:id", isAuthenticated, isAuthorized(roles.user), getCartaById);
// app.delete("/carta/:id", isAuthenticated, isAuthorized(roles.user), deleteCarta);
// app.post("/carta", isAuthenticated, isAuthorized(roles.user), validateCartaPorte, postCarta);
// app.put("/carta/:id", isAuthenticated, isAuthorized(roles.user), validateCartaPorte, updateCarta);
// app.post('/api/porte', isAuthenticated, isAuthorized(roles.user), cartaPorte)


var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

 function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
      default:
        throw error;
    }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log('Listening on ' + bind);
  }