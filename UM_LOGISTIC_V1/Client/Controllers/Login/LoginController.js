mainModule.controller('LoginController', function ($rootScope, $scope, $log, $location, LoginService, SessionService, moduleConstants, NotificationService) {
	
	//variables 
	$scope.loginUserName = "";
	$scope.loginUserPassword = "";
	$scope.isLoading = false;
	//variables
	
    //methods
	$scope.loginUser = function () {
	    $scope.isLoading = true;
		LoginService.loginUser($scope.loginUserName, $scope.loginUserPassword)
		.success(function (response) {
		    $scope.isLoading = false;
			if(response.Success) {
				$rootScope.$broadcast("userAuthorized", response);
				$log.log(moduleConstants.authorizeSuccessCaption);
				$location.path(moduleConstants.homePath);
			}
			else {
				$log.log(response.Error);
				NotificationService.error(response.Error);
			}
		}).error(function(error) {
			$log.log(moduleConstants.authorizeNotSuccessCaption);
			NotificationService.error(error);
		});
	}
	//methods
});