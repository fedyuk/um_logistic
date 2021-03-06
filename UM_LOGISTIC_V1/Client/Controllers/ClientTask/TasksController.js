﻿mainModule.controller('TasksController', function ($scope, $log, ClientTaskService, SessionService, moduleConstants, NotificationService, FormHelper) {

    //variables
    $scope.tasks = new Array();
    $scope.isLoading = false;
    $scope.isPartLoading = false;
    $scope.currentPage = 0;
    $scope.currentCount = moduleConstants.pageRowsCount;
    //variables
    //methods

    $scope.listTasks = (page, count) => {
        let userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        ClientTaskService.getClientTasks(page, count, 'OwnerId==' + userId + ';').success(response => {
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            if (response && response.Success == true) {
                for (let i = 0; i < response.Result.length; i++) {
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
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
        }).error(error => {
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            NotificationService.errorFromResponse(error);
        });
    }

    $scope.loadMore = () => {
        $scope.isPartLoading = true;
        $scope.currentPage++;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
    }

    $scope.initTasksList = () => {
        $scope.isLoading = true;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
    }
    $scope.acceptTask = (id) => {
        bootbox.confirm({
            message: moduleConstants.deleteTaskConfirmation,
            buttons: {
                confirm: {
                    label: 'Так',
                    className: 'btn-default btn-sm'
                },
                cancel: {
                    label: 'Ні',
                    className: 'btn-default btn-sm'
                }
            },
            callback: (ok) => {
                if (ok == true) {
                    ClientTaskService.acceptTask(id)
                    .success(response => {
                        $scope.isLoading = false;
                        if (response.Success == true) {
                            for (let i = 0; i < $scope.tasks.length; i++)
                                if ($scope.tasks[i].id === id) {
                                    $scope.tasks.splice(i, 1);
                                    break;
                                }
                        }
                        if (response.Success == false) {
                            NotificationService.error(response.Error);
                        }
                    }).error(error => {
                        $scope.isLoading = false;
                        NotificationService.errorFromResponse(error);
                    });
                }
            }
        });
    }

    $scope.showUserInfo = (user) => {
        let message = "<p>ID: " + FormHelper.getFormValue(user.Id) + "</p>";
        message += "<p>Логін: " + FormHelper.getFormValue(user.UserName) + "</p>";
        message += "<p>ФИО: " + FormHelper.getFormValue(user.Account.FullName) + "</p>";
        message += "<p>Домашній телефон: " + FormHelper.getFormValue(user.Account.HomePhone) + "</p>";
        message += "<p>Робочий телефон: " + FormHelper.getFormValue(user.Account.WorkPhone) + "</p>";
        message += "<p>Роль: " + FormHelper.getFormValue(user.Role.Name) + "</p>";
        let dialog = bootbox.dialog({
            title: moduleConstants.userInfoCaption,
            message: message
        });
    }


    //methods

    $scope.initTasksList();
});