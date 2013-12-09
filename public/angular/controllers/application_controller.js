wikiApp.controller('applicationController', [ '$scope', '$http', function($scope, $http){
  $scope.articles = [ ];

  var onError = function(error){
    alert(error.message);
  };

  $http.get('/api/v1/articles').success(function(articles){
    $scope.articles = articles;
  }).error(onError);
}]);
