var mainModule = angular.module("mainModule", ["ui.router", "ngRoute", "ngCookies", "ngMessages"]);

/*mainModule.config(function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/views/index'
        //controller: 'ProfileController'
      }).
      when('/login', {
        templateUrl: '/views/login',
        controller: 'LoginController'
      });
	  
	  $locationProvider.html5Mode(true);
});*/

mainModule.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    // UI States, URL Routing & Mapping. For more info see: https://github.com/angular-ui/ui-router
    // ------------------------------------------------------------------------------------------------------------

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/views/index'

        })
        .state('login', {
            url: '/login',
            templateUrl: '/views/login',
            controller: 'LoginController'
        });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);
 
 mainModule.run(['$rootScope', '$state', 'SessionService',
  function ($rootScope, $state, SessionService) {
	  $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
		  var sessionToken = SessionService.getSessionToken();
		  if(!SessionService.isSessionValid()) {
		      $rootScope.$state.go('/login')
		  }
      }
    );
  }]);
 
 
 
  