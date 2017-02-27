mainModule.controller('CooperationApplicationController', function ($rootScope, $scope, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

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
	
	$scope.pictureData = null;
	
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
		$scope.cooperation.WorkTypeId = $scope.workTypes.model != null ? $scope.workTypes.model.id : 1;
        CooperationService.createCooperation($scope.cooperation)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		        NotificationService.success(moduleConstants.cooperationApplicationCreatingSuccess);
		        $location.path(moduleConstants.homePath);
				$scope.loadPicture(response.Id, false);
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error));
		});
    }
	
	$scope.loadWorkTypes = function() {
		CooperationService.getWorkTypes()
		.success(function (response) {
			for(var i = 0; i < response.length; i++) {
				$scope.workTypes.options.push({
					id: response[i].Id,
					name: response[i].Name
				});
			}
			$scope.workTypes.model = $scope.workTypes.options[0];
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error));
		});
	}
	
	$scope.loadPicture = function(applicationId, type) {
		var data = $scope.pictureData;
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
		    NotificationService.error(JSON.stringify(error));
		});
	}
	
	$scope.fileChanged = function() {

		file = document.getElementById("coop-picture").files[0];
		var reader = new FileReader();

		reader.addEventListener("load", function () {
		    $scope.pictureData = reader.result;
		}, false);

		if (file) {
		    reader.readAsDataURL(file);
		}
	}
	
	// init
	$scope.loadWorkTypes();
	// init
});