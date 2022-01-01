let express = require("express");
let mongoose = require('mongoose')
let bodyParser  = require('body-parser');
const https = require('https');
const http = require('http');
const fs =require('fs');


const app = require('./app.js');
const mqtt = require('./mqtt/mqttClient');

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
