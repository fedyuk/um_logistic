﻿mainModule.controller('UserController', function ($scope, $log, AccountService, SessionService, moduleConstants, NotificationService, FormHelper) {
	
    //variables
    $scope.users = [];
    $scope.isLoading = false;
    $scope.currentPage = 0;
    $scope.currentCount = 5;
    //variables
	//methods
	
	$scope.listUsers = function(page, count) {
		var user = SessionService.getSessionUser();
		var token = SessionService.getSessionToken();
	    AccountService.getAccounts(user, token, page, count).success(function (response) {
	        $scope.isLoading = false;
	        if (response.Success) {
	            for (var i = 0; i < response.Result.length; i++) {
	                $scope.users.push({
	                    id: FormHelper.getFormValue(response.Result[i].Id),
	                    login: FormHelper.getFormValue(response.Result[i].UserName),
	                    fullName: FormHelper.getFormValue(response.Result[i].Account.FullName),
	                    homePhone: FormHelper.getFormValue(response.Result[i].Account.HomePhone),
	                    workPhone: FormHelper.getFormValue(response.Result[i].Account.WorkPhone),
	                    country: FormHelper.getFormValue(response.Result[i].Account.Country),
	                    region: FormHelper.getFormValue(response.Result[i].Account.Region),
	                    city: FormHelper.getFormValue(response.Result[i].Account.City),
	                    street: FormHelper.getFormValue(response.Result[i].Account.Street),
	                    createdOn: new Date(response.Result[i].CreatedOn).toLocaleString(),
	                    role: FormHelper.getFormValue(response.Result[i].Role.Name),
                        modifiedOn: new Date(response.Result[i].ModifiedOn).toLocaleString()
	                });
	            }
	        } else {
	            NotificationService.error(JSON.stringify(response.Error));
	        }
		}).error(function (error) {
		    $scope.isLoading = false;
		    NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
		});
	}

	$scope.loadMore = function () {
	    $scope.currentPage++;
	    $scope.listUsers($scope.currentPage, $scope.currentCount);
	}

	$scope.initUsersList = function () {
	    $scope.isLoading = true;
	    $scope.listUsers($scope.currentPage, $scope.currentCount);
	}

	$scope.deleteUser = function (id) {
	    $scope.isLoading = true;
	    var user = SessionService.getSessionUser();
	    var token = SessionService.getSessionToken();
	    AccountService.removeAccount(user, token, id).success(function (response) {
	        $scope.isLoading = false;
	        if (response.Success == false) {
	            NotificationService.error(JSON.stringify(response.Error));
	        } else {
	            for (var i = 0; i < $scope.users.length; i++)
	                if ($scope.users[i].id === id) {
	                    $scope.users.splice(i, 1);
	                    break;
	                }
	        }
	    }).error(function (error) {
	        $scope.isLoading = false;
	        NotificationService.error(JSON.stringify(error && error.ExceptionMessage));
	    });
	}
    //methods

	$scope.initUsersList();
});