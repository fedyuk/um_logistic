﻿mainModule.controller('TaskManagerController', function ($scope, ClientTaskService, SessionService, moduleConstants, NotificationService, FormHelper, EventService) {

    //variables
    $scope.tasks = [];
    $scope.isLoading = false;
    $scope.isPartLoading = false;
    $scope.currentPage = 0;
    $scope.currentCount = 50;//moduleConstants.pageRowsCount;
    //variables
    //methods

    $scope.listTasks = function (page, count) {
        var userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        ClientTaskService.getClientTasks(page, count, '').success(function (response) {
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            if (response.Success) {
                for (var i = 0; i < response.Result.length; i++) {
                    $scope.tasks.push({
                        id: FormHelper.getFormValue(response.Result[i].Id),
                        typeId: FormHelper.getFormValue(response.Result[i].Type.Id),
                        type: FormHelper.getFormValue(response.Result[i].Type.Name),
                        title: FormHelper.getFormValue(response.Result[i].Title),
                        createdOn: new Date(response.Result[i].CreatedOn).toLocaleString(),
                        cooperationApplicationId: FormHelper.getFormValue(response.Result[i].CooperationApplicationId),
                        transportationApplicationId: FormHelper.getFormValue(response.Result[i].TransportationApplicationId),
                        user: response.Result[i].User,
                        ownerName: FormHelper.getFormValue(response.Result[i].Owner.Account.FullName),
                    });
                }
            } else {
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
        }).error(function (error) {
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            if (!error) {
                NotificationService.error(moduleConstants.internalErrorCaption);
                return;
            }
            NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
        });
    }

    $scope.loadMore = function () {
        $scope.isPartLoading = true;
        $scope.currentPage++;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
    }

    $scope.initTasksList = function () {
        $scope.isLoading = true;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
    }

    $scope.showUserInfo = function (user) {
        var message = "<p>ID: " + FormHelper.getFormValue(user.Id) + "</p>";
        message += "<p>Логін: " + FormHelper.getFormValue(user.UserName) + "</p>";
        message += "<p>ФИО: " + FormHelper.getFormValue(user.Account.FullName) + "</p>";
        message += "<p>Домашній телефон: " + FormHelper.getFormValue(user.Account.HomePhone) + "</p>";
        message += "<p>Робочий телефон: " + FormHelper.getFormValue(user.Account.WorkPhone) + "</p>";
        message += "<p>Роль: " + FormHelper.getFormValue(user.Role.Name) + "</p>";
        var dialog = bootbox.dialog({
            title: moduleConstants.userInfoCaption,
            message: message
        });
    }

    $scope.initializeTaskManagerNotifications = function () {
        EventService.initializeTaskManagerHub();
        EventService.subscribeToTaskMangerNotifications();
        EventService.startTaskManagerHubConnection();
    }

    $scope.$on("taskManagerChanged", function (event, args) {
        if (args.taskId == 0) {
            NotificationService.warning("Задача виконана");
        }
        if (args.taskId > 0) {
            NotificationService.warning("Нова задача");
        }
        $scope.tasks = [];
        $scope.listTasks(0, 50);
    });

    //methods

    EventService.stopTaskManagerHubConnection();
    $scope.initTasksList();
    $scope.initializeTaskManagerNotifications();
});