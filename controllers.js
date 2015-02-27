// Controllers
angular.module('weatherApp').controller('homeController', ['$scope', '$location', 'cityService', function ($scope, $location, cityService) {
    
    this.city = cityService.city;

    $scope.$watch(angular.bind(this, function () {
        return this.city;
    }), function (newVal, oldVal) {
        cityService.city = newVal;
    });
    
    this.submit = function() {
        $location.path("/forecast");   
    };
    
}]);

angular.module('weatherApp').controller('forecastController',['$scope','$resource','$routeParams','cityService', 'weatherService', function ($scope, $resource, $routeParams, cityService, weatherService) {
    this.city = cityService.city;
    
    this.days = $routeParams.days || '5'; //default to 5 days.
    
    this.weatherResult = weatherService.GetWeather(this.city, this.days);
    
//    this.weatherAPI = $resource(
//        "http://api.openweathermap.org/data/2.5/forecast/daily", 
//        {callback: "JSON_CALLBACK"},
//        { get: {method: "JSONP"}});
//    
//    this.weatherResult = this.weatherAPI.get({ q: this.city, cnt: this.days });
    
    this.convertToFahrenheit = function(degK) {
        return Math.round( 1.8 * (degK - 273.15) + 32);
    };
    
    this.convertToCelcius = function(degK) {
        return Math.round(degK - 273.15);
    };
    
    this.convertToDate = function(dtms) {
      return new Date(dtms * 1000);
    };
    
}]);
