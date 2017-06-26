mainModule.controller('TransportationController', function ($rootScope, $scope, $log, $location, TransportationService, SessionService, moduleConstants, NotificationService, ApplicationPictureService, ClientTaskService, FormHelper, FilterService, ApplicationTrashService) {

    //variables 
    $scope.transportations = [];
    $scope.currentPage = 0;
    $scope.currentCount = moduleConstants.pageRowsCount;
    $scope.isLoading = false;
    $scope.isPartLoading = false;
    $scope.filterLoading = false;
    $scope.pictures = {};

    $scope.filter = {
        ShipmentLength: {
            value : null,
            isClear : true
        },
        ShipmentWidth: {
            value: null,
            isClear: true
        },
        ShipmentHeight: {
            value: null,
            isClear: true
        },
        ShipmentCapacity: {
            value: null,
            isClear: true
        },
        ShipmentWeight: {
            value: null,
            isClear: true
        },
    };
    //variables

    //methods

    $scope.listTransportations = (page, count) => {
        TransportationService.getTransportations(SessionService.getSessionUser(), SessionService.getSessionToken(),
            $scope.currentPage, $scope.currentCount)
		.success(response => {
		    $scope.isLoading = false;
		    $scope.isPartLoading = false;
		    if (response && response.Success == true) {
		        for (let i = 0; i < response.Result.length; i++) {
		            $scope.transportations.push({
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                title: FormHelper.getFormValue(response.Result[i].Name),
		                contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
		                sendAddress: FormHelper.getFormValue(response.Result[i].SendAddress),
		                deliveryAddress: FormHelper.getFormValue(response.Result[i].DeliveryAddress),
		                createdOn: new Date(response.Result[i].CreatedOn).toLocaleString()
		            });
		            $scope.getPicture(response.Result[i].Id);
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

    $scope.listFilteredTransportations = (filter, page, count) => {
        FilterService.getTransportationApplications(filter, page, count)
		.success(response => {
		    $scope.isPartLoading = false;
		    $scope.isLoading = false;
		    $scope.filterLoading = false;
		    if (response && response.Success == true) {
		        if (page == 0) {
		            $scope.transportations = [];
		        }
		        for (let i = 0; i < response.Result.length; i++) {
		            $scope.transportations.push({
		                id: FormHelper.getFormValue(response.Result[i].Id),
		                title: FormHelper.getFormValue(response.Result[i].Name),
		                contactPhone: FormHelper.getFormValue(response.Result[i].ContactPhone),
		                sendAddress: FormHelper.getFormValue(response.Result[i].SendAddress),
		                deliveryAddress: FormHelper.getFormValue(response.Result[i].DeliveryAddress),
		                createdOn: new Date(response.Result[i].CreatedOn).toLocaleString()
		            });
		            $scope.getPicture(response.Result[i].Id);
		        }
		    }
		    else {
		        NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
		    }
		}).error(error => {
		    $scope.isPartLoading = false;
		    $scope.isLoading = false;
		    NotificationService.errorFromResponse(error);
		});
    }

    $scope.loadMore = () => {
        $scope.currentPage++;
        $scope.isPartLoading = true;
        $scope.listTransportations($scope.currentPage, $scope.currentCount);
    }

    $scope.initTransportationsList = () => {
		$scope.isLoading = true;
        $scope.listTransportations($scope.currentPage, $scope.currentCount);
    }

    $scope.getPicture = (id) => {
        let type = true;
        ApplicationPictureService.getApplicationPictures(id, type)
		.success(response => {
		    if (response && response.Success == true && response.Result && response.Result.length > 0) {
		        $scope.pictures[id] = response.Result[0];
		    }
		    else {
		        $scope.pictures[id] = "";
		    }
		}).error(error => {
		    NotificationService.errorFromResponse(error);
		    $scope.pictures[id] = "";
		});
    }

    $scope.acceptApplication = (id) => {
        let request = {};
        let userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        request.UserId = userId;
        request.ApplicationId = id;
        request.TypeId = 2;
        ClientTaskService.createApplicationTask(request)
        .success(response => {
            if (response && response.Success == true) {
                NotificationService.success(moduleConstants.callFeedbackAccepted);
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

    $scope.applyFilter = () => {
        $scope.getValuesFromSliders();
        let filter = $scope.filter;
        let stringFilter = $scope.generateFilterString(filter);
        $scope.currentPage = 0;
        $scope.filterLoading = true;
        $scope.listFilteredTransportations(stringFilter, $scope.currentPage, $scope.currentCount);
    }

    $scope.generateFilterString = (filter) => {
        let stringFilter = "";
        let values = null;
        for (let name in filter) {
            if (filter[name] != null && filter[name].isClear == false) {
                values = filter[name].value.split(',');
                if (values.length == 2) {
                    stringFilter += name + ">=" + values[0] + ";";
                    stringFilter += name + "<=" + values[1] + ";";
                }
                if (values.length == 1) {
                    stringFilter += name + "==" + values[0] + ";";
                }
            }
        }
        stringFilter += "Filtered==true;";
        return stringFilter;
    }

    $scope.initFilterView = () => {
        $scope.ShipmentLengthSlider = $("#filter-shipment-length").slider({
            id: "filter-shipment-length",
            min: moduleConstants.sliderMinRangeValue,
            max: moduleConstants.sliderMaxRangeValue,
            range: true,
            value: [moduleConstants.sliderMinRangeValue, moduleConstants.sliderMaxRangeValue]
        });
        $scope.ShipmentLengthSlider.on('slideStop', {
            value: $scope.filter.ShipmentLength
        }, (event) => {
            event.data.value.isClear = false;
        });
        $scope.ShipmentWidthSlider = $("#filter-shipment-width").slider({
            id: "filter-shipment-width",
            min: moduleConstants.sliderMinRangeValue,
            max: moduleConstants.sliderMaxRangeValue,
            range: true,
            value: [moduleConstants.sliderMinRangeValue, moduleConstants.sliderMaxRangeValue]
        });
        $scope.ShipmentWidthSlider.on('slideStop', {
            value: $scope.filter.ShipmentWidth
        }, (event) => {
            event.data.value.isClear = false;
        });
        $scope.ShipmentHeightSlider = $("#filter-shipment-height").slider({
            id: "filter-shipment-height",
            min: moduleConstants.sliderMinRangeValue,
            max: moduleConstants.sliderMaxRangeValue,
            range: true,
            value: [moduleConstants.sliderMinRangeValue, moduleConstants.sliderMaxRangeValue]
        });
        $scope.ShipmentHeightSlider.on('slideStop', {
            value: $scope.filter.ShipmentHeight
        }, (event) => {
            event.data.value.isClear = false;
        });
        $scope.ShipmentCapacitySlider = $("#filter-shipment-capacity").slider({
            id: "filter-shipment-capacity",
            min: moduleConstants.sliderMinRangeValue,
            max: moduleConstants.sliderMaxRangeValue,
            range: true,
            value: [moduleConstants.sliderMinRangeValue, moduleConstants.sliderMaxRangeValue]
        });
        $scope.ShipmentCapacitySlider.on('slideStop', {
            value: $scope.filter.ShipmentCapacity
        }, (event) => {
            event.data.value.isClear = false;
        });
        $scope.ShipmentWeightSlider = $("#filter-shipment-weight").slider({
            id: "filter-shipment-weight",
            min: moduleConstants.sliderMinRangeValue,
            max: moduleConstants.sliderMaxRangeValue,
            range: true,
            value: [moduleConstants.sliderMinRangeValue, moduleConstants.sliderMaxRangeValue]
        });
        $scope.ShipmentWeightSlider.on('slideStop', {
            value: $scope.filter.ShipmentWeight
        }, (event) => {
            event.data.value.isClear = false;
        });
    }

    $scope.getValuesFromSliders = () => {
        $scope.filter.ShipmentLength.value = $scope.ShipmentLengthSlider[0].value;
        $scope.filter.ShipmentWidth.value = $scope.ShipmentWidthSlider[0].value;
        $scope.filter.ShipmentHeight.value = $scope.ShipmentHeightSlider[0].value;
        $scope.filter.ShipmentCapacity.value = $scope.ShipmentCapacitySlider[0].value;
        $scope.filter.ShipmentWeight.value = $scope.ShipmentWeightSlider[0].value;
    }

    $scope.dropFilter = (filter, name) => {
        if (filter[name]) {
            filter[name].isClear = true;
            $scope[name + "Slider"].slider('setValue', [moduleConstants.sliderMinRangeValue, moduleConstants.sliderMaxRangeValue]);
        }
    }

    $scope.moveIntoTrash = (id, title) => {
        let userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        let request = {
            ApplicationId: id,
            Type: true,
            UserId: userId
        };
        ApplicationTrashService.createApplicationTrash(request).success(response => {
            if (response && response.Success == false) {
                NotificationService.error(response.Error != null ? JSON.stringify(response.Error) : moduleConstants.internalErrorCaption);
            }
            if (response && response.Success == true) {
                let isTrashAdded = SessionService.addTrashElement(id, true, title);
                if (isTrashAdded == true) {
                    $rootScope.$broadcast("trashElementAdded", null);
                }
            }
        }).error(error => {
            NotificationService.errorFromResponse(error);
        });

    }

    $scope.isExistElementInTrash = (id, type) => {
        return SessionService.isExistsTrashElement(id, type);
    }

    $scope.removeFromTrash = (id) => {
        let userId = SessionService.getSessionUserId();
        if (!userId) {
            NotificationService.warning(moduleConstants.sessionUserIdNotFound);
            $scope.isLoading = false;
            $scope.isPartLoading = false;
            return;
        }
        ApplicationTrashService.removeTrashElement(id, true)
        .success(response => {
            if (response && response.Success == true) {
                $scope.isLoading = false;
                SessionService.removeShopTrashElement(id, true);
                $rootScope.$broadcast("trashElementRemoved", null);
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

    //methods

    //init controller
    $scope.initTransportationsList();

    //init controller
    $scope.initFilterView();

});