﻿mainModule.controller('CooperationApplicationController', function ($rootScope, $scope, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

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
	    model: {
            id: 1
	    },
		options: []
	};
    $scope.isLoading = false;
    //variables

    //methods
    $scope.createCooperation = function () {
        if (!$scope.coopForm.$valid) {
            return;
        }
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
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
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
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
	}
	
	$scope.loadPicture = function(applicationId, type) {
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
	    file = document.getElementById("coop-picture").files[0];
	    var reader = new FileReader();

	    reader.addEventListener("load", function () {
	        if (reader.result.indexOf("jpg") != -1 || reader.result.indexOf("jpeg") != -1 || reader.result.indexOf("png") != -1) {
	            $scope.pictureData = reader.result;
	        }
	        else {
	            NotificationService.error("Картинки повинні бути у форматі jpg, jpeg, png");
	            document.getElementById("coop-picture").value = "";
	        }
	    }, false);

	    if (file && file.size <= 2000000) {
	        reader.readAsDataURL(file);
	    }
	    else if (file && file.size > 2000000) {
	        NotificationService.error("Розмір картинки повинен бути не більше 2 МБ");
	        document.getElementById("coop-picture").value = "";
	    }
	}
	
	// init
	$scope.loadWorkTypes();
	// init
});