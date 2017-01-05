var app = angular.module("app", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "Index.cshtml"
    })
    .when("/test", {
        template: "<h1>Test</h1>"
    })
    .when("/Events/Talks", {
        templateUrl: "/Views/test.html"
    })
    .when("/blue", {
        templateUrl: "Index.cshtml"
    });
});