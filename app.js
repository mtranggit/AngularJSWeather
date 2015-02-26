var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);

weatherApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.htm',
            controller: 'homeController',
            controllerAs: 'home'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController',
            controllerAs: 'forecast'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.htm',
            controller: 'forecastController',
            controllerAs: 'forecast'
        });
}]);


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

weatherApp.service('cityService', function() {
    this.city = "Sydney, NSW";
});
           
weatherApp.controller('homeController', ['$scope','cityService', function ($scope, cityService) {
    
    this.city = cityService.city;
//    $scope.city = cityService.city;
    
//    $scope.$watch('city', function () {
//        cityService.city = $scope.city;
//    });
    $scope.$watch(angular.bind(this, function () {
        return this.city;
    }), function (newVal, oldVal) {
        cityService.city = newVal;
    });
}]);


weatherApp.controller('forecastController',['$scope','$resource','$routeParams','cityService', function ($scope, $resource, $routeParams, cityService) {
    this.city = cityService.city;
    
    this.days = $routeParams.days || '5'; //default to 5 days.
    
    this.weatherAPI = $resource(
        "http://api.openweathermap.org/data/2.5/forecast/daily", 
        {callback: "JSON_CALLBACK"},
        { get: {method: "JSONP"}});
    
    this.weatherResult = this.weatherAPI.get({ q: this.city, cnt: this.days});
    
    this.convertToFahrenheit = function(degK) {
        return Math.round( 1.8 * (degK - 273.15) + 32);
    };
    
    this.convertToCelcius = function(degK) {
        return Math.round( degK - 273.15);
    };
    
    this.convertToDate = function(dtms) {
      return new Date(dtms * 1000);
    };
    
}]);


weatherApp.controller('testController',['$scope', function($scope) {
    
//    var rulesrequest = new XMLHttpRequest();
//    rulesrequest.onreadystatechange = function () {
//        
//        $scope.$apply(function () {
//            if (rulesrequest.readyState == 4 && rulesrequest.status == 200) {
//                $scope.rules = JSON.parse(rulesrequest.responseText);
//            }
//        });
//    }
//    
//    rulesrequest.open("GET", "http://localhost:8080/api", true);
//    rulesrequest.send();

}]);


