﻿mainModule.controller('CooperationApplicationDetailController', function ($rootScope, $scope, $stateParams, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper, ClientTaskService, ApplicationTrashService) {

    if (!$stateParams.id) {
        $location.path(moduleConstants.notFoundPath);
        return;
    }
    //variables 
    $scope.cooperationToView = {
        Id: 0,
        FullName: "",
        ResidenceAddress: "",
        ParkingPlace: "",
        ContactPhone: "",
        IsPhysicalPerson: false,
        IsBussinessPerson: false,
        CarModel: "",
        TransportLength: 0,
        TransportWidth: 0,
        TransportHeight: 0,
        TransportWeight: 0,
        TransportCapacity: 0,
        TransportArrow: 0,
        WorkCost: 0.0,
        WorkType: "",
        DeliveryCost: 0.0,
    };
    $scope.isLoading = false;
    $scope.pictures = [];
    $scope.logo = {};
    $scope.htmlPicuresContent = "";
    //variables

    //methods
    $scope.getCooperation = () => {
        $scope.isLoading = true;
        let user = SessionService.getSessionUser();
        let token = SessionService.getSessionToken();
        let id = $stateParams.id;
        CooperationService.getCooperation(user, token, id)
		.success(response => {
		    $scope.isLoading = false;
		    if (response && response.Success == true) {
		        if (response.Result != null) {
		            $scope.cooperationToView.Id = FormHelper.getFormValue(response.Result.Id);
		            $scope.cooperationToView.FullName = FormHelper.getFormValue(response.Result.FullName);
		            $scope.cooperationToView.ResidenceAddress = FormHelper.getFormValue(response.Result.ResidenceAddress);
		            $scope.cooperationToView.ParkingPlace = FormHelper.getFormValue(response.Result.ParkingPlace);
		            $scope.cooperationToView.ContactPhone = FormHelper.getFormValue(response.Result.ContactPhone);
		            $scope.cooperationToView.IsPhysicalPerson = FormHelper.getBooleanText(response.Result.IsPhysicalPerson);
		            $scope.cooperationToView.IsBussinessPerson = FormHelper.getBooleanText(response.Result.IsBussinessPerson);
		            $scope.cooperationToView.CarModel = FormHelper.getFormValue(response.Result.CarModel);
		            $scope.cooperationToView.TransportLength = FormHelper.getFormValue(response.Result.TransportLength);
		            $scope.cooperationToView.TransportWidth = FormHelper.getFormValue(response.Result.TransportWidth);
		            $scope.cooperationToView.TransportHeight = FormHelper.getFormValue(response.Result.TransportHeight);
		            $scope.cooperationToView.TransportWeight = FormHelper.getFormValue(response.Result.TransportWeight);
		            $scope.cooperationToView.TransportCapacity = FormHelper.getFormValue(response.Result.TransportCapacity);
		            $scope.cooperationToView.TransportArrow = FormHelper.getFormValue(response.Result.TransportArrow);
		            $scope.cooperationToView.WorkCost = FormHelper.getFormValue(response.Result.WorkCost);
		            $scope.cooperationToView.WorkType = FormHelper.getFormValue(response.Result.WorkType.Name);
		            $scope.cooperationToView.DeliveryCost = FormHelper.getFormValue(response.Result.DeliveryCost);
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
        let type = false;
        ApplicationPictureService.getApplicationPictures(id, type)
		.success(response => {
		    if (response && response.Success == true) {
		        if (response.Result != null) {
		            for (let i = 0; i < response.Result.length; i++) {
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
        let type = false;
        ApplicationPictureService.getApplicationPicturesHtml(id, type)
		.success(response => {
		    if (response && response.length > 0) {
		        for (let i = 0; i < response.length; i++) {
		            $scope.htmlPicuresContent += response[i];
		        }
		        $('#gallery-cooperation').append($scope.htmlPicuresContent);
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
            onopen: function (image) {
                $(".navbar").removeClass("navbar-fixed-top");
            },
            onclose: function (image) {
                $(".navbar").addClass("navbar-fixed-top");
            },
            onload: function (event) {
            },
            onresize: function (image) {
            },
            onloaderror: function (event) {
                if (event._happenedWhile === 'prev')
                    lightbox.prev()
                else
                    lightbox.next()
            },
            onimageclick: function (image) {
            }
        });
    }

    $scope.acceptApplication = (id) => {
        let request = {};
        request.UserId = SessionService.getSessionUserId();
        request.ApplicationId = id;
        request.TypeId = 3;
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
            Type: false,
            UserId: userId
        };
        ApplicationTrashService.createApplicationTrash(request).success(response => {
            if (response && response.Success == false) {
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
            if (response && response.Success == true) {
                let isTrashAdded = SessionService.addTrashElement(id, false, title);
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
        ApplicationTrashService.removeTrashElement(id, false)
        .success(response => {
            if (response && response.Success == true) {
                $scope.isLoading = false;
                SessionService.removeShopTrashElement(id, false);
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

    $scope.getCooperation();
    $scope.getPictures($stateParams.id);
    $scope.getPicturesHtml($stateParams.id);
});