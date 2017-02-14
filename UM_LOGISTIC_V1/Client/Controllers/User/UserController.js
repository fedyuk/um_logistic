mainModule.controller('UserController', function ($scope, $log, UserService, SessionService, moduleConstants) {
	
	//methods
	$scope.getUser = function(id) {
		var user = SessionService.getSessionUser();
		var token = SessionService.getSessionToken();
		UserService.getUser(user, token, id).success(function (user) {
		}).error(function (error) {
		});
	}
	
	$scope.getUsers = function(page, count) {
		var user = SessionService.getSessionUser();
		var token = SessionService.getSessionToken();
		UserService.getUsers(user, token , page, count).success(function (response) {
		}).error(function (error) {
		});
	}
	//methods
});