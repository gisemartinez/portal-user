let express = require('express'),
  router = express.Router();

const ClientCollectedData = require('./db/models/client_social_media_collected_data');

function fetchCollectedData(req) {
  return ClientCollectedData.findAll({
    where: {
      client_id: req.params.clientId
    }
  })
}

router.get('/collectedData/:clientId',
  function (req, res) {
    fetchCollectedData(req).then(result => {
      if (result) {
        res.send({'data': result});
      } else {
        res.status(503).send({'token': req.body})
      }
    }).catch(err => {
      res.status(503).send({'error': err.stack})
    });
  });

module.exports = router;
