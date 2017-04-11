mainModule.service('FilterService', function ($http) {
    this.getTransportationApplications = function (filter, page, count) {
        return $http.get('/api/t_applications?filter=' + filter + '&page=' + page + '&count=' + count);
    }
    this.getCooperationApplications = function (filter, page, count) {
        return $http.get('/api/c_applications?filter=' + filter + '&page=' + page + '&count=' + count);
    }
});