var express = require('express');
//var path = require('path');

var bodyParser = require('body-parser');

var app = express();

//set the host, default is localhost:3000
var port = 3000

app.use(function(req, res, next) {
   console.log("Handling " + req.url + '/' + req.method);
  next();
});

// Parse all request bodies using JSON
app.use(bodyParser.json());

// Load all subroutes
app.use('/contact', require('./Contact.js'));

// Handler of last resort.  Send a 404 response and release connection
app.use(function (req, res) {
  res.status(404).end();
  req.cnn.release();
});

app.listen(port, function () {
   console.log(`App Listening on port ${port}`);
});
