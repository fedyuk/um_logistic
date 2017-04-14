mainModule.controller('CallFeedbackController', function ($rootScope, $scope, $log, $location, ClientTaskService,
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
        ClientTaskService.createCallFeedback(request).success(function (response) {
            $scope.isLoading = false;
            if (response.Success == true) {
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

    //init
    //
});