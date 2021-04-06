const express = require('express');
const router = express.Router();

const app = express();

const bodyParser = require('body-parser');

const async = require("async");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "application/json");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

app.listen(3003, function () {
  console.log('Example app listening on port 3003!')
});

app.use('/mock-responses', router);

router.get('/', function (req, res) {
  setTimeout(function () {
    let token = {"token": Date.now().toString() + "mocked"}
    res.send(token);
  }, 300);

});

router.post('/api/socialmedia', function (req, res) {
  setTimeout(function () {
    console.log(req.body);
    let token = {"token": Date.now().toString() + "mocked"};
    res.send(token);
  }, 300);
});

router.post('/api/survey', function (req, res) {
  setTimeout(function () {
    console.log(req.body);
    let token = {"token": Date.now().toString() + "mocked"};
    res.send(token);
  }, 300);
});

router.get('/api/user/:profileEmail', function (req, res) {
  if (req.params.profileEmail == "gise.cpna@gmail.com") {
    setTimeout(function () {
      res.send(req.params);
    }, 1);
  } else {
    setTimeout(function () {
      //let token = {"token": Date.now().toString() + "mocked"};
      res.send(req.params);
    }, 10);
  }
});
router.get('/api/admin/config/:clientId', function (req, res) {
  switch (req.params.clientId) {
    case  "ikeallabea-shoppingmall" : {
      setTimeout(function () {
        let themeConfigured = {
          'css-colors': 'deeppurple-amber.css',
          'structure-template': 'template-1',
          'login-type': 'social-login',
          'social-login-keys': {
            'google': '',
            'facebook': '',
            'pinterest': '',
            'twitter': ''
          }
        };
        res.send(themeConfigured);
      }, 1);
      break;
    }
    case  "shopping-mall" : {
      setTimeout(function () {
        let themeConfigured = {
          'theme': 'deeppurple-amber.css',
          'template': 'template-1',
          'loginType': 'social-login',
          'loginOptions': {
            'socialLoginKeys': {
              'google': '',
              'facebook': '',
              'pinterest': '',
              'twitter': ''
            }
          }
        };
        res.send(themeConfigured);
      }, 1);
      break;
    }
    case "hotel-1" : {
      setTimeout(function () {
          let themeConfigured = {
            'theme': 'pink-bluegrey.css',
            'template': 'template-2',
            'loginType': 'survey',
            'loginOptions': {
              'surveyForm': {
                'id': 'hotel-1',
                'title': 'Podes obtener conexión a internet de manera gratuita, si nos ayudás con la siguiente encuesta',
                'fields': [
                  {
                    'id': '1571507840',
                    'type': 'textbox',
                    'config': {
                      'key': 'textbox',
                      'otherOptions': {'textType': 'text'},
                      'label': 'Lo que quieras describir de nuestro hotel',
                      'required': true,
                      'value': 'Recepción, bar, etc',
                      'order': 1
                    }
                  },
                  {
                    'id': '1571507819',
                    'type': 'rating',
                    'config': {
                      'key': 'rating',
                      'label': '¿Cómo calificaría la atención recibida al registrarse en el hotel (check in)?',
                      'otherOptions': {'maximum': 5},
                      'order': 2
                    }
                  },
                  {
                    'id': '1571508048',
                    'type': 'radio',
                    'config': {
                      'key': 'yes-no',
                      'label': 'Volverias a elegirnos para hospedarte?',
                      'otherOptions': [
                        {
                          'key': 'Sí'
                        },
                        {
                          'key': 'No sé'
                        },
                        {
                          'key': 'Puede ser ..'
                        }
                      ],
                      'order': 3
                    }
                  },
                  {
                    'id': '1571507880',
                    'type': 'textbox',
                    'config': {
                      'key': 'textbox',
                      'otherOptions': {'textType': 'text'},
                      'label': 'Queres dejarnos alguna sugerencia?',
                      'value': '..',
                      'required': false,
                      'order': 4
                    }
                  },
                  {
                    'id': '1571508821',
                    'type': 'textbox',
                    'config': {
                      'key': 'textbox',
                      'otherOptions': {'textType': 'text'},
                      'label': 'Como nos encontraste?',
                      'required': false,
                      'value': 'Redes sociales',
                      'order': 5
                    }
                  },
                  {
                    'id': '1571508049',
                    'type': 'checkbox',
                    'config': {
                      'label': 'El vestido era de color',
                      'otherOptions': [
                        {
                          'index': 0,
                          'key': 'Azul'
                        },
                        {
                          'index': 1,
                          'key': 'Dorado'
                        },
                        {
                          'index': 2,
                          'key': 'No sé'
                        }
                      ],
                      'order': 6
                    }
                  },
                  {
                    'id': '1617627751',
                    'type': 'selector',
                    'config': {
                      'label': 'Volverias a elegirnos?',
                      'otherOptions': [
                        {
                          'key': 'Azul'
                        },
                        {
                          'key': 'No sé'
                        },
                        {
                          'key': 'Puede ser ..'
                        }
                      ],
                      'order': 7
                    }
                  }
                ]
              }
            }
          };
          res.send(themeConfigured);
        }
        ,
        10
      );
      break;
    }
    case null: {
      res.status(404).send({'error': 'client not defined'})
    }
  }
})
;


router.get('/radius/login', function (req, res) {
  setTimeout(function () {
    let ip = req.query.ip;
    let username = req.query.username;
    let password = req.query.password;
    let response = {
      'username': password,
      'token': ip,
    };
    res.send(response);
  }, 10);
});




