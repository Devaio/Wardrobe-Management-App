angular.module("WardrobeApp")
	.controller("DashboardController", ["GarmentFactory", dashControl])

function dashControl(GarmentFactory) {
	console.log("DashboardController loaded")
	var dash = this
	window.dash = dash
	dash.photos = garmentFactory.photos
	dash.garments = GarmentFactory.garments
	dash.wardrobeDisplay = true

	// Dashboard navigation
	dash.openWardrobe = function() {
		dash.wardrobeDisplay = true
		dash.calendarDisplay = false
		dash.weatherDisplay = false
		dash.getOutfitDisplay = false
	}

	dash.openCalendar = function() {
		// dash.wardrobeDisplay = false
		// dash.calendarDisplay = true
		// dash.weatherDisplay = false
		// dash.getOutfitDisplay = false

		// Garments for wardrobe
		dash.garment1 = new GarmentFactory.Garment({
			name: "Red Flannel Shirt",
			type: "top",
			price: 9,
			quantity: 1,
			totalWears: 250,
			wearsPerCycle: 5,
			wearsThisCycle: 4,
			photo: "assets/redFlannel.jpeg"
		})

		dash.garment2 = new GarmentFactory.Garment({
			name: "Blue Jeans",
			type: "bottom",
			price: 50,
			quantity: 1,
			totalWears: 2,
			wearsPerCycle: 5,
			wearsThisCycle: 0,
			photo: "assets/blueJeans.jpeg"
		})

		dash.garment3 = new GarmentFactory.Garment({
			name: "Blue Flannel Shirt",
			type: "top",
			price: 15,
			quantity: 1,
			totalWears: 120,
			wearsPerCycle: 5,
			wearsThisCycle: 2,
			photo: "assets/blueFlannel.jpeg"
		})

		dash.garment4 = new GarmentFactory.Garment({
			name: "Brown Flannel Shirt",
			type: "top",
			quantity: 1,
			price: 7,
			totalWears: 37,
			wearsPerCycle: 5,
			wearsThisCycle: 2,
			photo: "assets/brownFlannel.jpg"
		})

		dash.garment5 = new GarmentFactory.Garment({
			name: "Black Tee Shirt",
			type: "top",
			price: 10,
			quantity: 3,
			totalWears: 50,
			wearsPerCycle: 5,
			wearsThisCycle: 2,
			photo: "assets/blackTee.jpg"
		})

		dash.garment6 = new GarmentFactory.Garment({
			name: "Brown Pants",
			type: "bottom",
			price: 40,
			quantity: 1,
			totalWears: 66,
			wearsPerCycle: 5,
			wearsThisCycle: 2,
			photo: "assets/brownPants.jpg"
		})
	}

	dash.openWeather = function() {
		dash.wardrobeDisplay = false
		dash.calendarDisplay = false
		dash.weatherDisplay = true
		dash.getOutfitDisplay = false
	}

	dash.openGetOutfit = function() {
		dash.wardrobeDisplay = false
		dash.calendarDisplay = false
		dash.weatherDisplay = false
		dash.getOutfitDisplay = true
	}

	// Add new garment
	dash.addNewGarment = function(){
		new GarmentFactory.Garment(dash.newGarment)
		dash.newGarment.name = null
		dash.newGarment.type = null
		dash.newGarment.price = null
		dash.newGarment.quantity = null
		dash.wearsPerCycle = null
		dash.newGarment.wearsPerCycle = null
		dash.newGarment.photo = null
	}

	dash.setActiveItem = function(garment){
		dash.activeItem = garment
		dash.showRetire = true
	}

	dash.toggleRetire = function(){
		dash.showRetire = !dash.showRetire
	}

}