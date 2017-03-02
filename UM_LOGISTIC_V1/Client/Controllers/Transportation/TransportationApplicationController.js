mainModule.controller('TransportationApplicationController', function ($rootScope, $scope, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

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
    $scope.pictureData = null;
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
		        $scope.loadPicture(response.Id, true);
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.loadPicture = function (applicationId, type) {
        var data = $scope.pictureData;
        if (data == null) {
            return;
        }
        var request = {
            ApplicationId: applicationId,
            Image: data,
            Type: type
        };
        ApplicationPictureService.createApplicationPicture(request)
		.success(function (response) {
		    if (response.Success) {
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.fileChanged = function () {
        file = document.getElementById("trans-picture").files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            $scope.pictureData = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }
});