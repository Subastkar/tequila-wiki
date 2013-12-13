var articleModel   = require('../models/article');

module.exports = {
  index: function(req, res){
    var fields = 'id title updated_at';
    if(req.query.complete){ fields = ''; }

    articleModel.find({}, fields, function(error, articles){
      if(error){ return res.send(400, error); }

      return res.send(200, articles);
    });
  },
  new: function(req, res){
    articleModel.findOne({title: req.body.article.title}, function(error, article){
      if(error){ return res.send(400, error); }

      if(article){ return res.send(409, {message: 'An article that goes by this title already exists.'}); }

      var new_article = new articleModel(req.body.article);
      new_article.created_at = new Date().toISOString();
      new_article.updated_at = new Date().toISOString();

      new_article.save(function(error, article){
        if(error){ return res.send(400, error); }

        return res.send(200, {message: "Article saved correctly."})
      });
    });
  },
  findOne: function(req, res){
    articleModel.findOne({_id: req.params.id}, function(error, article){
      if(error){ return res.send(400, error); }

      return res.send(200, article);
    });
  },
  update: function(req, res){
    var article = _.omit(req.body.article, ['_id', '_v']);
    article.updated_at = new Date().toISOString();

    articleModel.update({_id: req.params.id}, article, function(error, article){
      if(error){ return res.send(400, error); }

      return res.send(200, {message: "Article updated correctly."})
    });
  },
  delete: function(req, res){
    articleModel.findOneAndRemove({_id: req.params.id}, function(error, article){
      if(error){ return res.send(400, error); }

      return res.send(200, {message: "Article deleted succesfully."})
    });
  }
};
