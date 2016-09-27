// Your server.js file should require the basic npm packages we've used in class: express,
// body-parser and path.

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var PORT = process.envPORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use('/assets',express.static('./assets'));

require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);
// listen to port
app.listen(PORT, function(){
	console.log("App lsitening on PORT: "+ PORT);
});
