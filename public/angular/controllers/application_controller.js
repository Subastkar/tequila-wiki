wikiApp.controller('applicationController', [ '$scope', '$http', '$rootScope', function($scope, $http, $rootScope){
  var catalog = JSON.parse(localStorage.getItem("catalog"));

  $scope.articles = [ ];

  var updatedCatalog = function(articles){
    if(!catalog){
      return $http.get('/api/v1/articles?complete=true').success(function(articles){
        catalog = {};
        _.each(articles, function(article){
          catalog[article._id] = _.omit(article, ['__v', 'created_at']);
        });

        localStorage.setItem('catalog', JSON.stringify(catalog));
      });
    }

    var articles_ids = Object.keys(catalog);
    var ids_update = []; //Collections of the articles ids to update

    _.each(articles, function(article){
      var article_in = _.contains(articles_ids, article._id);

      if(!article_in){
        return ids_update.push(article._id);
      }
      if(article_in && article.updated_at !== catalog[article._id].updated_at){
        ids_update.push(article._id);
      }
    });

    var next = _.after(ids_update.length, function(){
      localStorage.setItem('catalog', JSON.stringify(catalog));
    });

    _.each(ids_update, function(id){
      $http.get('/api/v1/articles/'+ id).success(function(article){
        catalog[article._id] = _.omit(article, ['__v', 'created_at']);

        next();
      });
    });
  };

  var onError = function(error){
    alert(error.message);
  };

  $scope.articles = _.map(catalog, function(article){ return article; });

  if($rootScope.online){
    $http.get('/api/v1/articles').success(function(articles){

      $scope.articles = articles;
      updatedCatalog(articles);
    }).error(onError);
  }

  $scope.deleteArticle = function(id){
    var request = $http.delete('/api/v1/articles/'+id);

    request.success(function(data){
      $scope.articles = _.reject($scope.articles, function(article){ return article._id === id; });
    });

    request.error(onError);
  };
}]);
