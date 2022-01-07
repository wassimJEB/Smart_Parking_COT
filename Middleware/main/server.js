
let mongoose = require('mongoose')
let bodyParser  = require('body-parser');
const https = require('https');
const http = require('http');
const fs =require('fs');

const config = require('./env.config')
const app = require('./app.js');
const mqtt = require('../mqtt/mqttClient');

//--------Https----------
console.log('ahya ml config'+config['cert-file']);
const options = {
  key: fs.readFileSync(config['key-file']),
  cert: fs.readFileSync(config['cert-file']),
  dhparam: fs.readFileSync(config['dh-strongfile'])
};


https.createServer(options,app).listen(config['port'] ,() => {
  console.log('HTTPS Server running on port' + config['port'] );
});


