mainModule.controller('UserController', function ($scope, $log, UserService, SessionService) {
	
	//methods
	$scope.getUser = function(id) {
		var user = SessionService.getSessionUser();
		var token = SessionService.getSessionToken();
		UserService.getUser(user, token, id).success(function (user) {
			if(user.Success == true) {
				$log.log("Get user success");
			}
			else {
				$log.log("Get user no success");
			}
		}).error(function (error) {
			$log.log(error);
		});
	}
	
	$scope.getUsers = function(page, count) {
		var user = SessionService.getSessionUser();
		var token = SessionService.getSessionToken();
		UserService.getUsers(user, token , page, count).success(function (response) {
			if(response.Success == true) {
				$log.log("Get users success");
			}
			else {
				$log.log("Get users no success");
			}
		}).error(function (error) {
			$log.log(error);
		});
	}
	//methods
});