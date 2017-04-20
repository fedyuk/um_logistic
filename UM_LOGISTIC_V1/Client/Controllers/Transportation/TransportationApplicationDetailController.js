mainModule.controller('TransportationApplicationDetailController', function ($rootScope, $scope, $stateParams, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper) {

    if (!$stateParams.id) {
        $location.path("/404");
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
    //variables

    //methods
    $scope.getTransportation = function () {
        $scope.isLoading = true;
        var user = SessionService.getSessionUser();
        var token = SessionService.getSessionToken();
        var id = $stateParams.id;
        TransportationService.getTransportation(user, token, id)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
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
        var type = true;
        ApplicationPictureService.getApplicationPictures(id, type)
		.success(function (response) {
		    if (response.Success) {
		        if(response.Result != null) {
		            for(var i = 0; i < response.Result.length; i ++) {
		                $scope.pictures.push({url: response.Result[i], number: i});
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

    $scope.getTransportation();
    $scope.getPictures($stateParams.id);
});