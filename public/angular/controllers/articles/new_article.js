wikiApp.controller('newArticle', [ '$scope', '$http', '$location', function($scope, $http, $location){
  var onError = function(error){
    alert(error.message);
  };

  $scope.saveArticle = function(){
    var request = $http.post('/api/v1/articles/new', {article: $scope.article});

    request.success(function(data){
      console.log(data.message);
      $location.path('/');
    });

    request.error(onError);
  };
}]);
