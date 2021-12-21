//PAckages
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
let bodyParser  = require('body-parser');

//Fichier Routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let authRoute = require('./identity/authRoute');
//let conf=require('./config/config')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Middleware
app.use(express.json({limit:'5mb',extended:'true'}));

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({limit:'5mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/*
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
});*/
//connect to all databases
require('./main/connection.db')();


//Routes

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',authRoute)



//require('../identity/models/identity.schema');
//require('../identity/controllers/iam.provider');
/*
const SecurityRouter = require('../security/routes.config');
const IdentityRouter = require('../identity/routes.config');
const indexRouter  = require('../welcome/routes.config');

//bind routes to the express application
SecurityRouter.routesConfig(app);
IdentityRouter.routesConfig(app);
indexRouter.routesConfig(app);

*/

module.exports = app;


