mainModule.service("EventService", function ($rootScope, SessionService) {
    var con = undefined;
    var hub = undefined;
    var taskManagerConnection = undefined;
    var taskManagerHub = undefined;
    this.initializeEventsHub = function () {
        var nickName = SessionService.getSessionUser();
        con = $.hubConnection();
        con.qs = { "userName": nickName };
        hub = con.createHubProxy("eventsHub");
    }

    this.initializeTaskManagerHub = function () {
        taskManagerConnection = $.hubConnection();
        taskManagerHub = taskManagerConnection.createHubProxy("taskManagerHub");
    }

    this.getEventsHub = function () {
        return hub;
    }

    this.getTaskManagerHub = function () {
        return taskManagerHub;
    }

    this.subscribeToNotifications = function () {
        hub.on('onTaskGot', function (userId, title, typeId) {
            var applicationFaHtml = "<i class='fa fa-file-text-o' aria-hidden='true'></i>";
            var phoneFaHtml = "<i class='fa fa-phone' aria-hidden='true'></i>";
            if (userId != SessionService.getSessionUserId()) {
                return;
            }
            if (!("Notification" in window)) {
                alert("This browser does not support system notifications");
            }
            else if (Notification.permission === "granted") {
                var notification = new Notification("У вас нове завдання!", {
                    body: title
                });
            }
            else if (Notification.permission !== 'denied') {
                Notification.requestPermission(function (permission) {
                    if (permission === "granted") {
                        var notification = new Notification("У вас нове завдання!", {
                            body: title
                        });
                    }
                });
            }
        });
    }

    this.subscribeToOnlineStateChangedNotifications = function () {
        hub.on('onlineStateChanged', function (isOnline, nick) {
            var args = {
                isOnline: isOnline,
                nick: nick
            };
            $rootScope.$broadcast("onlineStateChanged", args);
        });
    }

    this.subscribeToTaskMangerNotifications = function () {
        taskManagerHub.on('taskManagerChanged', function (taskId) {
            var args = {
                taskId: taskId
            };
            $rootScope.$broadcast("taskManagerChanged", args);
        });
    }
        

    this.startHubConnection = function () {
        if (con) {
            con.start(function () {
            });
        }
    }

    this.stopHubConnection = function () {
        if (con) {
            con.stop(function () {
            });
        }
    }

    this.startTaskManagerHubConnection = function () {
        if (taskManagerConnection) {
            taskManagerConnection.start(function () {
            });
        }
    }

    this.stopTaskManagerHubConnection = function () {
        if (taskManagerConnection) {
            taskManagerConnection.stop(function () {
            });
        }
    }
});