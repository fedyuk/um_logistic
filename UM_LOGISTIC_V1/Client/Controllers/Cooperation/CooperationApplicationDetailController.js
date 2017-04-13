﻿mainModule.controller('CooperationApplicationDetailController', function ($rootScope, $scope, $stateParams, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper) {

    if (!$stateParams.id) {
        $location.path("/404");
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
    //variables

    //methods
    $scope.getCooperation = function () {
        $scope.isLoading = true;
        var user = SessionService.getSessionUser();
        var token = SessionService.getSessionToken();
        var id = $stateParams.id;
        CooperationService.getCooperation(user, token, id)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
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
        var type = false;
        ApplicationPictureService.getApplicationPictures(id, type)
		.success(function (response) {
		    if (response.Success) {
		        if (response.Result != null) {
		            for (var i = 0; i < response.Result.length; i++) {
		                $scope.pictures.push({ url: response.Result[i], number: i });
		            }
		            if ($scope.pictures.length > 0) {
		                $scope.logo = $scope.pictures[0];
		            }
		        }
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.getCooperation();
    $scope.getPictures($stateParams.id);
});