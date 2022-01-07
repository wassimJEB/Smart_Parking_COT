//PAckages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const fs =require('fs');
const helmet = require('helmet');
let bodyParser  = require('body-parser');

//Fichier Routes
let indexRouter = require('../routes');
let usersRouter = require('../routes/users');
let authRoute = require('../identity/authRoute');

//let conf=require('./config/config')

let app = express();

app.use(express.static(__dirname+'/web'));//set the static path
app.set('view engine', 'pug');
app.get(['/', '/login', '/register', '/map', '/home'], (req, res) => {
    res.sendFile(__dirname + '/web/index.html');
});
// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/


//Middleware
app.use(helmet())
app.use(express.json({limit:'5mb',extended:'true'}));
app.use(cors());

app.use(logger('dev'));
app.use(express.urlencoded({limit:'5mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to all databases
require('./connection.db')();


//Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',authRoute);




module.exports = app;


