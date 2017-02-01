var mainModule = angular.module("mainModule", ["ui.router", "ngRoute", "ngCookies", "ngMessages"]);

mainModule.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/views/login',
            controller: 'LoginController'
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
 
 
 
  