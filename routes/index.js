var articlesController    = require('../controllers/articles_controller');

module.exports = function(app){
  //Article CRUD
  app.get('/api/v1/articles', articlesController.index.bind(articlesController));
  app.post('/api/v1/articles/new', articlesController.new.bind(articlesController));
};
