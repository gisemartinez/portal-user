
let express = require('express'),
  router = express.Router();


module.exports = function(io) {
  router.get('/:usermail',
    function ( req, res ){
      const socketId = req.query.socketId
      console.log('socket id '+ JSON.stringify(socketId));
      console.log('mail'+ req.params.usermail);
      //io.sockets.emit('validated',{user: req.query.usermail + 'sockets emit'});
      io.sockets.in(req.params.usermail).emit('validated', {msg: 'hello'});
      res.send();
    });

  return router;

};
