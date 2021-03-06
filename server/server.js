// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const server = http.createServer(app);
let io = require('socket.io')(server);
let radiusCall = require('./radius_validator.js')(io);
let socialLoginAuth = require('./social_login_auth');
let survey = require('./survey_answers.js');
let clientConf = require('./client_conf.js');
let visitors = require('./visitors_collected_data');
const db = require('./db/models');


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// Point static path to dist
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/assets/:file', (req, res) => {
  res.sendFile(path.join(__dirname, '../assets/' + req.params.file));
});

app.use('/auth', socialLoginAuth);
app.use('/auth', survey);
app.use('/visitors', visitors);
app.use('/radiuscall', radiusCall);
app.use('/conf', clientConf);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

io.on('connection', (socket) => {
  console.log('user connected: ' + socket.id);

  socket.on('connect', () => {
    console.log('connected to socket id' + socket.id)
  });

  socket.on('join', function (data) {
    console.log('joined to room: '+ JSON.stringify(data))
    socket.join(data);
  });

  socket.on('client init.sql', function () {
    console.log(' client init.sql');
    socket.emit('connection', {success: true})
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.emit('id', socket.id); // send each client their socket id

});

db.authenticate()
  .then(() => console.log("Database ok"))
  .catch(err => console.log('Error: ' + err));

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Express server running on localhost:${port}`));

