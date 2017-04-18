mainModule.controller('ProfileController', function ($scope, $log, $location, UserService,
	SessionService, moduleConstants, LoginService, AccountService, NotificationService, FilterService, ClientTaskService) {
	
    $scope.notFilteredApplicationsCount = 0;
    $scope.clientTasksCount = 0;
	//methods
	
	$scope.logoutUser = function() {
		SessionService.closeSession();
		$scope.changeProfileData(false, null, false);
		$scope.openLoginPage();
		//NotificationService.success(moduleConstants.closedSessionMeesage);
	}
	
	$scope.initProfileName = function() {
		var sessionProfileName = SessionService.getSessionProfileName();
		$scope.profileName = sessionProfileName != undefined ? sessionProfileName : moduleConstants.anonymousUserCaption;
	}

	$scope.getNotFilteredApplicationsCount = function () {
	    FilterService.getNotFilteredApplicationsCount().success(function (response) {
	        if (response.Success) {
	            $scope.notFilteredApplicationsCount = response.Result;
	        }
	        else {
	            NotificationService.error(JSON.stringify(response.Error));
	        }
	    }).error(function (error) {
	        NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
	    });
	}

	$scope.getClientTasksCount = function () {
	    var userId = SessionService.getSessionUserId();
	    if (!userId) {
	        $scope.clientTasksCount = 0;
	        return;
	    }
	    ClientTaskService.getClientTasksCount('OwnerId==' + userId + ';').success(function (response) {
	        if (response.Success) {
	            $scope.clientTasksCount = response.Result;
	        }
	        else {
	            NotificationService.error(JSON.stringify(response.Error));
	        }
	    }).error(function (error) {
	        NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
	    });
	}
	
	$scope.initProfileLoginActions = function() {
		var sessionProfileName = SessionService.getSessionProfileName();
		$scope.isAuthorized = sessionProfileName != undefined ? true : false; 
	}

	$scope.initProfileMenu = function () {
	    var isStaff = SessionService.isStaff();
	    $scope.isStaff = isStaff;
	}
	
	$scope.openLoginPage = function() {
		$location.path(moduleConstants.loginPath);
	}
	
	$scope.openSettingsPage = function() {
		$location.path(moduleConstants.settingsPath);
	}
	
	$scope.openHomePage = function() {
		$location.path(moduleConstants.homePath);
	}
	
	$scope.changeProfileData = function(isAuthorized, profileName, isStaff) {
		$scope.profileName = isAuthorized == true ? profileName : moduleConstants.anonymousUserCaption;
		$scope.isAuthorized = isAuthorized;
		$scope.isStaff = isStaff;
	}
	
	$scope.saveProfile = function(response) {
		SessionService.saveSessionToken(response.Token, response.Result.UserName);
		SessionService.saveProfileData(response.Result);
		$scope.changeProfileData(true, response.Result.Account.FullName, SessionService.isStaff());
	}
	
	$scope.$on("userAuthorized", function(event, args) {
		$scope.saveProfile(args);
	});

	$scope.$on("userRegistrated", function (event, args) {
	    $scope.saveProfile(args);
	});
	
	//methods
	
	//init controller
	$scope.initProfileName();
	
	$scope.initProfileLoginActions();

	$scope.initProfileMenu();

	$scope.getNotFilteredApplicationsCount();

	$scope.getClientTasksCount();
	//init controller
});