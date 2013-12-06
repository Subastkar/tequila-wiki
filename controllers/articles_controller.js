module.exports = {
  new: function(req, res){
    res.render('articles/new');
  },
  save: function(req, res){
    console.log(req);
  }
};
