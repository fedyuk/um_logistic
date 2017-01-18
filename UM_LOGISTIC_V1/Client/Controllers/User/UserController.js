mainModule.controller('UserController', function ($scope, UserService) {
    UserService.getUser("Supervisor", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiU3VwZXJ2aXNvciIsImlhdCI6IjE0ODQ3NzAwMzEiLCJleHAiOiIxNDg0ODA2MDMxIiwicm9sZSI6IjAifQ.dLTtV0RzWyCPbXvN2dVFXF9FhYyDpRiVF3vcBvd6zaw", "1").success(function (user) {
        $scope.user = user;
    }).error(function (error) {
        $scope.error = error;
    });
});