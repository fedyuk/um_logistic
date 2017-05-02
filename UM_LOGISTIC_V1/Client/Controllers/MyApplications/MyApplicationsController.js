﻿mainModule.controller('MyApplicationsController', function ($rootScope, $scope, $log, $location, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper, FilterService) {

    //variables 
    $scope.t_applications = [];
    $scope.c_applications = [];
    $scope.currentPage = 0;
    $scope.currentCount = moduleConstants.pageRowsCount;
    $scope.isLoading = false;
    $scope.pictures = [];
    $scope.currentApplicationType = true;
    $scope.applicationTypes = {
        model: null,
        availableOptions: [
          { id: true, name: 'Перевезення' },
          { id: false, name: 'Співробітництво' }
        ]
    };
    $scope.currentTypeCaption = "Перевезення";
    $scope.isOrderedByMe = false;
    //variables

    //methods

    $scope.listApplications = function (page, count, isClear) {
        var invoke = null;
        var userId = SessionService.getSessionUserId();
        if(!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            return;
        }
        switch ($scope.currentApplicationType) {
            case true:
                invoke = $scope.isOrderedByMe == false ? FilterService.getTransportationApplications("Filtered==true;CreatedBy=" + userId,
            $scope.currentPage, $scope.currentCount) : FilterService.getOrderedByMeApplications(true, userId);
                invoke.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		        if (isClear == true) {
		            $scope.t_applications = [];
		        }
		        for (var i = 0; i < response.Result.length; i++) {
		            $scope.t_applications.push({
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                name: FormHelper.getFormValue(response.Result[i].Name),
		                contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
		                sendAddress: FormHelper.getFormValue(response.Result[i].SendAddress),
		                deliveryAddress: FormHelper.getFormValue(response.Result[i].DeliveryAddress),
		                completeDate: response.Result[i].completeDate ? new Date(response.Result[i].completeDate).toLocaleString() : moduleConstants.emptyTextValue,
		                shipmentType: FormHelper.getFormValue(response.Result[i].ShipmentType),
		                shipmentLength: FormHelper.getFormValue(response.Result[i].ShipmentLength),
		                shipmentWidth: FormHelper.getFormValue(response.Result[i].ShipmentWidth),
		                shipmentHeight: FormHelper.getFormValue(response.Result[i].ShipmentHeight),
		                shipmentCapacity: FormHelper.getFormValue(response.Result[i].ShipmentCapacity),
		                shipmentWeight: FormHelper.getFormValue(response.Result[i].ShipmentWeight),
		            });
		            $scope.getPicture(response.Result[i].Id, $scope.currentApplicationType);
		        }
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
                break;
            case false:
                invoke = $scope.isOrderedByMe == false ? FilterService.getTransportationApplications("Filtered==true;CreatedBy=" + userId,
                $scope.currentPage, $scope.currentCount) : FilterService.getOrderedByMeApplications(false, userId);
       invoke.success(function (response) {
           $scope.isLoading = false;
           if (response.Success) {
               if (isClear == true) {
                   $scope.c_applications = [];
               }
               for (var i = 0; i < response.Result.length; i++) {
                   $scope.c_applications.push({
                       id: FormHelper.getFormValue(response.Result[i].Id),
                       fullName: FormHelper.getFormValue(response.Result[i].FullName),
                       residenceAddress: FormHelper.getFormValue(response.Result[i].ResidenceAddress),
                       parkingPlace: FormHelper.getFormValue(response.Result[i].ParkingPlace),
                       contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
                       isPhysicalPerson: FormHelper.getBooleanText(response.Result[i].IsPhysicalPerson),
                       isBussinessPerson: FormHelper.getBooleanText(response.Result[i].IsBussinessPerson),
                       carModel: FormHelper.getFormValue(response.Result[i].CarModel),
                       transportWidth: FormHelper.getFormValue(response.Result[i].TransportWidth),
                       transportHeight: FormHelper.getFormValue(response.Result[i].TransportHeight),
                       transportWeight: FormHelper.getFormValue(response.Result[i].TransportWeight),
                       transportCapacity: FormHelper.getFormValue(response.Result[i].TransportCapacity),
                       transportArrow: FormHelper.getFormValue(response.Result[i].TransportArrow),
                   });
                   $scope.getPicture(response.Result[i].Id, $scope.currentApplicationType);
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
    }

    $scope.loadMore = function () {
        $scope.currentPage++;
        $scope.listApplications($scope.currentPage, $scope.currentCount);
    }

    $scope.initApplicationsList = function () {
        $scope.isLoading = true;
        $scope.listApplications($scope.currentPage, $scope.currentCount);
    }

    $scope.getPicture = function (id, type) {
        ApplicationPictureService.getApplicationPicture(id, type)
		.success(function (response) {
		    if (response.Success) {
		        $scope.pictures[id] = response.Result;
		    }
		    else {
		        $scope.pictures[id] = "";
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		    $scope.pictures[id] = "";
		});
    }

    $scope.changeApplicationType = function (type, caption) {
        $scope.currentPage = 0;
        $scope.currentTypeCaption = caption;
        $scope.t_applications = [];
        $scope.c_applications = [];
        $scope.currentApplicationType = type;
        $scope.listApplications($scope.currentPage, $scope.currentCount, true);
    }

    $scope.onChangeMyOrderedFilter = function () {
        $scope.listApplications($scope.currentPage, $scope.currentCount, true);
    }

    //methods

    //init controller
    $scope.initApplicationsList();

    //init controller
});