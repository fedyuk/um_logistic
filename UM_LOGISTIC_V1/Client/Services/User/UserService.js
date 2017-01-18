mainModule.service('UserService', function ($http) {
    this.getUser = function (user, token, id) {
        return $http.get('/api/user?id=' + id + '&token=' + token + '&user=' + user);
    }
});