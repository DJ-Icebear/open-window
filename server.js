// Load required modules
var https   = require("https");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module
var fs      = require('fs');

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

var port = 8001;

// Start Express http server on port
var httpsOptions = {
  'key': fs.readFileSync('/var/local/compeit/https-cert/server.key', 'utf8'),
  'cert': fs.readFileSync('/var/local/compeit/https-cert/smartspaces_r1_kth_se.crt', 'utf8'),
  'ca': [
    fs.readFileSync('../https-cert/DigiCertCA.crt', 'utf8')
  ]
};
var webServer = https.createServer(httpsOptions, app).listen(port);

console.log('App listening on port: ' + port);
// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);
