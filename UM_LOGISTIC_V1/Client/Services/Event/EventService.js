mainModule.service("EventService", function (SessionService) {
    var con = undefined;
    var hub = undefined;
    this.initializeEventsHub = function () {
        con = $.hubConnection();
        hub = con.createHubProxy("eventsHub");
    }

    this.getEventsHub = function () {
        return hub;
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

    this.startHubConnection = function () {
        con.start(function () {
        });
    }
});