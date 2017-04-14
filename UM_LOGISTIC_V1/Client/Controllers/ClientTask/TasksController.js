mainModule.controller('TasksController', function ($scope, $log, ClientTaskService, SessionService, moduleConstants, NotificationService, FormHelper) {

    //variables
    $scope.tasks = [];
    $scope.isLoading = false;
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    //variables
    //methods

    $scope.listTasks = function (page, count) {
        ClientTaskService.getClientTasks(page, count).success(function (response) {
            $scope.isLoading = false;
            if (response.Success) {
                for (var i = 0; i < response.Result.length; i++) {
                    $scope.tasks.push({
                        id: FormHelper.getFormValue(response.Result[i].Id),
                        type: FormHelper.getFormValue(response.Result[i].Type.Name),
                        title: FormHelper.getFormValue(response.Result[i].Title),
                        createdOn: new Date(response.Result[i].CreatedOn).toLocaleString(),
                        modifiedOn: new Date(response.Result[i].ModifiedOn).toLocaleString()
                    });
                }
            } else {
                NotificationService.error(JSON.stringify(response.Error));
            }
        }).error(function (error) {
            $scope.isLoading = false;
            NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
        });
    }

    $scope.loadMore = function () {
        $scope.currentPage++;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
    }

    $scope.initTasksList = function () {
        $scope.isLoading = true;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
    }
    $scope.acceptTask = function (id) {
        $scope.isLoading = true;
        ClientTaskService.acceptTask(id)
        .success(function (response) {
            $scope.isLoading = false;
            if (response.Success == true) {
                for (var i = 0; i < $scope.tasks.length; i++)
                    if ($scope.tasks[i].id === id) {
                        $scope.tasks.splice(i, 1);
                        break;
                    }
            }
            if (response.Success == false) {
                NotificationService.error(response.Error);
            }
        }).error(function (error) {
            $scope.isLoading = false;
            NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
        });
    }

    //methods

    $scope.initTasksList();
});