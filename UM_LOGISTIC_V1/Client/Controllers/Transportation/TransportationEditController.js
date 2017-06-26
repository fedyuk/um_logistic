mainModule.controller('TransportationEditController', function ($rootScope, $scope, $location, $log, $stateParams, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper) {

    if (!$stateParams.id) {
        $location.path(moduleConstants.notFoundPath);
        return;
    }

    //variables 
    $scope.transportationToEdit = {
    };
    $scope.isLoading = false;
    $scope.pictureData = null;
    $scope.pictures = [];
    $scope.htmlPicuresContent = '';

    //variables

    //methods
    $scope.updateTransportation = () => {
        if (!$scope.transForm.$valid) {
            return;
        }
        $scope.isLoading = true;
        $scope.transportationToEdit.CreatedBy = SessionService.getSessionUserId();
        TransportationService.updateTransportation($scope.transportationToEdit)
		.success(response => {
		    $scope.isLoading = false;
		    if (response && response.Success == true) {
		        $location.path(moduleConstants.myApplicationsPath);
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
		        NotificationService.success(moduleConstants.uploadPictureSuccess);
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
                $scope.loadPicture($stateParams.id, true);
                document.getElementById("trans-picture").value = "";
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
            $("#contactPhone").mask("(999) 999-9999");
        });
    }

    $scope.getTransportation = () => {
        $scope.isLoading = true;
        let user = SessionService.getSessionUser();
        let token = SessionService.getSessionToken();
        let id = $stateParams.id;
        TransportationService.getTransportation(user, token, id)
		.success(response => {
		    $scope.isLoading = false;
		    if (response && response.Success == true) {
		        if (response.Result != null) {
		            $scope.transportationToEdit.Id = response.Result.Id;
		            $scope.transportationToEdit.Name = response.Result.Name;
		            $scope.transportationToEdit.ContactPhone = response.Result.ContactPhone;
		            $scope.transportationToEdit.SendAddress = response.Result.SendAddress;
		            $scope.transportationToEdit.DeliveryAddress = response.Result.DeliveryAddress;
		            $scope.transportationToEdit.CompleteDate = new Date(response.Result.CompleteDate);
		            $scope.transportationToEdit.ShipmentType = response.Result.ShipmentType;
		            $scope.transportationToEdit.ShipmentLength = response.Result.ShipmentLength;
		            $scope.transportationToEdit.ShipmentWidth = response.Result.ShipmentWidth;
		            $scope.transportationToEdit.ShipmentHeight = response.Result.ShipmentHeight;
		            $scope.transportationToEdit.ShipmentCapacity = response.Result.ShipmentCapacity;
		            $scope.transportationToEdit.ShipmentWeight = response.Result.ShipmentWeight;
		        }
		        else {
		            $location.path(moduleConstants.notFoundPath);
		        }
		    }
		    else {
		        NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
		    }
		}).error(error => {
		    $scope.isLoading = false;
		    NotificationService.errorFromResponse(error);
		});
    }

    $scope.getPicturesHtml = (id) => {
        let type = true;
        ApplicationPictureService.getApplicationPicturesHtml(id, type)
		.success(response => {
		    if (response && response.length > 0) {
		        for (let i = 0; i < response.length; i++) {
		            $scope.htmlPicuresContent += response[i];
		        }
		        $('#gallery-transportation').append($scope.htmlPicuresContent);
		        $scope.initLightboxNative();
		    }
		}).error(error => {
		    NotificationService.errorFromResponse(error);
		});
    }

    $scope.initLightboxNative = () => {
        let lightbox = new Lightbox();
        lightbox.load({
            boxId: false,
            dimensions: true,
            captions: true,
            prevImg: false,
            nextImg: false,
            hideCloseBtn: false,
            closeOnClick: true,
            loadingAnimation: 200,
            animElCount: 4,
            preload: true,
            carousel: true,
            animation: 400,
            nextOnClick: true,
            responsive: true,
            maxImgSize: 0.8,
            // callbacks
            onopen: (image) => {
                $(".navbar").removeClass("navbar-fixed-top");
            },
            onclose: (image) => {
                $(".navbar").addClass("navbar-fixed-top");
            },
            onload: (event) => {
            },
            onresize: (image) => {
            },
            onloaderror: (event) => {
                if (event._happenedWhile === 'prev')
                    lightbox.prev()
                else
                    lightbox.next()
            },
            onimageclick: (image) => {
            }
        });
    }

    //init
    $scope.phoneMask();
    $scope.getTransportation();
    $scope.getPicturesHtml($stateParams.id);
    //
});