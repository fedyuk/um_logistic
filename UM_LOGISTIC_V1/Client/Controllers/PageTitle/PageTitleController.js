mainModule.controller('PageTitleController', function ($rootScope, $scope, moduleConstants) {
    $scope.title = moduleConstants.defaultPageTitle;

    $scope.setTitle = function (title) {
        $scope.title = title;
    }

    $scope.$on("pageTitleChanged", function (event, newTitle) {
        $scope.setTitle(newTitle);
    });
});