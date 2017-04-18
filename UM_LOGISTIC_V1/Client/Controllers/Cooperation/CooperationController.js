mainModule.controller('CooperationController', function ($rootScope, $scope, $log, $location, CooperationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, ClientTaskService, FormHelper) {

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
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                title: FormHelper.getFormValue(response.Result[i].FullName),
		                contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
		                carModel: FormHelper.getFormValue(response.Result[i].CarModel),
		                workCost: FormHelper.getFormValue(response.Result[i].WorkCost),
		                residenceAddress: FormHelper.getFormValue(response.Result[i].ResidenceAddress),
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

    $scope.acceptApplication = function (id) {
        $scope.isLoading = true;
        var request = {};
        request.UserId = SessionService.getSessionUserId();
        request.ApplicationId = id;
        request.TypeId = 3;
        ClientTaskService.createApplicationTask(request)
        .success(function (response) {
            if (response.Success) {
                NotificationService.success("Ваша заявка прийнята");
                $scope.isLoading = false;
            }
            else {
                $scope.isLoading = false;
                NotificationService.error(response.Error);
            }
        }).error(function (error) {
            $scope.isLoading = false;
            NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
        });
    }

    //methods

    //init controller
    $scope.initCooperationsList();

    //init controller
});