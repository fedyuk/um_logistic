mainModule.controller('ProfileSettingsController', function ($scope, $log, $location, UserService,
	SessionService, moduleConstants, AccountService, NotificationService) {

    var protocol = $location.protocol();
    var host = $location.host();
    var port = $location.port();
    var path = $location.path();
    var userId = SessionService.getSessionUserId();
    var url = '';
    
    $scope.isLoading = false;
    $scope.User = {
        Id: 0,
        UserName: "",
        UserPassword: "",
        Account: {
            FullName: "",
            HomePhone: "",
            WorkPhone: "",
            Country: "",
            Region: "",
            City: "",
            Street: ""
        }
    }
    $scope.getImageUrl = function () {
        return url = protocol + '://' + host + ':' + port + '/api/u_pictures?id=' + userId;
    }

    $scope.getUserInformation = function () {
        AccountService.getUserInfo(userId).success(function (response) {
            $scope.isLoading = false;
            if (response.Success == true) {
                $scope.User.UserName = response.Result.UserName,
                $scope.User.UserPassword = response.Result.UserPassword,
                $scope.User.Account.FullName = response.Result.Account.FullName,
                $scope.User.Account.HomePhone = response.Result.Account.HomePhone,
                $scope.User.Account.WorkPhone = response.Result.Account.WorkPhone,
                $scope.User.Account.Country = response.Result.Account.Country,
                $scope.User.Account.Region = response.Result.Account.Region,
                $scope.User.Account.City = response.Result.Account.City,
                $scope.User.Account.Street = response.Result.Account.Street
            }
        }).error(function (error) {
            NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
        });;
    }

    $scope.saveUserData = function () {
        User = {
            Id: userId,
            UserName: $scope.User.UserName,
            UserPassword: $scope.User.UserPassword,
            Account: {
                FullName: $scope.User.Account.FullName,
                HomePhone: $scope.User.Account.HomePhone,
                WorkPhone: $scope.User.Account.WorkPhone,
                Country: $scope.User.Account.Country,
                Region: $scope.User.Account.Region,
                City: $scope.User.Account.City,
                Street: $scope.User.Account.Street
            }
        }
        UserService.updateUserData(User).success(function (response) {
           
        }).error(function (error) {
            NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
        });;
    }

    $scope.getUserInformation();
});