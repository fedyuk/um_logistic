mainModule.controller('TransportationApplicationDetailController', function ($rootScope, $scope, $stateParams, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

    if (!$stateParams.id) {
        $location.path("/404");
        return;
    }
    //variables 
    $scope.transportationToView = {
        Name: "",
        ContactPhone: "",
        SendAddress: "",
        DeliveryAddress: "",
        CompleteDate: new Date(),
        ShipmentType: "",
        ShipmentLength: 0,
        ShipmentWidth: 0,
        ShipmentHeight: 0,
        ShipmentCapacity: 0,
        ShipmentWeight: 0,
    };
    $scope.isLoading = false;
    $scope.pictureData = null;
    //variables

    //methods
    $scope.getTransportation = function () {
        $scope.isLoading = true;
        var user = SessionService.getSessionUser();
        var token = SessionService.getSessionToken();
        var id = $stateParams.id;
        TransportationService.getTransportation(user, token, id)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.getTransportation();
});