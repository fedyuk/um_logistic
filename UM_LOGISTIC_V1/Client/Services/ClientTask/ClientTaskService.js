mainModule.service('ClientTaskService', function ($http) {
    this.createCallFeedback = function (request) {
        return $http.post('/api/tasks/call_feedback', request);
    }
});