mainModule.controller('NotFilteredApplicationsController', function ($rootScope, $scope, $log, $location, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper, FilterService) {

    //variables 
    $scope.applications = [];
    $scope.currentPage = 0;
    $scope.currentCount = moduleConstants.pageRowsCount;
    $scope.isLoading = false;
    $scope.isPartLoading = false;
    $scope.pictures = [];
    $scope.currentApplicationType = true;
    $scope.applicationTypes = {
        model: null,
        availableOptions: [
          { id: true, name: 'Перевезення' },
          { id: false, name: 'Співробітництво' }
        ]
    };
    $scope.currentTypeCaption = "Перевезення";
    //variables

    //methods

    $scope.listApplications = (page, count) => {
        switch($scope.currentApplicationType)
        {
            case true:
                FilterService.getTransportationApplications("Filtered==false",
            $scope.currentPage, $scope.currentCount)
		.success(response => {
		    $scope.isLoading = false;
		    $scope.isPartLoading = false;
		    if (response && response.Success == true) {
		        for (let i = 0; i < response.Result.length; i++) {
		            $scope.applications.push({
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                title: FormHelper.getFormValue(response.Result[i].Name),
		                url: "/transportation/" + response.Result[i].Id,
		            });
		            $scope.getPicture(response.Result[i].Id, $scope.currentApplicationType);
		        }
		    }
		    else {
		        NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
		    }
		}).error(error => {
		    $scope.isLoading = false;
		    $scope.isPartLoading = false;
		    NotificationService.errorFromResponse(error);
		});
                break;
            case false:
                FilterService.getCooperationApplications("Filtered==false",
           $scope.currentPage, $scope.currentCount)
       .success(response => {
           $scope.isLoading = false;
           $scope.isPartLoading = false;
           if (response && response.Success == true) {
               for (let i = 0; i < response.Result.length; i++) {
                   $scope.applications.push({
                       id: FormHelper.getFormValue(response.Result[i].Id),
                       title: FormHelper.getFormValue(response.Result[i].Name),
                       url: "/cooperation/" + response.Result[i].Id,
                   });
                   $scope.getPicture(response.Result[i].Id, $scope.currentApplicationType);
               }
           }
           else {
               NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
           }
       }).error(error => {
           $scope.isLoading = false;
           $scope.isPartLoading = false;
           NotificationService.errorFromResponse(error);
       });
        }
    }

    $scope.loadMore = () => {
        $scope.isPartLoading = true;
        $scope.currentPage++;
        $scope.listApplications($scope.currentPage, $scope.currentCount);
    }

    $scope.initApplicationsList = () => {
        $scope.isLoading = true;
        $scope.listApplications($scope.currentPage, $scope.currentCount);
    }

    $scope.getPicture = (id, type) => {
        ApplicationPictureService.getApplicationPicture(id, type)
		.success(response => {
		    if (response && response.Success == true) {
		        $scope.pictures[id] = response.Result;
		    }
		    else {
		        $scope.pictures[id] = "";
		    }
		}).error(error => {
		    NotificationService.errorFromResponse(error);
		    $scope.pictures[id] = "";
		});
    }

    $scope.changeApplicationType = (type, caption) =>
    {
        $scope.currentPage = 0;
        $scope.currentTypeCaption = caption;
        $scope.applications = [];
        $scope.currentApplicationType = type;
        $scope.listApplications($scope.currentPage, $scope.currentCount);
    }

    $scope.acceptApplication = (id, type) => 
    {
        bootbox.confirm({
            message: moduleConstants.acceptTaskConfirmation,
            buttons: {
                confirm: {
                    label: 'Так',
                    className: 'btn-default btn-sm'
                },
                cancel: {
                    label: 'Ні',
                    className: 'btn-default btn-sm'
                }
            },
            callback: (ok) => {
                if (ok == true) {
                    FilterService.acceptApplication(type, id)
                    .success(response => {
                        if (response && response.Success == true) {
                            for (let i = 0; i < $scope.applications.length; i++)
                                if ($scope.applications[i].id === id) {
                                    $scope.applications.splice(i, 1);
                                    break;
                                }
                            $scope.isLoading = false;
                        }
                        else {
                            $scope.isLoading = false;
                            NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
                        }
                    }).error(error => {
                        $scope.isLoading = false;
                        NotificationService.errorFromResponse(error);
                    });
                }
            }
        });
    }

    $scope.declineApplication = (id, type) => {
        bootbox.confirm({
            message: moduleConstants.deleteApplicationConfirmation,
            buttons: {
                confirm: {
                    label: 'Так',
                    className: 'btn-default btn-sm'
                },
                cancel: {
                    label: 'Ні',
                    className: 'btn-default btn-sm'
                }
            },
            callback: (ok) => {
                if (ok == true) {
                    FilterService.declineApplication(type, id)
                    .success(response => {
                        if (response && response.Success == true) {
                            NotificationService.success(moduleConstants.deletingInfoSuccess);
                            for (let i = 0; i < $scope.applications.length; i++)
                                if ($scope.applications[i].id === id) {
                                    $scope.applications.splice(i, 1);
                                    break;
                                }
                            $scope.isLoading = false;
                        }
                        else {
                            $scope.isLoading = false;
                            NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
                        }
                    }).error(error => {
                        $scope.isLoading = false;
                        NotificationService.errorFromResponse(error);
                    });
                }
            }
        });
    }
    //methods

    //init controller
    $scope.initApplicationsList();

    //init controller
});