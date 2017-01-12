/*(function (app) {*/
    app.controller('TemplateController', function ($scope, TemplateService) {
        $scope.message = TemplateService.printHelloWorld();
    });
/*}(angular.module("template", ["ngRoute"])));*/