//Require underscore as Global variable
global._  = require('underscore');

var express = require('express');
var http = require('http');
var path = require('path');

//Run share server
var connect = require('connect');
var sharejs = require('share').server;

var server = connect( connect.logger(), connect.static(__dirname + '/share_log'));
var options = {db: {type: 'none'}}; // See docs for options. {type: 'redis'} to enable persistance.

// Attach the sharejs REST and Socket.io interfaces to the server
sharejs.attach(server, options);

server.listen(8000);
console.log('Share server running at http://127.0.0.1:8000/');

var app = express();

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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
