mainModule.controller('CooperationApplicationDetailController', function ($rootScope, $scope, $stateParams, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService) {

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
		            $scope.cooperationToView.Id = response.Result.Id;
		            $scope.cooperationToView.FullName = response.Result.FullName;
		            $scope.cooperationToView.ResidenceAddress = response.Result.ResidenceAddress;
		            $scope.cooperationToView.ParkingPlace = response.Result.ParkingPlace;
		            $scope.cooperationToView.ContactPhone = response.Result.ContactPhone;
		            $scope.cooperationToView.IsPhysicalPerson = response.Result.IsPhysicalPerson;
		            $scope.cooperationToView.IsBussinessPerson = response.Result.IsBussinessPerson;
		            $scope.cooperationToView.CarModel = response.Result.CarModel;
		            $scope.cooperationToView.TransportLength = response.Result.TransportLength;
		            $scope.cooperationToView.TransportWidth = response.Result.TransportWidth;
		            $scope.cooperationToView.TransportHeight = response.Result.TransportHeight;
		            $scope.cooperationToView.TransportWeight = response.Result.TransportWeight;
		            $scope.cooperationToView.TransportCapacity = response.Result.TransportCapacity;
		            $scope.cooperationToView.TransportArrow = response.Result.TransportArrow;
		            $scope.cooperationToView.WorkCost = response.Result.WorkCost;
		            $scope.cooperationToView.WorkType = response.Result.WorkType.Name;
		            $scope.cooperationToView.DeliveryCost = response.Result.DeliveryCost;
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
		        }
		    }
		}).error(function (error) {
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
    }

    $scope.getCooperation();
    $scope.getPictures($stateParams.id);
});