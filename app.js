//Require underscore as Global variable
global._  = require('underscore');

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

//Prepare share service
var sharejs = require('share').server;
var options = {db: {type: 'none'}}; // See docs for options. {type: 'redis'} to enable persistance.

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(app, options);

require('./lib/database')(function(error){
  if(error){ throw new Error(error); }
  console.log('Database connected');
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Set router
require('./routes/index')(app);

var server = http.createServer(app);

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
