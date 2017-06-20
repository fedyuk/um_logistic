mainModule.controller('MyApplicationsController', function ($rootScope, $scope, $log, $location, SessionService, moduleConstants, NotificationService, ApplicationPictureService, FormHelper, FilterService) {

    //variables 
    $scope.t_applications = [];
    $scope.c_applications = [];
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
    $scope.isOrderedByMe = false;
    //variables

    //methods

    $scope.listApplications = (page, count, isClear) => {
        let invoke = null;
        let userId = SessionService.getSessionUserId();
        if(!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        switch ($scope.currentApplicationType) {
            case true:
                invoke = $scope.isOrderedByMe == false ? FilterService.getTransportationApplications("CreatedBy==" + userId,
            $scope.currentPage, $scope.currentCount) : FilterService.getOrderedByMeApplications(true, userId, $scope.currentPage, $scope.currentCount);
                invoke.success(response => {
                    $scope.isLoading = false;
                    $scope.isPartLoading = false;
		    if (response.Success) {
		        if (isClear == true) {
		            $scope.t_applications = [];
		        }
		        for (let i = 0; i < response.Result.length; i++) {
		            $scope.t_applications.push({
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                name: FormHelper.getFormValue(response.Result[i].Name),
		                contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
		                sendAddress: FormHelper.getFormValue(response.Result[i].SendAddress),
		                deliveryAddress: FormHelper.getFormValue(response.Result[i].DeliveryAddress),
		                completeDate: response.Result[i].completeDate ? new Date(response.Result[i].completeDate).toLocaleString() : moduleConstants.emptyTextValue,
		                shipmentType: FormHelper.getFormValue(response.Result[i].ShipmentType),
		                shipmentLength: FormHelper.getFormValue(response.Result[i].ShipmentLength),
		                shipmentWidth: FormHelper.getFormValue(response.Result[i].ShipmentWidth),
		                shipmentHeight: FormHelper.getFormValue(response.Result[i].ShipmentHeight),
		                shipmentCapacity: FormHelper.getFormValue(response.Result[i].ShipmentCapacity),
		                shipmentWeight: FormHelper.getFormValue(response.Result[i].ShipmentWeight),
		                obj: response.Result[i]
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
                invoke = $scope.isOrderedByMe == false ? FilterService.getCooperationApplications("CreatedBy==" + userId,
                $scope.currentPage, $scope.currentCount) : FilterService.getOrderedByMeApplications(false, userId, $scope.currentPage, $scope.currentCount);
       invoke.success(response => {
           $scope.isLoading = false;
           $scope.isPartLoading = false;
           if (response.Success) {
               if (isClear == true) {
                   $scope.c_applications = [];
               }
               for (let i = 0; i < response.Result.length; i++) {
                   $scope.c_applications.push({
                       id: FormHelper.getFormValue(response.Result[i].Id),
                       fullName: FormHelper.getFormValue(response.Result[i].FullName),
                       residenceAddress: FormHelper.getFormValue(response.Result[i].ResidenceAddress),
                       parkingPlace: FormHelper.getFormValue(response.Result[i].ParkingPlace),
                       contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
                       isPhysicalPerson: FormHelper.getBooleanText(response.Result[i].IsPhysicalPerson),
                       isBussinessPerson: FormHelper.getBooleanText(response.Result[i].IsBussinessPerson),
                       carModel: FormHelper.getFormValue(response.Result[i].CarModel),
                       transportWidth: FormHelper.getFormValue(response.Result[i].TransportWidth),
                       transportHeight: FormHelper.getFormValue(response.Result[i].TransportHeight),
                       transportWeight: FormHelper.getFormValue(response.Result[i].TransportWeight),
                       transportCapacity: FormHelper.getFormValue(response.Result[i].TransportCapacity),
                       transportArrow: FormHelper.getFormValue(response.Result[i].TransportArrow),
                       obj: response.Result[i]
                   });
                   //$scope.getPicture(response.Result[i].Id, $scope.currentApplicationType);
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
		    if (response.Success) {
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

    $scope.changeApplicationType = (type, caption) => {
        $scope.currentPage = 0;
        $scope.currentTypeCaption = caption;
        $scope.t_applications = [];
        $scope.c_applications = [];
        $scope.currentApplicationType = type;
        $scope.listApplications($scope.currentPage, $scope.currentCount, true);
    }

    $scope.onChangeMyOrderedFilter = () => {
        $scope.listApplications($scope.currentPage, $scope.currentCount, true);
    }

    $scope.refreshApplicationDate = (type, id) => {
        bootbox.confirm({
            message: moduleConstants.updateDateApplicationConfirm,
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
                    $scope.isLoading = true;
                    FilterService.upToDateApplication(type, id)
                    .success(response => {
                        $scope.isLoading = false;
                        if (response.Success == true) {
                            NotificationService.success(moduleConstants.applicationDateUpdatedSuccess);
                        }
                        if (response.Success == false) {
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

    $scope.removeApplication = (type, id) => {
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
                    $scope.isLoading = true;
                    FilterService.removeApplication(type, id)
                    .success(response => {
                        $scope.isLoading = false;
                        if (response.Success == true) {
                            if (type == true) {
                                for (let i = 0; i < $scope.t_applications.length; i++)
                                    if ($scope.t_applications[i].id === id) {
                                        $scope.t_applications.splice(i, 1);
                                        break;
                                    }
                            }
                            if (type == false) {
                                for (let i = 0; i < $scope.c_applications.length; i++)
                                    if ($scope.c_applications[i].id === id) {
                                        $scope.c_applications.splice(i, 1);
                                        break;
                                    }
                            }
                            NotificationService.success(moduleConstants.deletingInfoSuccess);
                        }
                        if (response.Success == false) {
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
    $scope.editApplication = (type, application) =>{
        let message = "";
        for (let property in application) {
            if (typeof application[property] != "object") {
                message += "<p contenteditable>" + FormHelper.getFormValue(application[property]) + "</p>";
            }
        }
        let dialog = bootbox.dialog({
            title: moduleConstants.editApplicationCaption,
            message: message
        });
    }



    //methods

    //init controller
    $scope.initApplicationsList();

    //init controller
});