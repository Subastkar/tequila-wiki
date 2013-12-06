wikiApp.controller('newArticle', [ '$scope', '$http', function($scope, $http){
  var onError = function(error){
    alert(error.message);
  };

  $scope.saveArticle = function(){
    var request = $http.post('/api/v1/articles/new', {article: $scope.article});

    request.success(function(){
      console.log('Something here');
    });

    request.error(onError);
  };
}]);
