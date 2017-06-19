mainModule.service('NotificationService', function (moduleConstants) {
    this.success = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                type: 'success',
                delay: moduleConstants.notifyWindowDelay
            });
        }
	}
	
    this.info = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                delay: moduleConstants.notifyWindowDelay
            });
        }
	}
	
    this.warning = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                type: 'warning',
                delay: moduleConstants.notifyWindowDelay
            });
        }
	}
	
    this.error = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                type: 'danger',
                delay: moduleConstants.notifyWindowDelay
            });
        }
    }
    this.errorFromResponse = function (error) {
        if (!error) {
            NotificationService.error(moduleConstants.internalErrorCaption);
            return;
        }
        var out = error.ExceptionMessage || error.Message || null;
        var message = out ? JSON.stringify(out) : moduleConstants.internalErrorCaption;
        $.notify({
            message: message
        }, {
            type: 'danger',
            delay: moduleConstants.notifyWindowDelay
        });
    }
});