﻿mainModule.controller('TransportationApplicationController', function ($rootScope, $scope, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

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
        Image: null,
        user: "",
        token : ""
    };
    $scope.isLoading = false;
    $scope.pictureData = null;

    //variables

    //methods
    $scope.createTransportation = () => {
        if (!$scope.transForm.$valid) {
            return;
        }
        $scope.isLoading = true;
        $scope.transportation.user = SessionService.getSessionUser();
        $scope.transportation.token = SessionService.getSessionToken();
        $scope.transportation.CreatedBy = SessionService.getSessionUserId();
        TransportationService.createTransportation($scope.transportation)
		.success(response => {
		    $scope.isLoading = false;
		    if (response && response.Success == true) {
		        $scope.loadPicture(response.Id, true);
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

    $scope.loadPicture = (applicationId, type) => {
        let data = $scope.pictureData;
        if (data == null) {
            return;
        }
        let request = {
            ApplicationId: applicationId,
            Image: data,
            Type: type
        };
        ApplicationPictureService.createApplicationPicture(request)
		.success(response => {
		    if (response && response.Success == true) {
		    }
		    else {
		        NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
		    }
		}).error(error => {
		    NotificationService.errorFromResponse(error);
		});
    }

    $scope.fileChanged = () => {
        file = document.getElementById("trans-picture").files[0];
        let reader = new FileReader();

        reader.addEventListener("load", () => {
            if (reader.result.indexOf("jpg") != -1 || reader.result.indexOf("jpeg") != -1 || reader.result.indexOf("png") != -1) {
                $scope.pictureData = reader.result;
                $scope.transportation.Image = reader.result;
            }
            else {
                NotificationService.warning(moduleConstants.invalidPictureFormat);
                document.getElementById("trans-picture").value = "";
            }
        }, false);

        if (file && file.size <= (moduleConstants.pictureSizeLimitMb * 1000000)) {
            reader.readAsDataURL(file);
        }
        else if (file && file.size > (moduleConstants.pictureSizeLimitMb * 1000000)) {
            NotificationService.warning(moduleConstants.pictureSizeInvalid.replace("{0}", moduleConstants.pictureSizeLimitMb));
            document.getElementById("trans-picture").value = "";
        }
    }

    $scope.phoneMask = () => {
        jQuery( ($) => {
            $("#contactPhone").mask(moduleConstants.phoneMask);
        });
    }

    //init
    $scope.phoneMask();
    //
});