﻿mainModule.controller('CooperationApplicationController', function ($rootScope, $scope, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService) {

    //variables 
    $scope.cooperation = {
        FullName : "",
        ResidenceAddress : "",
        ParkingPlace : "",
        ContactPhone : "",
        IsPhysicalPerson : false,
        IsBussinessPerson : false,
        CarModel : "",
        TransportLength : 0,
        TransportWidth : 0,
        TransportHeight : 0,
        TransportWeight : 0,
        TransportCapacity : 0,
        TransportArrow : 0,
        WorkCost : 0.0,
        WorkTypeId : 1,
        DeliveryCost: 0.0,
        user: "",
        token : ""
    };
	
	$scope.workTypes = {
		model: null,
		options: []
	};
    $scope.isLoading = false;
    //variables

    //methods
    $scope.createCooperation = function () {
        $scope.isLoading = true;
        $scope.cooperation.user = SessionService.getSessionUser();
        $scope.cooperation.token = SessionService.getSessionToken();
        CooperationService.createCooperation($scope.cooperation)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		        NotificationService.success(moduleConstants.cooperationApplicationCreatingSuccess);
		        $location.path(moduleConstants.homePath);
		    }
		    else {
		        $log.log(response.Error);
		        NotificationService.error(response.Error);
		    }
		}).error(function (error) {
		    NotificationService.error(error);
		});
    }
	
	$scope.loadWorkTypes = function() {
		
	}
	
	// init
	$scope.loadWorkTypes();
	// init
});