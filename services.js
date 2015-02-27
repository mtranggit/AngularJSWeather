// Service component
angular.module('weatherApp').service('cityService', function () {
    this.city = "Sydney, NSW";
});

angular.module('weatherApp').service('weatherService',['$resource', function ($resource) {
    
    this.GetWeather = function (city, days) {
        
        var weatherAPI = $resource(
                                "http://api.openweathermap.org/data/2.5/forecast/daily", 
                                {callback: "JSON_CALLBACK"},
                                { get: {method: "JSONP"}});

        return weatherAPI.get({ q: city, cnt: days });
    }
}]);