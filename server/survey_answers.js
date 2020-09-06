let express = require('express'),
  router = express.Router(),
  request = require('request');

const config = require('./config');
const models = require('./db/models');
let urls = require('./const');


function ensureAuthenticated( req, res, next ){
  if ( !req.header('Authorization') ){
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  let token = req.header('Authorization').split(' ')[ 1 ];

  let payload = null;
  try {
    payload = jwt.decode(token, config[ 'TOKEN_SECRET' ]);
  }
  catch ( err ) {
    return res.status(401).send({ message: err.message });
  }

  if ( payload.exp <= DateFNS.getUnixTime() ){
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
}


function createOneUser( req, res, next ){
  request.post(
    config[ 'adminDashboard' ] + '/user',
    {
      json: true,
      body: {
        'email': req.profile,
        'surveyAnswers': req.answers
      }
    },
    function ( err, response, user_token ){
      if ( err ){
        req.lostInfoForAdmin = true;
      }
      next();
    }
  );
}

//Step 3: Send data from profile to Admin
function sendProfileInfoToAdmin( req, res, next ){
  return new Promise(function ( resolve,reject ){
    let url = config[ 'adminDashboard' ] + 'user/' + req.email;

    request.get(
      url,
      function ( err, response, user_token ){
        if ( err ){
          createOneUser(req, res, next);
          resolve(err);
        } else {
          resolve();
          next();
        }

      }
    );
  })
}

//Step 4: Send data to Radius
function persistUserInRadiusDB( req, res, next ){
  return models.RadCheck.findOrCreate({
    where: {
      username: req.consolidated_profile.emailAddresses[0].value,
      value: req.consolidated_profile.etag
    }
  }).then(function ( model ){
    req.radius_result = model;
    return model;
  })
}

router.post('/using_survey',
  sendProfileInfoToAdmin,
  function ( req, res ){
    persistUserInRadiusDB(req,res).then(result => {
      if ( result ){
        res.send({ 'username':req.email });
      } else {
        res.status(503).send({ 'token': req.token })
      }}).catch(  err => {
      res.status(503).send({ 'error': err.stack })
    });
  });


module.exports = router;

