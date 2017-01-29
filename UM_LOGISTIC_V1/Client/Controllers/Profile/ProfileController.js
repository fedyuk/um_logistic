mainModule.controller('ProfileController', function ($scope, $log, $location, UserService, SessionService, moduleConstants, LoginService) {
	
	//variables
	$scope.profileName = moduleConstants.anonymousUserCaption;
	$scope.isAuthorized = false;
	//variables
	
	//methods
	
	$scope.logoutUser = function() {
		SessionService.closeSession();
		$log.log("Session has been closed");
	}
	
	$scope.initProfileName = function() {
		var sessionProfileName = SessionService.getSessionProfileName();
		$scope.profileName = sessionProfileName != undefined ? sessionUserName : moduleConstants.anonymousUserCaption;
	}
	
	$scope.initProfileLoginActions = function() {
		var sessionProfileName = SessionService.getSessionProfileName();
		$scope.isAuthorized = sessionProfileName != undefined ? true : false; 
	}
	
	$scope.openLoginPage = function() {
		$location.path("/login");
	}
	
	//methods
	
	//init controller
	$scope.initProfileName();
	
	$scope.initProfileLoginActions();
	//init controller
});