var articlesController    = require('../controllers/articles_controller');

module.exports = function(app){
  //Article CRUD
  app.get('/article/new', articlesController.new.bind(articlesController));
  app.post('/article/save', articlesController.save.bind(articlesController));
};
