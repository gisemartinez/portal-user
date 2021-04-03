let express = require('express'),
  router = express.Router(),
  request = require('request');

const config = require('./config');
const RadCheck = require('./db/models/radcheck');


//Step 1: Send data from profile to Admin
function sendProfileInfoToAdmin(req, res, next) {
  return new Promise(function (resolve, reject) {
    let url = config['adminDashboard'] + '/survey';

    request.post(
      url,
      {
        json: true,
        body: {
          'survey_identifier': req.body.identifier, //used to allow radius access
          'answers': req.body.answers
        }
      },
      function (err, response) {
        if (err) {
          reject(err);
        }
        next();
      }
    );
  })
}

//Step 2: Send data to Radius
function persistUserInRadiusDB( req, res, next ){
  return RadCheck.findOrCreate({
    where: {
      username: req.body.identifier,
      value: 'survey_' + req.body.identifier
    }
  }).then(function ( model ){
    req.radius_result = model;
    return model;
  })
}

router.post('/survey',
  sendProfileInfoToAdmin,
  function ( req, res ){
    persistUserInRadiusDB(req,res).then(result => {
      if ( result ){
        res.send({ 'username': req.body.identifier });
      } else {
        res.status(503).send({ 'token': req.body })
      }}).catch(  err => {
      res.status(503).send({ 'error': err.stack })
    });
  });


module.exports = router;

