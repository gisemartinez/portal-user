let express = require('express'),
  router = express.Router();

const RadCheck = require('./db/models/radcheck');
const ClientDataCollector = require('./db/models/client_visitor_collected_data');


function saveAnswers(req) {
  return ClientDataCollector.findOrCreate({
    where: {
      client_id: req.params.clientId,
      visitor_identifier: req.body.identifier
    },
    defaults: {
      client_id: req.params.clientId,
      visitorIdentifier: req.body.identifier,
      rawData: req.body.answers
    }
  }).then(function () {
    return RadCheck.findOrCreate({
      where: {
        username: req.body.identifier,
        value: 'survey_' + req.body.identifier
      }
    })
  }).then(() => new Promise(function (resolve, reject) {
    resolve(req)
  }))
}


router.post('/survey/:clientId',
  function (req, res) {
    saveAnswers(req).then(result => {
      if (result) {
        res.send({'username': req.body.identifier});
      } else {
        res.status(503).send({'token': req.body.identifier})
      }
    }).catch(err => {
      res.status(503).send({'error': err.stack})
    });
  });


module.exports = router;

