const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const debug = require('debug');
dotenv.config();

var usersRouter = require('./routes/users');

// const mongoConnect = mongoose.connect('mongodb://127.0.0.1:27017/northwind', {useNewUrlParser:true});
const mongoConnect = mongoose.connect('mongodb://127.0.0.1:27017/northwind', {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected sucessfully ')
    },
    error => {
        console.log('Could not connected to database : ' + error)
    }
)
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const PORT = process.env.PORT || '3000';

app.set(PORT);

// var server = http.createServer(app);

// server.listen(PORT, function() { 
//     console.log("Listening on port " + PORT ); 
// });
// server.on('error', onError);
// server.on('listening', onListening);
app.use('/users', usersRouter);

/**
 * Event listener for HTTP server "error" event.
 */
app.listen(PORT, () => {
 console.log("Server listening on port " + PORT);
});
// function onError(error) {
//     if (error.syscall !== 'listen') {
//       throw error;
//     }
  
//     var bind = typeof port === 'string'
//       ? 'Pipe ' + port
//       : 'Port ' + port;
  
//     // handle specific listen errors with friendly messages
//     switch (error.code) {
//       case 'EACCES':
//         console.error(bind + ' requires elevated privileges');
//         process.exit(1);
//         break;
//       case 'EADDRINUSE':
//         console.error(bind + ' is already in use');
//         process.exit(1);
//         break;
//       default:
//         throw error;
//     }
//   }
  
//   /**
//    * Event listener for HTTP server "listening" event.
//    */
  
// function onListening() {
//     var addr = server.address();
//     var bind = typeof addr === 'string'
//       ? 'pipe ' + addr
//       : 'port ' + addr.port;
//     debug('Listening on ' + bind);
// }    
