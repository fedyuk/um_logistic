mainModule.controller('ProfileController', function ($scope, $log, $location, UserService,
	SessionService, moduleConstants, LoginService, AccountService) {
	
	//variables
	$scope.profileName = SessionService.getSessionProfileName() != undefined ?
		SessionService.getSessionProfileName() : moduleConstants.anonymousUserCaption;
	$scope.isAuthorized = false;
	$scope.isStaffOrSupervisor = false;
	$scope.loginUserName = "";
	$scope.loginUserPassword = "";
	//variables
	
	//methods
	
	$scope.logoutUser = function() {
		SessionService.closeSession();
		$scope.changeProfileData(false, null, false);
		$log.log(moduleConstants.closedSessionMeesage);
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
	
	$scope.loginUser = function() {
		LoginService.loginUser($scope.loginUserName, $scope.loginUserPassword)
		.success(function(response) {
			if(response.Success) {
				$scope.saveProfile(response);
				$log.log(moduleConstants.authorizeSuccessCaption);
			}
			else {
				$log.log(moduleConstants.authorizeNotSuccessCaption);
			}
		}).error(function(error) {
			$log.log(moduleConstants.authorizeNotSuccessCaption);
		});
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
	
	//methods
	
	//init controller
	$scope.initProfileName();
	
	$scope.initProfileLoginActions();
	//init controller
});