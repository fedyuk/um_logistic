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
				//$scope.$emit("userAuthorized", response);
				$rootScope.$broadcast("userAuthorized", response);
				$log.log(moduleConstants.authorizeSuccessCaption);
				$location.path(moduleConstants.homePath);
				//NotificationService.success(moduleConstants.authorizeSuccessCaption);
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