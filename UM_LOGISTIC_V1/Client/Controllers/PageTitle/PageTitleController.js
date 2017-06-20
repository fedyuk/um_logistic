mainModule.controller('PageTitleController', function ($rootScope, $scope, moduleConstants) {
    $scope.title = moduleConstants.defaultPageTitle;

    $scope.setTitle = (title) => {
        $scope.title = title;
    }

    $scope.$on("pageTitleChanged", (event, newTitle) => {
        $scope.setTitle(newTitle);
    });
});