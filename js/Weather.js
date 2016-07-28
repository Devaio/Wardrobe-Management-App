angular.module("WardrobeApp")
  .factory("WeatherFactory", ["$http", weatherFactory])
  .controller("WeatherController", ["WeatherFactory", weatherControl])


function weatherFactory($http) {
  console.log("WeatherFactory loaded!");

  var urlStart = "http://api.openweathermap.org/data/2.5/weather?q="
  var urlCity = ""
  var urlEnd = "&appid=849373e80b743903d15c0b9db9736cdb"

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dev"]
  var tempHigh
  var tempLow

  return {
    getWeather: function(){
      return $http.get("http://api.openweathermap.org/data/2.5/weather?q=Boulder&appid=849373e80b743903d15c0b9db9736cdb")
    },

    days: days,
    months: months,
    tempHigh: tempHigh,
    tempLow: tempLow

  }

}



function weatherControl(WeatherFactory) {
  var wc = this
  console.log("WeatherController loaded")


  WeatherFactory.getWeather().then(function(response){
    wc.weatherData = response.data
    console.log(response.data);

    WeatherFactory.currentCity = wc.currentCity = wc.weatherData.name
    WeatherFactory.currentTemp = wc.currentTemp = (wc.weatherData.main.temp * 9/5 - 459.67).toFixed(0)
    WeatherFactory.tempHigh = wc.tempHigh = (wc.weatherData.main.temp_max * 9/5 - 459.67).toFixed(0)
    WeatherFactory.tempLow = wc.tempLow = (wc.weatherData.main.temp_min * 9/5 - 459.67).toFixed(0)

    if (parseInt(dash.WeatherFactory.tempHigh) >= 80) {
  		WeatherFactory.todayTemp = "hot"
  	}
  	if (parseInt(dash.WeatherFactory.tempLow) <= 50) {
  		WeatherFactory.todayTemp = "cold"
  	}

  })

  wc.today = new Date()
  wc.currentDay = WeatherFactory.days[wc.today.getDay()]
  wc.currentMonth = WeatherFactory.months[wc.today.getMonth()]
  wc.currentYear = wc.today.getFullYear()
  wc.currentDate = wc.today.getDate()


  // Dummy Data
  // wc.currentCity = "Boulder"
  // wc.currentTemp = 90
  // wc.tempHigh = 95
  // wc.tempLow = 84

}
