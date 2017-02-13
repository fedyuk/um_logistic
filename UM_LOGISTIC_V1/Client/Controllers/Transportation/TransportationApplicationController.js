mainModule.controller('TransportationApplicationController', function ($rootScope, $scope, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService) {

    //variables 
    $scope.transportation = {
        Name : "",
        ContactPhone : "",
        SendAddress : "",
        DeliveryAddress : "",
        CompleteDate : new Date(),
        ShipmentType : "",
        ShipmentLength : 0,
        ShipmentWidth : 0,
        ShipmentHeight : 0,
        ShipmentCapacity : 0,
        ShipmentWeight : 0,
        user: "",
        token : ""
    };
    $scope.isLoading = false;
    //variables

    //methods
    $scope.createTransportation = function () {
        $scope.isLoading = true;
        $scope.transportation.user = SessionService.getSessionUser();
        $scope.transportation.token = SessionService.getSessionToken();
        TransportationService.createTransportation($scope.transportation)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		        NotificationService.success(moduleConstants.cooperationApplicationCreatingSuccess);
		        $location.path(moduleConstants.homePath);
		    }
		    else {
		        $log.log(response.Error);
		        NotificationService.error(response.Error);
		    }
		}).error(function (error) {
		    NotificationService.error(error);
		});
    }
});