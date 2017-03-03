mainModule.controller('TransportationApplicationDetailController', function ($rootScope, $scope, $stateParams, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

    if (!$stateParams.id) {
        $location.path("/404");
        return;
    }
    //variables 
    $scope.transportationToView = {
        Id: 0,
        Name: "",
        ContactPhone: "",
        SendAddress: "",
        DeliveryAddress: "",
        CompleteDate: null,
        ShipmentType: "",
        ShipmentLength: 0,
        ShipmentWidth: 0,
        ShipmentHeight: 0,
        ShipmentCapacity: 0,
        ShipmentWeight: 0,
    };
    $scope.isLoading = false;
    $scope.pictures = [];
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
		        if (response.Result != null) {
		            $scope.transportationToView.Id = response.Result.Id;
		            $scope.transportationToView.Name = response.Result.Name;
		            $scope.transportationToView.ContactPhone = response.Result.ContactPhone;
		            $scope.transportationToView.SendAddress = response.Result.SendAddress;
		            $scope.transportationToView.DeliveryAddress = response.Result.DeliveryAddress;
		            $scope.transportationToView.CompleteDate = response.Result.CompleteDate;
		            $scope.transportationToView.ShipmentType = response.Result.ShipmentType;
		            $scope.transportationToView.ShipmentLength = response.Result.ShipmentLength;
		            $scope.transportationToView.ShipmentWidth = response.Result.ShipmentWidth;
		            $scope.transportationToView.ShipmentHeight = response.Result.ShipmentHeight;
		            $scope.transportationToView.ShipmentCapacity = response.Result.ShipmentCapacity;
		            $scope.transportationToView.ShipmentWeight = response.Result.ShipmentWeight;
		        }
		        else {
		            $location.path("/404");
		        }
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.getPictures = function (id) {
        var type = true;
        ApplicationPictureService.getApplicationPictures(id, type)
		.success(function (response) {
		    if (response.Success) {
		        if(response.Result != null) {
		            for(var i = 0; i < response.Result.length; i ++) {
		                $scope.pictures.push({url: response.Result[i], number: i});
		            }
		        }
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.getTransportation();
    $scope.getPictures($stateParams.id);
});