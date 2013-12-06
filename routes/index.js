var applicationController = require('../controllers/application_controller');

module.exports = function(app){
  app.get('/', applicationController.index.bind(applicationController));
};
