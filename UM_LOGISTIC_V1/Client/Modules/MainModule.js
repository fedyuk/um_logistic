﻿var mainModule = angular.module("mainModule", ["ui.router", "ngRoute", "ngCookies", "ngMessages"]);

mainModule.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/views/login',
            controller: 'LoginController'
        })
        .state('cooperations', {
            url: '/cooperations',
            templateUrl: '/views/cooperation',
            controller: 'CooperationController'
        })
        .state('index', {
            url: '/',
            templateUrl: '/views/home',
            controller: 'HomeController'
        })
		.state('home', {
            url: '/home',
            templateUrl: '/views/home',
            controller: 'HomeController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);
 
 mainModule.run(['$rootScope', '$state', '$location', 'SessionService', 'moduleConstants',
  function ($rootScope, $state, $location, SessionService, moduleConstants) {
	  $rootScope.$on('$routeChangeStart',
      function (event) {
		  var sessionToken = SessionService.getSessionToken();
		  if(!SessionService.isSessionValid()) {
		      $location.path(moduleConstants.loginPath);
		  }
      }
    );
  }]);
 
 
 
  