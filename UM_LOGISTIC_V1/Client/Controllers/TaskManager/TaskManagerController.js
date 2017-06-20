mainModule.controller('TaskManagerController', function ($scope, ClientTaskService, SessionService, moduleConstants, NotificationService, FormHelper, EventService) {

    //variables
    $scope.tasks = [];
    $scope.isLoading = false;
    $scope.isPartLoading = false;
    $scope.currentPage = 0;
    $scope.currentCount = moduleConstants.taskManagerLimitRows;
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
        ClientTaskService.getClientTasks(page, count, '').success(response => {
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            if (response.Success) {
                for (let i = 0; i < response.Result.length; i++) {
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

    $scope.initTasksList = () =>{
        $scope.isLoading = true;
        $scope.listTasks($scope.currentPage, $scope.currentCount);
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

    $scope.initializeTaskManagerNotifications = () => {
        EventService.initializeTaskManagerHub();
        EventService.subscribeToTaskMangerNotifications();
        EventService.startTaskManagerHubConnection();
    }

    $scope.$on("taskManagerChanged", (event, args) => {
        if (args.taskId == 0) {
            NotificationService.warning("Задача виконана");
        }
        if (args.taskId > 0) {
            NotificationService.warning("Нова задача");
        }
        $scope.tasks = [];
        $scope.isLoading = true;
        $scope.listTasks(0, $scope.currentCount);
    });

    $scope.unFocusLimitRows = () => {
        $scope.tasks = [];
        $scope.isLoading = true;
        $scope.listTasks(0, $scope.currentCount);
    }

    //methods

    EventService.stopTaskManagerHubConnection();
    $scope.initTasksList();
    $scope.initializeTaskManagerNotifications();
});