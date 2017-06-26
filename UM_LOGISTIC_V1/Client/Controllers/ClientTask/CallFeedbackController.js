mainModule.controller('CallFeedbackController', function($rootScope, $scope, $log, $location, ClientTaskService,
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
    $scope.createCallFeedback = () => {
        if (!$scope.createForm.$valid) {
            return;
        }
        $scope.isLoading = true;
        let request = $scope.feedback;
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

    $scope.phoneMask = () => {
        jQuery(function ($) {
            $("#contactPhone").mask(moduleConstants.phoneMask);
        });
    }
    //

    //init
    $scope.phoneMask();
    //
});