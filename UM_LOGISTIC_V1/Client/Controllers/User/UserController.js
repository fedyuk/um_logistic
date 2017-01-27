mainModule.controller('UserController', function ($scope, $log, UserService, SessionService, moduleConstants) {
	
	//methods
	$scope.getUser = function(id) {
		var user = SessionService.getSessionUser();
		var token = SessionService.getSessionToken();
		UserService.getUser(user, token, id).success(function (user) {
			if(user.Success == true) {
				$log.log(moduleConstants.getUserSuccessCaption);
			}
			else {
				$log.log(moduleConstants.getUserNotSuccessCaption);
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
				$log.log(moduleConstants.getUsersSuccessCaption);
			}
			else {
				$log.log(moduleConstants.getUsersNotSuccessCaption);
			}
		}).error(function (error) {
			$log.log(error);
		});
	}
	//methods
});