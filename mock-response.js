const express = require('express');
const router = express.Router();

const app = express();

const bodyParser = require('body-parser');

const async = require("async");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3003, function (){
    console.log('Example app listening on port 3003!')
});

app.use('/mock-admin',router)

router.use(function(req, res, next) {
    console.log("Logger..");
    console.log(req.body);
    next();
});

router.post('/user', function ( req, res ){
  setTimeout(function(){
    let token = {"token": Date.now().toString()+"mocked"}
    res.send(token);
  },300);

});

router.get('user/:profileEmail', function ( req, res ){
  if(req.params.profileEmail == "inexistent_profile"){
    setTimeout(function(){
      res.send(token);
      res.status(503).send(req.params);
    },1000);
  } else {
    setTimeout(function(){
      let token = {"token": Date.now().toString()+"mocked"}
      res.send(token);
    },1500);
  }


});





