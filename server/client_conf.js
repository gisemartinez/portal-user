let express = require('express'),
  router = express.Router(),
  request = require('request');

const ClientLanding = require('./db/models/client_landing');
const ClientAuth = require('./db/models/client_auth');


function fetchClientLanding( req, res, next ){
  return ClientLanding.findOne({
    where: {
      client_id: req.params.clientId
    }
  })
}

function fetchClientAuth( req, res, next ){
  return ClientAuth.findOne({
    where: {
      client_id: req.params.clientId
    }
  }).then(clientAuth=>
    clientAuth.getClient().then( client =>
      new Promise(function (resolve, reject){
        resolve({'authData':clientAuth, 'clientData': client })
      }
    )
   ))
}
router.get('/clientLanding/:clientId',
  function ( req, res ){
    fetchClientLanding(req,res).then(result => {
      if ( result ){
        res.send({ 'data': result });
      } else {
        res.status(503).send({ 'token': req.body })
      }}).catch(  err => {
      res.status(503).send({ 'error': err.stack })
    });
  });

router.get('/clientAuth/:clientId',
  function ( req, res ){
    fetchClientAuth(req,res).then(result => {
      if ( result ){
        res.send({ 'data': result });
      } else {
        res.status(503).send({ 'token': req.body })
      }}).catch(  err => {
      res.status(503).send({ 'error': err.stack })
    });
  });

module.exports = router;

