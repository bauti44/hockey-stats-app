'use strict'

// Imports
const express = require('express')

const config = require('./config')
let appServer = require('./server')
let fs = require('fs');
const path = require("path");

let privateKey  = fs.readFileSync(path.resolve(__dirname,'../sslcert/server.key'), 'utf8');
let certificate = fs.readFileSync(path.resolve(__dirname,'../sslcert/server.cert'), 'utf8');
let credentials = {key: privateKey, cert: certificate};

// Boot Server
const portHttp = process.env.PORT_HTTP || config.portHttp
const portHttps = process.env.PORT_HTTPS || config.portHttps

let http = require('http')
let https = require('https')

http.createServer(appServer).listen(portHttp);
https.createServer(credentials, appServer).listen(portHttps);