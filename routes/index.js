var articlesController    = require('../controllers/articles_controller');

module.exports = function(app){
  //Article CRUD
  app.get('/api/v1/articles', articlesController.index.bind(articlesController));
  app.post('/api/v1/articles/new', articlesController.new.bind(articlesController));
  app.get('/api/v1/articles/:id', articlesController.findOne.bind(articlesController));
  app.put('/api/v1/articles/:id', articlesController.update.bind(articlesController));
  app.delete('/api/v1/articles/:id', articlesController.delete.bind(articlesController));
};
