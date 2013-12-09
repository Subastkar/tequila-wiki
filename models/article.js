var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
  title: String,
  content: String,
  created_at: Date,
  updated_at: Date
});

module.exports = mongoose.model('article', articleSchema);
