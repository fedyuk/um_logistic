mainModule.controller('TransportationController', function ($rootScope, $scope, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper) {

    //variables 
    $scope.transportations = [];
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    $scope.isLoading = false;
    $scope.pictures = {};
    //variables

    //methods

    $scope.listTransportations = function (page, count) {
        TransportationService.getTransportations(SessionService.getSessionUser(), SessionService.getSessionToken(),
            $scope.currentPage, $scope.currentCount)
		.success(function (response) {
		    $scope.isLoading = false;
		    if (response.Success) {
		        for (var i = 0; i < response.Result.length; i++) {
		            $scope.transportations.push({
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                title: FormHelper.getFormValue(response.Result[i].Name),
		                contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
		                sendAddress: FormHelper.getFormValue(response.Result[i].SendAddress),
		                deliveryAddress: FormHelper.getFormValue(response.Result[i].DeliveryAddress),
		                createdOn: new Date(response.Result[i].CreatedOn).toLocaleString()
		            });
		            $scope.getPicture(response.Result[i].Id);
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

    $scope.loadMore = function () {
        $scope.currentPage++;
        $scope.listTransportations($scope.currentPage, $scope.currentCount);
    }

    $scope.initTransportationsList = function () {
		$scope.isLoading = true;
        $scope.listTransportations($scope.currentPage, $scope.currentCount);
    }

    $scope.getPicture = function (id) {
        var type = true;
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
    $scope.initTransportationsList();

    //init controller
});