mainModule.controller('LoginController', function ($scope, $log, LoginService, SessionService) {
	
    //methods
    $scope.loginUser = function(userName, userPassword) {
		LoginService.loginUser(userName, userPassword).success(function (user) {
			if(user.Success) {
				SessionService.saveSessionToken(user.Token, user.Result.UserName);
				SessionService.saveProfileData(user.Result);
				$log.log("User has been authorized");
			}
			else {
				$log.log("User was not found");
			}
		}).error(function (error) {
			$log.log(error);
		});
	}
	//methods
});