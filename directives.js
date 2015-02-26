// Custom Directive
angular.module('weatherApp').directive('forecastReport', function() {
    
    // return the directive definition
    return {
        templateUrl: 'directives/forecastReport.htm',
        restrict: 'EA',
        replace: true,
        scope: {
            convertToDate: '&',
            convertToCelcius: '&',
            dateFormat: '@',
            weatherDay: '='
        }
    }
    
});
        