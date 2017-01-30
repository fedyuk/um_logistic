var mainModule = angular.module("mainModule", ["ngRoute","ngCookies", "ngMessages"]);  

mainModule.config(['$routeProvider',
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
  
 mainModule.run(function($rootScope, $state, $stateParams, SessionService) {
	
	$rootScope.$on('$stateChangeStart',
      function (event, toState, toParams, fromState, fromParams) {
		  var sessionToken = SessionService.getSessionToken();
		  if(!SessionService.isSessionValid()) {
			  $state.go('/login')
		  }
      }
    );
 });
  