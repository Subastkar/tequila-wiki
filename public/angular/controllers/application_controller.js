wikiApp.controller('applicationController', [ '$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
  var catalog = JSON.parse(localStorage.getItem("catalog"));

  $scope.articles = [];

  var updatedCatalog = function(articles){
    if(_.isEmpty(catalog)){
      return $http.get('/api/v1/articles?complete=true').success(function(articles){
        catalog = {};
        _.each(articles, function(article){
          catalog[article._id] = _.omit(article, ['__v', 'created_at', '$$hashkey']);
        });

        localStorage.setItem('catalog', JSON.stringify(catalog));
      });
    }

    var catalog_keys = Object.keys(catalog);
    var to_update = []; //Collections of the articles ids to update
    var to_delete = _.difference(catalog_keys, _.map(articles, function(article){
      return article._id;
    }));

    var next = _.after(to_delete.length + 1, function(){
      var done = _.after(to_update.length + 1, function(){
        localStorage.setItem('catalog', JSON.stringify(catalog));
      });

      _.each(articles, function(article){
        var article_in = _.contains(catalog_keys, article._id);

        if(!article_in){
          return to_update.push(article._id);
        }
        if(article_in && article.updated_at !== catalog[article._id].updated_at){
          to_update.push(article._id);
        }
      });

      _.each(to_update, function(id){
        $http.get('/api/v1/articles/'+ id).success(function(article){
          catalog[article._id] = _.omit(article, ['__v', 'created_at', '$$hashkey']);

          done();
        });
      });

      done();
    });

    _.each(to_delete, function(id){
      delete catalog[id];
      next();
    });
    
    next();
  };

  var onError = function(error){
    alert(error.message);
  };

  if($rootScope.online){
    $http.get('/api/v1/articles').success(function(articles){

      $scope.articles = articles;
      updatedCatalog(articles);
    }).error(onError);
  } else {
    $scope.articles = _.map(catalog, function(article){ return article; });
  }

  $scope.deleteArticle = function(id){
    var request = $http.delete('/api/v1/articles/'+id);

    request.success(function(data){
      $scope.articles = _.reject($scope.articles, function(article){ return article._id === id; });
    });

    request.error(onError);
  };
}]);
