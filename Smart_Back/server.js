let express = require("express");
let mongoose = require('mongoose')
let bodyParser  = require('body-parser');




const app = require('./app.js');


let backendPort = 8084;








app.listen(backendPort, () => {
  console.log("Express server listening on port " + backendPort);
});
