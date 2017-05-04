﻿mainModule.service('ApplicationTrashService', function ($http) {
	this.createApplicationTrash = function (request) {
	    return $http.post("/api/trash/add/", request);
	}

	this.getApplicationTrashCountByCreatedBy = function (id) {
	    if (!id) {
	        id = 0;
	    }
	    return $http.get("/api/trash/count?id=" + id);
	}
	
});