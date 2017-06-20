mainModule.directive('ngConfirmClick', [
         () => {
            return {
                link: (scope, element, attr) => {
                    var msg = attr.ngConfirmClick || "Ви впевнені?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click', (event) => {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }])