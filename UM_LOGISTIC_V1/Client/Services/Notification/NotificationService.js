mainModule.service('NotificationService', function () {
    this.success = function(message) {
		$.notify(message, "success");
	}
	
	this.info = function(message) {
		$.notify(message, "info");
	}
	
	this.warning = function(message) {
		$.notify(message, "warn");
	}
	
	this.error = function(message) {
		$.notify(message, "error");
	}
});