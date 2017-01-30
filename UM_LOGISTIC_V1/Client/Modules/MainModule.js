var mainModule = angular.module("mainModule", ["ngRoute","ngCookies", "ngMessages"]);  

mainModule.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: '/views/index',
        controller: 'ProfileController'
      }).
      when('/login', {
        templateUrl: '/views/login',
        controller: 'LoginController'
      }).
      otherwise({
        redirectTo: '/'
      });
	  
	  $locationProvider.html5Mode(true);
  }]);
 
 mainModule.run(['$rootScope', '$state', 'SessionService'
  function($rootScope, $state, SessionService) {
	  $rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
		  var sessionToken = SessionService.getSessionToken();
		  if(!SessionService.isSessionValid()) {
			  $state.go('/login')
		  }
      }
    );
  }]);
 
 
 
  