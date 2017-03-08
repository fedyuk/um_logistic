﻿mainModule.controller('RegisterAccountController', function ($rootScope, $scope, $log, $location, AccountService,
	SessionService, moduleConstants, NotificationService) {

    // variables
    $scope.isLoading = false;
    $scope.userToRegister = {
        Login: "",
        Password: "",
        ConfirmationPassword: "",
        FullName: "",
        WorkPhone: "",
        City: ""
    };
    //

    // methods
    $scope.registerUser = function () {
        $scope.isLoading = true;
        AccountService.registerAccount($scope.userToRegister).success(function (response) {
            $scope.isLoading = false;
            if (response.Success == true) {
                $rootScope.$broadcast("userRegistrated", response);
                $location.path("/home");
            }
            else {
                NotificationService.error(JSON.stringify(response.Error));
            }
        }).error(function (error) {
            $scope.isLoading = false;
            NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
        });
    }
    //
});