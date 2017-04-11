mainModule.service('FormHelper', function (moduleConstants) {
    this.getFormValue = function (value) {
        if(!value || value == null || value == '' || value == 0)
        {
            value = moduleConstants.emptyFormValue;
        }
        return value;
    }
});