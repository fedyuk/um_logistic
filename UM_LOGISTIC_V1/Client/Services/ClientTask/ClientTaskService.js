mainModule.service('ClientTaskService', function ($http) {
    this.createCallFeedback = function (request) {
        return $http.post('/api/tasks/call_feedback', request);
    }

    this.getClientTasks = function (page, count) {
        return $http.get('/api/tasks?page=' + page + '&count=' + count);
    }

    this.getClientTasksCount = function () {
        return $http.get('/api/tasks/count');
    }

    this.acceptTask = function (id) {
        var request = {
            Id: id
        };
        return $http.post('/api/tasks/accept', request);
    }
});