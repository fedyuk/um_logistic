mainModule.service('NotificationService', function () {
    this.success = function (message) {
        if (message) {
            $.notify(message, "success");
        }
	}
	
    this.info = function (message) {
        if (message) {
            $.notify(message, "info");
        }
	}
	
    this.warning = function (message) {
        if (message) {
            $.notify(message, "warn");
        }
	}
	
    this.error = function (message) {
        if (message) {
            $.notify(message, "error");
        }
	}
});