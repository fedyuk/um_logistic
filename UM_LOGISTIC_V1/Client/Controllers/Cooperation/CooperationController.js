﻿mainModule.controller('CooperationController', function ($rootScope, $scope, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

    //variables 
    $scope.cooperations = [];
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    $scope.isLoading = false;
    $scope.pictures = {};
    //variables

    //methods

    $scope.listCooperations = function (page, count) {
        CooperationService.getCooperations(SessionService.getSessionUser(), SessionService.getSessionToken(),
            $scope.currentPage, $scope.currentCount)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		        for (var i = 0; i < response.Result.length; i++) {
		            $scope.cooperations.push({
		                id: response.Result[i].Id,
		                title: response.Result[i].FullName,
		                contactPhone: response.Result[i].ContactPhone,
		                carModel: response.Result[i].CarModel,
		                workCost: response.Result[i].WorkCost,
		                residenceAddress: response.Result[i].ResidenceAddress
		            });
		            $scope.getPicture(response.Result[i].Id);
		        }
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.loadMore = function () {
        $scope.currentPage++;
        $scope.listCooperations($scope.currentPage, $scope.currentCount);
    }

    $scope.initCooperationsList = function () {
		$scope.isLoading = true;
        $scope.listCooperations($scope.currentPage, $scope.currentCount);
    }

    $scope.getPicture = function (id) {
        var type = false;
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

    //methods

    //init controller
    $scope.initCooperationsList();

    //init controller
});