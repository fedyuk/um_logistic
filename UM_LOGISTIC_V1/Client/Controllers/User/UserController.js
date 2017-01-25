mainModule.controller('UserController', function ($scope, UserService) {
    UserService.getUser("username", "token", "1").success(function (user) {
        $scope.user = user;
    }).error(function (error) {
        $scope.error = error;
    });
});