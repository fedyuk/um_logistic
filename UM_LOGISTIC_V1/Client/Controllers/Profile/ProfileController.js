mainModule.controller('ProfileController', function ($scope, $log, $location, UserService,
	SessionService, moduleConstants, LoginService, AccountService, NotificationService) {
	
	//methods
	
	$scope.logoutUser = function() {
		SessionService.closeSession();
		$scope.changeProfileData(false, null, false);
		$log.log(moduleConstants.closedSessionMeesage);
		NotificationService.success(moduleConstants.closedSessionMeesage);
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
		$location.path(moduleConstants.loginPath);
	}
	
	$scope.openSettingsPage = function() {
		$location.path(moduleConstants.settingsPath);
	}
	
	$scope.changeProfileData = function(isAuthorized, profileName, isStaffOrSupervisor) {
		$scope.profileName = isAuthorized == true ? profileName : moduleConstants.anonymousUserCaption;
		$scope.isAuthorized = isAuthorized;
		$scope.isStaffOrSupervisor = isStaffOrSupervisor;
	}
	
	$scope.saveProfile = function(response) {
		SessionService.saveSessionToken(response.Token, $scope.loginUserName);
		SessionService.saveProfileData(response.Result);
	    $scope.changeProfileData(true, response.Result.FullName, false);
	}
	
	$scope.$on("userAuthorized", function(event, args) {
		$scope.saveProfile(args);
	});
	
	//methods
	
	//init controller
	$scope.initProfileName();
	
	$scope.initProfileLoginActions();
	//init controller
});