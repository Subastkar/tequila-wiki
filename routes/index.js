var applicationController = require('../controllers/application_controller');
var articlesController    = require('../controllers/articles_controller');

module.exports = function(app){
  app.get('/', applicationController.index.bind(applicationController));

  //Article CRUD
  app.get('/article/new', articlesController.new.bind(articlesController));
  app.post('/article/save', articlesController.save.bind(articlesController));
};
