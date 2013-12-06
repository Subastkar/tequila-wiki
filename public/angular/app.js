var wikiApp = angular.module('wikiApp', ['ngRoute']);

wikiApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/', {
    templateUrl: 'angular/views/home.html'
  }).when('/article/new', {
    templateUrl: 'angular/views/articles/new.html'
  });
}]);
