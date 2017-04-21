﻿mainModule.controller('TasksController', function ($scope, $log, ClientTaskService, SessionService, moduleConstants, NotificationService, FormHelper) {

    //variables
    $scope.tasks = [];
    $scope.isLoading = false;
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    //variables
    //methods

    $scope.listTasks = function (page, count) {
		var userId = SessionService.getSessionUserId();
        ClientTaskService.getClientTasks(page, count, 'OwnerId==' + userId + ';').success(function (response) {
            $scope.isLoading = false;
            if (response.Success) {
                for (var i = 0; i < response.Result.length; i++) {
                    $scope.tasks.push({
                        id: FormHelper.getFormValue(response.Result[i].Id),
                        typeId: FormHelper.getFormValue(response.Result[i].Type.Id),
                        type: FormHelper.getFormValue(response.Result[i].Type.Name),
                        title: FormHelper.getFormValue(response.Result[i].Title),
                        createdOn: new Date(response.Result[i].CreatedOn).toLocaleString(),
                        modifiedOn: new Date(response.Result[i].ModifiedOn).toLocaleString(),
                        cooperationApplicationId: FormHelper.getFormValue(response.Result[i].CooperationApplicationId),
                        transportationApplicationId: FormHelper.getFormValue(response.Result[i].TransportationApplicationId),
                        user: response.Result[i].User
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

    $scope.showUserInfo = function (user) {
        var message = "<p>ID: " + FormHelper.getFormValue(user.Id) + "</p>";
        message += "<p>Логін: " + FormHelper.getFormValue(user.UserName) + "</p>";
        message += "<p>ФИО: " + FormHelper.getFormValue(user.Account.FullName) + "</p>";
        message += "<p>Домашній телефон: " + FormHelper.getFormValue(user.Account.HomePhone) + "</p>";
        message += "<p>Домашній телефон: " + FormHelper.getFormValue(user.Account.WorkPhone) + "</p>";
        message += "<p>Роль: " + FormHelper.getFormValue(user.Role.Name) + "</p>";
        var dialog = bootbox.dialog({
            title: 'Інформація про користувача:',
            message: message
        });
    }


    //methods

    $scope.initTasksList();
});