var express = require('express');
var app = express();
var db = require('./db/db');
var cors = require('cors');

app.use(cors());

global.__root   = __dirname + '/'; 

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});


var ImageController = require(__root + 'imageupload/imagecontroller');
app.use('/gallery/images', ImageController);

var AuthController = require(__root + 'auth/authchecker');
app.use('/gallery/auth', AuthController);

module.exports = app;