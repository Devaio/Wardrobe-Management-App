angular.module("WardrobeApp", ["ngRoute"])

angular.module("WardrobeApp")
  .config(function($routeProvider) {
    $routeProvider.when("/", {
      templateUrl: "views/main.html"
    })
    $routeProvider.when("/about", {
      templateUrl: "views/about.html"
    })
    $routeProvider.when("/profile", {
      templateUrl: "views/profile"
    })
    $routeProvider.otherwise({
      redirectTo: "/main.html"
    })
  })


angular.module("WardrobeApp")
  .controller("NavigationController", ["$scope", "$location", navControl])

    function navControl($scope, $location) {
      var nav = this
      console.log("navControl loaded")
      $scope.$on("$routeChangeSuccess", function() {
        nav.locationPath = $location.path()
        console.log("locationPath: " + nav.locationPath)
      })
    }
