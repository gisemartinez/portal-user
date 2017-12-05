
let express = require('express'),
  router = express.Router();


module.exports = function(io) {

  router.get('/',
    function ( req, res ){
      io.sockets.emit('validated');
      res.send();
    });

  return router;

};
