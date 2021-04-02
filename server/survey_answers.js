let express = require('express'),
  router = express.Router(),
  request = require('request');

const config = require('./config');
const RadCheck = require('./db/models/radcheck');


//Step 1: Send data from profile to Admin
function sendProfileInfoToAdmin(req, res, next) {
  return new Promise(function (resolve, reject) {
    let url = config['adminDashboard'] + '/survey';
    let answers = req.body;
    let identifier = answers['1571507840'];

    request.post(
      url,
      {
        json: true,
        body: {
          'survey_identifier': identifier, //used to allow radius access
          'answers': answers
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
      username: req.body['1571507840'] || 'empty_email',
      value: 'survey_' + req.body['1571507840']
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
        res.send({ 'username': req.body['1571507840'] });
      } else {
        res.status(503).send({ 'token': req.token })
      }}).catch(  err => {
      res.status(503).send({ 'error': err.stack })
    });
  });


module.exports = router;

