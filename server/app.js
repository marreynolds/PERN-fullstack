require('dotenv').config();
var bcrypt = require('bcryptjs');
var express = require('express');
var app = express();
var stats = require('./controllers/statscontroller')
var user = require('./controllers/userController')
var gyms = require('./controllers/gymcontroller')
var sequelize = require('./db');
var bodyParser = require('body-parser');

sequelize.sync(); 

app.use(bodyParser.json())
app.use(require('./middleware/headers'))


app.use('/user', user);
app.use('/gyms', gyms)

app.use(require('./middleware/validate-session'))
app.use('/stats', stats);

app.listen(3000, function(){
    console.log('App is listening on 3000.')
});