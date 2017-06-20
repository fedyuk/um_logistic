mainModule.controller('ProfileController', function ($scope, $log, $location, UserService,
	SessionService, moduleConstants, LoginService, AccountService, NotificationService, FilterService, ClientTaskService, ApplicationTrashService, EventService) {
	
    $scope.notFilteredApplicationsCount = 0;
    $scope.clientTasksCount = 0;
    $scope.applicationsInTrash = 0;
    $scope.userImage = "";
    $scope.appTrashElements = [];
	//methods
	
	$scope.logoutUser =() => {
		SessionService.closeSession();
		$scope.changeProfileData(false, null, false);
		$scope.openLoginPage();
		EventService.stopHubConnection();
	}
	
	$scope.initProfileName = () => {
		let sessionProfileName = SessionService.getSessionProfileName();
		$scope.profileName = sessionProfileName != undefined ? sessionProfileName : moduleConstants.anonymousUserCaption;
	}

	$scope.getNotFilteredApplicationsCount = () => {
	    FilterService.getNotFilteredApplicationsCount().success(response => {
	        if (response.Success) {
	            $scope.notFilteredApplicationsCount = response.Result;
	        }
	        else {
	            NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
	        }
	    }).error(error => {
	        NotificationService.errorFromResponse(error);
	    });
	}

	$scope.getClientTasksCount = () => {
	    let userId = SessionService.getSessionUserId();
	    if (!userId) {
	        $scope.clientTasksCount = 0;
	        return;
	    }
	    ClientTaskService.getClientTasksCount('OwnerId==' + userId + ';').success(response => {
	        if (response.Success) {
	            $scope.clientTasksCount = response.Result;
	        }
	        else {
	            NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
	        }
	    }).error(error => {
	        NotificationService.errorFromResponse(error);
	    });
	}

	$scope.getApplicationsInTrashCount = () => {
	    let userId = SessionService.getSessionUserId();
	    $scope.applicationsInTrash = SessionService.getShopTrashCount();
	}
	
	$scope.initProfileLoginActions = () => {
		let sessionProfileName = SessionService.getSessionProfileName();
		$scope.isAuthorized = sessionProfileName != undefined ? true : false; 
	}

	$scope.initProfileMenu = () => {
	    let isStaff = SessionService.isStaff();
	    $scope.isStaff = isStaff;
	}
	
	$scope.openLoginPage = () => {
		$location.path(moduleConstants.loginPath);
	}
	
	$scope.openSettingsPage = () => {
		$location.path(moduleConstants.settingsPath);
	}
	
	$scope.openHomePage = () => {
		$location.path(moduleConstants.homePath);
	}
	
	$scope.changeProfileData = (isAuthorized, profileName, isStaff) => {
		$scope.profileName = isAuthorized == true ? profileName : moduleConstants.anonymousUserCaption;
		$scope.isAuthorized = isAuthorized;
		$scope.isStaff = isStaff;
	}
	
	$scope.saveProfile = (response) => {
		SessionService.saveSessionToken(response.Token, response.Result.UserName);
		SessionService.saveProfileData(response.Result);
		$scope.changeProfileData(true, response.Result.Account.FullName, SessionService.isStaff());
		if (response.Result) {
		    $scope.saveProfileImage(response.Result.Account.Image)
		}
	}
	
	$scope.getApplicationsInTrashElements = () => {
	    let userId = SessionService.getSessionUserId();
	    $scope.appTrashElements = SessionService.getShopTrashElements();
	}

	$scope.saveProfileImage = (profileImage) => {
	    $scope.userImage = profileImage;
	}

	$scope.$on("userAuthorized", (event, args) => {
	    $scope.saveProfile(args);
	    $scope.initializeManagerNotifications();
	    $scope.subscribeToOnlineStateNotifications();
	    SessionService.getShopTrash(SessionService.getSessionUserId(), (trash) => {
	        $scope.appTrashElements = trash;
	        $scope.getApplicationsInTrashCount();
	    });
	});

	$scope.$on("trashElementAdded", (event, args) => {
	    $scope.getApplicationsInTrashCount();
	});

	$scope.$on("trashElementRemoved", (event, args) => {
	    $scope.getApplicationsInTrashCount();
	});

	$scope.initializeManagerNotifications = () => {
	    let isStaff = SessionService.isStaff();
	    if (isStaff != true) {
	        return;
	    }
	    EventService.initializeEventsHub();
	    EventService.subscribeToNotifications();
	    EventService.startHubConnection();
	}

	$scope.subscribeToOnlineStateNotifications = () => {
	    let isAdmin = SessionService.isAdmin();
	    if (isAdmin == true) {
	        EventService.subscribeToOnlineStateChangedNotifications();
	    }
	}

	$scope.$on("userRegistrated", (event, args) => {
	    $scope.saveProfile(args);
	    $scope.initializeManagerNotifications();
	    $scope.subscribeToOnlineStateNotifications();
	    SessionService.getShopTrash(SessionService.getSessionUserId(), (trash) => {
	        $scope.appTrashElements = trash;
	        $scope.getApplicationsInTrashCount();
	    });
	});
	
	//methods
	
	//init controller
	$scope.initProfileName();
	
	$scope.initProfileLoginActions();

	$scope.initProfileMenu();

	$scope.getNotFilteredApplicationsCount();

	$scope.getClientTasksCount();

	$scope.getApplicationsInTrashCount();


	$scope.initializeManagerNotifications();

	$scope.subscribeToOnlineStateNotifications();

    //$scope.getApplicationsInTrashElements();
	SessionService.getShopTrash(SessionService.getSessionUserId(), (trash) => {
	    $scope.appTrashElements = trash;
	    $scope.getApplicationsInTrashCount();
	});
	//init controller
});