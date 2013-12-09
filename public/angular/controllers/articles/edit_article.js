wikiApp.controller('editArticle', [ '$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
  var onError = function(error){
    alert(error.message);
  };

  var request = $http.get('/api/v1/articles/'+ $routeParams.id);
  request.success(function(article){
    $scope.article = article;
  });

  request.error(onError);
  $scope.saveArticle = function(){
    var request = $http.put('/api/v1/articles/' + $routeParams.id, {article: $scope.article});

    request.success(function(data){
      alert(data.message);
      $location.path('/');
    });

    request.error(onError);
  };
}]);
