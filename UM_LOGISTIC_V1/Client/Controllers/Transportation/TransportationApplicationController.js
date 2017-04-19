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
        ShipmentWeight: 0,
        CreatedBy: null,
        user: "",
        token : ""
    };
    $scope.isLoading = false;
    $scope.pictureData = null;
    //variables

    //methods
    $scope.createTransportation = function () {
        if (!$scope.transForm.$valid) {
            return;
        }
        $scope.isLoading = true;
        $scope.transportation.user = SessionService.getSessionUser();
        $scope.transportation.token = SessionService.getSessionToken();
        $scope.transportation.CreatedBy = SessionService.getSessionUserId();
        TransportationService.createTransportation($scope.transportation)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
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
            if (reader.result.indexOf("jpg") != -1 || reader.result.indexOf("jpeg") != -1 || reader.result.indexOf("png") != -1) {
                $scope.pictureData = reader.result;
            }
            else {
                NotificationService.error("Картинки повинні бути у форматі jpg, jpeg, png");
                document.getElementById("trans-picture").value = "";
            }
        }, false);

        if (file && file.size <= 2000000) {
            reader.readAsDataURL(file);
        }
        else if (file && file.size > 2000000) {
            NotificationService.error("Розмір картинки повинен бути не більше 2 МБ");
            document.getElementById("trans-picture").value = "";
        }
    }
});