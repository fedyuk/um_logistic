mainModule.controller('CooperationController', function ($rootScope, $scope, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService) {

    //variables 
    $scope.cooperations = [];
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    $scope.isLoading = false;
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
		                title: response.Result[i].FullName,
		                carModel: response.Result[i].CarModel,
		                workCost: response.Result[i].WorkCost,
		                residenceAddress: response.Result[i].ResidenceAddress
		            });
		        }
		    }
		    else {
		        $log.log(response.Error);
		        NotificationService.error(response.Error);
		    }
		}).error(function (error) {
		    $log.log(error);
		    NotificationService.error(error);
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
    //methods

    //init controller
    $scope.initCooperationsList();

    //init controller
});