const express = require('express');
const router = express.Router();

const app = express();

const bodyParser = require('body-parser');

const async = require("async");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "application/json");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!')
});

app.use('/mock-responses', router);

router.get('/', function (req, res) {
  setTimeout(function () {
    let token = {"token": Date.now().toString() + "mocked"}
    res.send(token);
  }, 300);

});

router.post('/api/user', function (req, res) {
  setTimeout(function () {
    let token = {"token": Date.now().toString() + "mocked"}
    res.send(token);
  }, 300);

});

router.get('/api/user/:profileEmail', function (req, res) {
  if (req.params.profileEmail == "gise.cpna@gmail.com") {
    setTimeout(function () {
      res.send(req.params);
    }, 1);
  } else {
    setTimeout(function () {
      let token = {"token": Date.now().toString() + "mocked"}
      res.send(token);
    }, 10);
  }

});

router.get('/radius/login', function (req, res) {
  setTimeout(function () {
    let ip = req.query.ip
    let username = req.query.username
    let password = req.query.password
    let response = {
      'username': password,
      'token': ip,
    }
    console.log("logindone");
    res.send(response);
  }, 10);
});




