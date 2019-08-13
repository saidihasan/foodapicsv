'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const csvjson = require("csvtojson");
const fileSis = require("fs");

const converter = csvjson({
	delimiter:";"
})



const router = express.Router();

converter.fromFile("./makan_makan.csv").then(source => {
	
	router.get('/', (req,res) => res.send(source));
	
});


/*router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
*/
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
