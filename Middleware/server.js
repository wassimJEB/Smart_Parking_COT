let express = require("express");
let mongoose = require('mongoose')
let bodyParser  = require('body-parser');
const https = require('https');
const http = require('http');



const app = require('./app.js');

//Open http listener
http.createServer(app).listen(80, () => {
  console.log('HTTP Server running on port 80');
});


//--------Https----------

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/wassimjeb.me/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/wassimjeb.me/fullchain.pem"),
  dhparam: fs.readFileSync("/etc/letsencrypt/live/wassimjeb.me/dh-strong.pem")
};


https.createServer(options,app).listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

/*
let backendPort = 8084;

app.listen(backendPort, () => {
  console.log("Express server listening on port " + backendPort);
});

*/
