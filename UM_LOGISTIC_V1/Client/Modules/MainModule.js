var mainModule = angular.module("mainModule", ["bootstrapLightbox", "ui.router", "ngRoute", "ngCookies", "ngMessages", /*"ngMap"*//*"bootstrapLightbox"*/]);

mainModule.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$cookiesProvider', function ($stateProvider, $locationProvider, $urlRouterProvider, $cookiesProvider) {

    $stateProvider
        .state('login', {
            title: 'Авторизація',
            url: '/login',
            templateUrl: '/views/login',
            controller: 'LoginController'
        })
        .state('cooperations', {
            title: 'Заявки',
            url: '/cooperations',
            templateUrl: '/views/cooperation',
            controller: 'CooperationController'
        })
        .state('cooperationsDetail', {
            title: 'Деталі заявки',
            url: '/cooperation/:id',
            templateUrl: '/views/cooperationDetail',
            controller: 'CooperationApplicationDetailController'
        })
        .state('index', {
            title: 'Головна',
            url: '/',
            templateUrl: '/views/home',
            controller: 'HomeController'
        })
        .state('coop_application', {
            title: 'Додати заявку',
            url: '/coop_application',
            templateUrl: '/views/coop_application',
            controller: 'CooperationApplicationController'
        })
		.state('transportations', {
		    title: 'Заявки',
            url: '/transportations',
            templateUrl: '/views/transportation',
            controller: 'TransportationController'
		})
        .state('transportationsDetail', {
            title: 'Деталі заявки',
            url: '/transportation/:id',
            templateUrl: '/views/transportationDetail',
            controller: 'TransportationApplicationDetailController'
        })
		.state('trans_application', {
		    title: 'Додати заявку',
            url: '/trans_application',
            templateUrl: '/views/trans_application',
            controller: 'TransportationApplicationController'
        })
		.state('home', {
		    title: 'Головна',
            url: '/home',
            templateUrl: '/views/home',
            controller: 'HomeController'
		})
        .state('register', {
            title: 'Реєстрація',
            url: '/register',
            templateUrl: '/views/register',
            controller: 'RegisterAccountController'
        })
        .state('not_filtered_applications', {
            title: 'Не фільтровані заявки',
            url: '/not_filtered_applications',
            templateUrl: '/views/not-filtered-applications',
            controller: 'NotFilteredApplicationsController'
        })
        .state('accounts', {
            title: 'Користувачі',
            url: '/accounts',
            templateUrl: '/views/accounts',
            controller: 'UserController'
        })
        .state('accounts_c', {
            title: 'Додати користувача',
            url: '/accounts_c',
            templateUrl: '/views/account-create',
            controller: 'CreateUserController'
        })
        .state('call_feedback', {
            title: 'Перезвонити',
            url: '/call_feedback',
            templateUrl: '/views/call-feedback',
            controller: 'CallFeedbackController'
        })
        .state('tasks', {
            title: 'Задачі',
            url: '/tasks',
            templateUrl: '/views/tasks',
            controller: 'TasksController'
        })
        .state('my_applications', {
            title: 'Мої заявки',
            url: '/my_applications',
            templateUrl: '/views/my-applications',
            controller: 'MyApplicationsController'
        })
        .state('transportationEdit', {
            title: 'Редагувати заявку',
            url: '/transportation/edit/:id',
            templateUrl: '/views/trans_edit_application',
            controller: 'TransportationEditController'
        })
        .state('cooperationEdit', {
            title: 'Редагувати заявку',
            url: '/cooperation/edit/:id',
            templateUrl: '/views/coop_edit_application',
            controller: 'CooperationEditController'
        })
        .state('maps', {
            title: 'Карти',
            url: '/maps',
            templateUrl: '/views/transport-map',
            controller: 'TransportMapController'
        })
        .state('profile_settings', {
            title: 'Настройки',
            url: '/profile_settings',
            templateUrl: '/views/profilesettings',
            controller: 'ProfileSettingsController'
        })
        .state('task_manager', {
            title: 'Задачі',
            url: '/task_manager',
            templateUrl: '/views/taskmanager',
            controller: 'TaskManagerController'
        })
        .state('404', {
            title: 'Не знайдено',
            url: '/404',
            templateUrl: '/views/404'
        });

    $urlRouterProvider.otherwise('/404');

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    var expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1);
    $cookiesProvider.defaults.expires = expiresDate;
}]);
 
mainModule.run(['$rootScope', '$state', '$location', 'SessionService', 'moduleConstants',
  function ($rootScope, $state, $location, SessionService, moduleConstants) {
	  $rootScope.$on('$locationChangeStart',
      function (event, next, current) {
          var title = next;
          $rootScope.$broadcast("pageTitleChanged", title);
      }
    );
  }]);
 
 
 
  