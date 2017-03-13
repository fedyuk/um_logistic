mainModule.controller('LoginController', function ($rootScope, $scope, $log, $location, LoginService, SessionService, moduleConstants, NotificationService) {
	
	//variables 
	$scope.loginUserName = "";
	$scope.loginUserPassword = "";
	$scope.isLoading = false;
	//variables
	
    //methods
	$scope.loginUser = function () {
	    if (!$scope.loginForm.$valid) {
	        return;
	    }
	    $scope.isLoading = true;
		LoginService.loginUser($scope.loginUserName, $scope.loginUserPassword)
		.success(function (response) {
		    $scope.isLoading = false;
			if(response.Success) {
				$rootScope.$broadcast("userAuthorized", response);
				$location.path(moduleConstants.homePath);
			}
			else {
				NotificationService.error(JSON.stringify(response.Error));
			}
		}).error(function (error) {
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
	}
	//methods
});