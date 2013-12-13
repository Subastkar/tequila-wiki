var wikiApp = angular.module('wikiApp', ['ngRoute']);

wikiApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'angular/views/home.html'
  }).when('/article/new', {
    templateUrl: 'angular/views/articles/new.html'
  }).when('/article/:id', {
    templateUrl: 'angular/views/articles/view.html'
  }).when('/article/:id/edit', {
    templateUrl: 'angular/views/articles/edit.html'
  });
}]);

wikiApp.run(function($http, $window, $rootScope) {
  $rootScope.online = navigator.onLine;

  $window.addEventListener("offline", function(){
    $rootScope.$apply(function() {
      $rootScope.online = false;
    });
  });
  $window.addEventListener("online", function(){
    $rootScope.$apply(function() {
      $rootScope.online = true;
      var requests = JSON.parse(localStorage.getItem("create_article"));

      var next = _.after(requests.length, function(){
        localStorage.removeItem("create_article");
      });

      _.each(requests, function(article){
        $http.post('/api/v1/articles/new', {article: article}).success(function(){
          //Remove item form array instead the whole array
        });
        next();
      });
    });
  });
});
