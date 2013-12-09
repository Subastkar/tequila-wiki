var mongoose = require('mongoose');
var db       = mongoose.connection;

mongoose.connect('mongodb://localhost/simple-wiki');

module.exports = function(cb){
  db.on('error', cb);
  db.once('open', cb);
};

