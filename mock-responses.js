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

router.post('/api/user', function (req, res) {
  setTimeout(function () {
    let token = {"token": Date.now().toString() + "mocked"}
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
      let token = {"token": Date.now().toString() + "mocked"}
      res.send(token);
    }, 10);
  }
});
router.get('/api/admin/config/:clientId', function (req, res) {
  if (req.params.clientId == "municipalidad-sanmartindelosandes") {
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
      }
      res.send(themeConfigured);
    }, 1);
  } else {
    setTimeout(function () {
        let themeConfigured = {
          'theme': 'pink-bluegrey.css',
          'structure-template': 'template-2',
          'login-type': 'survey',
          'survey-form': {
            'id': 'hotel-1',
            'title': 'Podes obtener conexión a internet de manera gratuita, si nos ayudas con ésta encuesta',
            'fields': [
              {
                'id': '1571507840',
                'type': 'textbox',
                'config': {
                  'key': 'textbox',
                  'label': 'Mail de contacto (*)',
                  'required': false,
                  'order': 1
                }
              },
              {
                'id': '1571507819',
                'type': 'rating',
                'config': {
                  'key': 'rating',
                  'label': 'Cómo puntuarias la atención del personal hasta el momento?',
                  'maximum': 5,
                  'order': 2
                }
              },
              {
                'id': '1571508048',
                'type': 'radio',
                'config': {
                  'key': 'yes-no',
                  'label': 'Volverias a elegirnos?',
                  'options': [
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
                  'label': 'Queres dejarnos alguna sugerencia?',
                  'value': 'Bombasto',
                  'order': 4
                }
              },
              {
                'id': '1571508821',
                'type': 'textbox',
                'config': {
                  'key': 'textbox',
                  'label': 'Como nos encontraste?',
                  'required': false,
                  'value': 'Bombasto',
                  'order': 5
                }
              }
            ]
          }
        }
        res.send(themeConfigured);
      }
      ,
      10
    );
  }
})
;


router.get('/radius/login', function (req, res) {
  setTimeout(function () {
    let ip = req.query.ip
    let username = req.query.username
    let password = req.query.password
    let response = {
      'username': password,
      'token': ip,
    };
    res.send(response);
  }, 10);
});




