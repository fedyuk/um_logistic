mainModule.controller('TransportationController', function ($rootScope, $scope, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService) {

    //variables 
    $scope.transportations = [];
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    $scope.isLoading = false;
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
		                title: response.Result[i].Name,
		                contactPhone: response.Result[i].ContactPhone,
		                sendAddress: response.Result[i].SendAddress,
		                deliveryAddress: response.Result[i].DeliveryAddress
		            });
		        }
		    }
		    else {
		        NotificationService.error(JSON.stringify(response.Error));
		    }
		}).error(function (error) {
		    $log.log(error);
		    NotificationService.error(JSON.stringify(error));
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
    //methods

    //init controller
    $scope.initTransportationsList();

    //init controller
});