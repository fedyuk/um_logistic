mainModule.service('NotificationService', function () {
    this.success = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                type: 'success'
            });
        }
	}
	
    this.info = function (message) {
        if (message) {
            $.notify({
                message: message
            });
        }
	}
	
    this.warning = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                type: 'warning'
            });
        }
	}
	
    this.error = function (message) {
        if (message) {
            $.notify({
                message: message
            }, {
                type: 'danger'
            });
        }
	}
});