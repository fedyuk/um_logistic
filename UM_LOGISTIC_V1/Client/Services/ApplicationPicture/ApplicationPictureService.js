mainModule.service('ApplicationPictureService', function ($http) {
    this.getApplicationPicture = function (applicationId, type) {
        return $http.get('/api/picture?applicationId=' + applicationId + '&type=' + type);
    }

    this.getApplicationPictures = function (applicationId, type) {
        return $http.get('/api/pictures?applicationId=' + applicationId + '&type=' + type);
    }
	
	this.createApplicationPicture = function (applicationPicture) {
		return $http.post("/api/picture/load/", applicationPicture);
	}
	
	this.updateApplicationPicture = function (applicationPicture) {
		return $http.post("/api/picture/update/", applicationPicture);
	}
	
	this.removeApplicationPicture = function (applicationId, type) {
		return $http.get('/api/picture/delete?applicationId=' + applicationId + '&type=' + type);
	}
});