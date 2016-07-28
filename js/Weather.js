angular.module("WardrobeApp")
  .factory("WeatherFactory", ["$http", weatherFactory])
  .controller("WeatherController", ["WeatherFactory", weatherControl])


function weatherFactory($http) {

  var urlStart = "http://api.openweathermap.org/data/2.5/weather?q="
  var urlCity = ""
  var urlEnd = "&appid=849373e80b743903d15c0b9db9736cdb"

  return {
    getWeather: function(){
      return $http.get("http://api.openweathermap.org/data/2.5/weather?q=Boulder&appid=849373e80b743903d15c0b9db9736cdb")
    }
  }

}



function weatherControl(WeatherFactory) {
  var wc = this

  WeatherFactory.getWeather().then(function(response){
    wc.weatherData = response.data

    // wc.currentCity = wc.weatherData.name
    // wc.currentTemp = (wc.weatherData.main.temp * 9/5 - 459.67).toFixed(0)
    // wc.tempHigh = (wc.weatherData.main.temp_max * 9/5 - 459.67).toFixed(0)
    // wc.tempLow = (wc.weatherData.main.temp_min * 9/5 - 459.67).toFixed(0)

  })

  wc.currentCity = "Boulder"
  wc.currentTemp = 90
  wc.tempHigh = 95
  wc.tempLow = 84

}
