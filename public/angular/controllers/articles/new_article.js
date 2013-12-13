wikiApp.controller('newArticle', [ '$scope', '$http', '$location', '$rootScope', function($scope, $http, $location, $rootScope){
  var onError = function(error){
    alert(error.message);
  };

  $scope.saveArticle = function(){
    if(!$rootScope.online){
      var requests = localStorage.getItem("create_article") ? JSON.parse(localStorage.getItem("create_article")) : [];
      requests.push($scope.article);

      localStorage.setItem("create_article", JSON.stringify(requests));
      alert("This article will be saved in order tu publish it once the connection is restored");
      $location.path('/');
      return false;
    }
    var request = $http.post('/api/v1/articles/new', {article: $scope.article});

    request.success(function(data){
      alert(data.message);
      $location.path('/');
    });

    request.error(onError);
  };
}]);
