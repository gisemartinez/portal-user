// Get dependencies
const express    = require('express');
const path       = require('path');
const http       = require('http');
const fs         = require('fs');
const promise = require('bluebird');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
let io = require('socket.io')(server);
let radiusCall = require('./radius_validator.js')(io);
let auth = require('./google_auth.js');
require('./db/mysql-service.js')(app);


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/assets/:file', (req, res) => {
    res.sendFile(path.join(__dirname, '../assets/'+req.params.file));
});

app.use('/auth',auth);
app.use('/radiuscall',radiusCall);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);


/**
 * Create HTTP server.
 */



/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Express server running on localhost:${port}`));


io.on('connect', (socket) => {
    console.log('user connected');

    socket.on('connect', () => {
        console.log('connected')
    });

    socket.on('client init', function(){
        console.log('client init');
        socket.emit('connection', { success : true})
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });

});
