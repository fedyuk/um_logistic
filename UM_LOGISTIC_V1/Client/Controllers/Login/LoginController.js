mainModule.controller('LoginController', function ($scope, $log, LoginService, SessionService, moduleConstants) {
	
    //methods
    $scope.loginUser = function(userName, userPassword) {
		LoginService.loginUser(userName, userPassword).success(function (user) {
			if(user.Success) {
				SessionService.saveSessionToken(user.Token, user.Result.UserName);
				SessionService.saveProfileData(user.Result);
				$log.log(moduleConstants.authorizeSuccessCaption);
			}
			else {
				$log.log(moduleConstants.userNotFoundCaption);
			}
		}).error(function (error) {
			$log.log(error);
		});
	}
	//methods
});