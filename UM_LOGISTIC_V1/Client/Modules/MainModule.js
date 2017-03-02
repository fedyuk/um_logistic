var mainModule = angular.module("mainModule", ["ui.router", "ngRoute", "ngCookies", "ngMessages"]);

mainModule.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $urlRouterProvider) {

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
        .state('coop_application', {
            url: '/coop_application',
            templateUrl: '/views/coop_application',
            controller: 'CooperationApplicationController'
        })
		.state('transportations', {
            url: '/transportations',
            templateUrl: '/views/transportation',
            controller: 'TransportationController'
		})
        .state('transportationsDetail', {
            url: '/transportation/:id',
            templateUrl: '/views/transportationDetail',
            controller: 'TransportationApplicationDetailController'
        })
		.state('trans_application', {
            url: '/trans_application',
            templateUrl: '/views/trans_application',
            controller: 'TransportationApplicationController'
        })
		.state('home', {
            url: '/home',
            templateUrl: '/views/home',
            controller: 'HomeController'
		})
        .state('404', {
            url: '/404',
            templateUrl: '/views/404'
        });

    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);
 
 mainModule.run(['$rootScope', '$state', '$location', 'SessionService', 'moduleConstants',
  function ($rootScope, $state, $location, SessionService, moduleConstants) {
	  $rootScope.$on('$locationChangeStart',
      function (event, next, current) {
		  var sessionToken = SessionService.getSessionToken();
		  if(!SessionService.isSessionValid()) {
		      $location.path(moduleConstants.loginPath);
		  }
      }
    );
  }]);
 
 
 
  