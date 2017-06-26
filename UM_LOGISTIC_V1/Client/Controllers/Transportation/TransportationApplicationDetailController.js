mainModule.controller('TransportationApplicationDetailController', function ($rootScope, $location, $scope, $stateParams, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper, ClientTaskService, ApplicationTrashService) {

    if (!$stateParams.id) {
        $location.path(moduleConstants.notFoundPath);
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
    $scope.logo = {};
    $scope.htmlPicuresContent = "";
    //variables

    //methods
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
		            $scope.transportationToView.Id = FormHelper.getFormValue(response.Result.Id);
		            $scope.transportationToView.Name = FormHelper.getFormValue(response.Result.Name);
		            $scope.transportationToView.ContactPhone = FormHelper.getFormValue(response.Result.ContactPhone);
		            $scope.transportationToView.SendAddress = FormHelper.getFormValue(response.Result.SendAddress);
		            $scope.transportationToView.DeliveryAddress = FormHelper.getFormValue(response.Result.DeliveryAddress);
		            $scope.transportationToView.CompleteDate = new Date(response.Result.CompleteDate).toLocaleString()
		            $scope.transportationToView.ShipmentType = FormHelper.getFormValue(response.Result.ShipmentType);
		            $scope.transportationToView.ShipmentLength = FormHelper.getFormValue(response.Result.ShipmentLength);
		            $scope.transportationToView.ShipmentWidth = FormHelper.getFormValue(response.Result.ShipmentWidth);
		            $scope.transportationToView.ShipmentHeight = FormHelper.getFormValue(response.Result.ShipmentHeight);
		            $scope.transportationToView.ShipmentCapacity = FormHelper.getFormValue(response.Result.ShipmentCapacity);
		            $scope.transportationToView.ShipmentWeight = FormHelper.getFormValue(response.Result.ShipmentWeight);
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

    $scope.getPictures = (id) => {
        let type = true;
        ApplicationPictureService.getApplicationPictures(id, type)
		.success(response => {
		    if (response && response.Success == true) {
		        if(response.Result != null) {
		            for(let i = 0; i < response.Result.length; i ++) {
		                $scope.pictures.push({ url: response.Result[i], number: i });
		            }
		            if ($scope.pictures.length > 0) {
		                $scope.logo = $scope.pictures[0];
		            }
		            $scope.initLightboxNative();
		        }
		    }
		}).error(error => {
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

    $scope.initLightboxNative = () => 
    {
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
    $scope.acceptApplication = (id) => {
        let request = {};
        request.UserId = SessionService.getSessionUserId();
        request.ApplicationId = id;
        request.TypeId = 2;
        ClientTaskService.createApplicationTask(request)
        .success(response => {
            if (response && response.Success == true) {
                NotificationService.success(moduleConstants.callFeedbackAccepted);
                $scope.isLoading = false;
            }
            else {
                $scope.isLoading = false;
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
        }).error(error => {
            $scope.isLoading = false;
            NotificationService.errorFromResponse(error);
        });
    }

    $scope.moveIntoTrash = (id, title) => {
        let userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        let request = {
            ApplicationId: id,
            Type: true,
            UserId: userId
        };
        ApplicationTrashService.createApplicationTrash(request).success(response => {
            if (response && response.Success == false) {
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
            if (response && response.Success == true) {
                let isTrashAdded = SessionService.addTrashElement(id, true, title);
                if (isTrashAdded == true) {
                    $rootScope.$broadcast("trashElementAdded", null);
                }
            }
        }).error(error => {
            NotificationService.errorFromResponse(error);
        });

    }

    $scope.isExistElementInTrash = (id, type) => {
        return SessionService.isExistsTrashElement(id, type);
    }

    $scope.removeFromTrash = (id) => {
        let userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        ApplicationTrashService.removeTrashElement(id, true)
        .success(response => {
            if (response && response.Success == true) {
                $scope.isLoading = false;
                SessionService.removeShopTrashElement(id, true);
                $rootScope.$broadcast("trashElementRemoved", null);
            }
            else {
                $scope.isLoading = false;
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
        }).error(error => {
            $scope.isLoading = false;
            NotificationService.errorFromResponse(error);
        });
    }

    $scope.getTransportation();
    $scope.getPictures($stateParams.id);
    $scope.getPicturesHtml($stateParams.id);
});