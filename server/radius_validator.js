
let express = require('express'),
  router = express.Router();


module.exports = function(io) {
  router.get('/:usermail',
    function ( req, res ){
      io.sockets.in(req.params.usermail).emit('validated', {msg: 'user'+ req.params.usermail});
      res.send();
    });
  return router;

};
