mainModule.controller('LoginController', function ($scope, $log, LoginService, SessionService, moduleConstants, NotificationService) {
	
	//variables 
	$scope.loginUserName = "";
	$scope.loginUserPassword = "";
	//variables
	
    //methods
    $scope.loginUser = function() {
		LoginService.loginUser($scope.loginUserName, $scope.loginUserPassword)
		.success(function(response) {
			if(response.Success) {
				$scope.$emit("userAuthorized", response);
				$log.log(moduleConstants.authorizeSuccessCaption);
				NotificationService.success(moduleConstants.authorizeSuccessCaption);
			}
			else {
				$log.log(moduleConstants.authorizeNotSuccessCaption);
				NotificationService.error(moduleConstants.authorizeNotSuccessCaption);
			}
		}).error(function(error) {
			$log.log(moduleConstants.authorizeNotSuccessCaption);
			NotificationService.error(moduleConstants.authorizeNotSuccessCaption);
		});
	}
	//methods
});