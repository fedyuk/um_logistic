﻿mainModule.controller('CallFeedbackController', function ($rootScope, $scope, $log, $location, ClientTaskService,
	SessionService, moduleConstants, NotificationService) {

    // variables
    $scope.isLoading = false;
    $scope.feedback = {
        Phone: "",
        Name: "",
        Question: "",
    };
    //

    // methods
    $scope.createCallFeedback = function () {
        if (!$scope.createForm.$valid) {
            return;
        }
        $scope.isLoading = true;
        var request = $scope.feedback;
        request.UserId = SessionService.getSessionUserId();
        ClientTaskService.createCallFeedback(request).success(response => {
            $scope.isLoading = false;
            if (response.Success == true) {
                NotificationService.success(moduleConstants.callFeedbackAccepted);
                $location.path(moduleConstants.homePath);
            }
            else {
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
        }).error(error => {
            $scope.isLoading = false;
            NotificationService.errorFromResponse(error);
        });
    }

    $scope.phoneMask = function () {
        jQuery(function ($) {
            $("#contactPhone").mask("(999) 999-9999");
        });
    }
    //

    //init
    $scope.phoneMask();
    //
});