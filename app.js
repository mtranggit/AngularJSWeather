var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);




// Custom Directive
weatherApp.directive('forecastReport', function() {
    
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
           




