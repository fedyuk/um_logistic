﻿mainModule.service('FilterService', function ($http) {
    this.getTransportationApplications = function (filter, page, count) {
        return $http.get('/api/t_applications?filter=' + filter + '&page=' + page + '&count=' + count);
    }
    this.getCooperationApplications = function (filter, page, count) {
        return $http.get('/api/c_applications?filter=' + filter + '&page=' + page + '&count=' + count);
    }

    this.getOrderedByMeApplications = function (type, userId) {
        return $http.get('/api/my_orderd_applications?type=' + type + '&userId=' + userId);
    }

    this.acceptApplication = function (type, id) {
        var request = {
            Id: id,
            Type: type
        };
        return $http.post('/api/application/accept', request);
    }

    this.declineApplication = function (type, id) {
        var request = {
            Id: id,
            Type: type
        };
        return $http.post('/api/application/decline', request);
    }

    this.getNotFilteredApplicationsCount = function () {
        return $http.get('/api/application/count');
    }
});