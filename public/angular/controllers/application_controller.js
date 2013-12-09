wikiApp.controller('applicationController', [ '$scope', '$http', function($scope, $http){
  $scope.articles = [ ];

  var onError = function(error){
    alert(error.message);
  };

  $http.get('/api/v1/articles').success(function(articles){
    $scope.articles = articles;
  }).error(onError);

  $scope.deleteArticle = function(id){
    var request = $http.delete('/api/v1/articles/'+id);

    request.success(function(data){
      $scope.articles = _.reject($scope.articles, function(article){ return article._id === id; });
    });

    request.error(onError);
  };
}]);
