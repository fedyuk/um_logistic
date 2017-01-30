var mainModule = angular.module("mainModule", ["ngRoute","ngCookies", "ngMessages"]);  

mainModule .config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/views/index',
        controller: 'ProfileController'
      }).
      when('/login', {
        templateUrl: '/views/login',
        controller: 'ProfileController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);