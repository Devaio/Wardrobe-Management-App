angular.module("WardrobeApp")
	.controller("DashboardController", ["GarmentFactory", "WeatherFactory", dashControl])

function dashControl(GarmentFactory, WeatherFactory) {
	console.log("DashboardController loaded")
	console.log("WeatherFactory injected!", WeatherFactory);
	var dash = this
	dash.WeatherFactory = WeatherFactory


	window.dash = dash // REMOVE THIS AFTER DEVELOPMENT
	dash.photos = garmentFactory.photos
	dash.garments = GarmentFactory.garments
	dash.garmentTops = GarmentFactory.garmentTops
	dash.garmentBottoms = GarmentFactory.garmentBottoms
	dash.wardrobeDisplay = true

	dash.nextLaundry = 0

	// for now - dummy data generator
	dash.generateDummy = function() {

		// Garments for wardrobe
		dash.garment1 = new GarmentFactory.Garment({
			name: "Red Flannel Shirt",
			type: "top",
			cold: true,
			moderate: true,
			hot: false,
			price: 9,
			totalWears: 250,
			wearsPerCycle: 5,
			wearsThisCycle: 4,
			photo: "assets/redFlannel.jpeg"
		})

		dash.garment2 = new GarmentFactory.Garment({
			name: "Blue Jeans",
			type: "bottom",
			cold: true,
			moderate: true,
			hot: true,
			price: 50,
			totalWears: 2,
			wearsPerCycle: 7,
			wearsThisCycle: 0,
			photo: "assets/blueJeans.jpeg"
		})

		dash.garment3 = new GarmentFactory.Garment({
			name: "Blue Flannel Shirt",
			type: "top",
			cold: true,
			moderate: true,
			hot: false,
			price: 15,
			totalWears: 120,
			wearsPerCycle: 5,
			wearsThisCycle: 2,
			photo: "assets/blueFlannel.jpeg"
		})

		dash.garment4 = new GarmentFactory.Garment({
			name: "Brown Flannel Shirt",
			type: "top",
			cold: true,
			moderate: true,
			hot: false,
			price: 7,
			totalWears: 37,
			wearsPerCycle: 5,
			wearsThisCycle: 2,
			photo: "assets/brownFlannel.jpg"
		})

		dash.garment5 = new GarmentFactory.Garment({
			name: "Black Tee Shirt",
			type: "top",
			cold: true,
			moderate: true,
			hot: true,
			price: 5,
			totalWears: 50,
			wearsPerCycle: 3,
			wearsThisCycle: 1,
			photo: "assets/blackTee.jpg"
		})

		dash.garment6 = new GarmentFactory.Garment({
			name: "Brown Pants",
			type: "bottom",
			cold: true,
			moderate: true,
			hot: true,
			price: 40,
			totalWears: 66,
			wearsPerCycle: 7,
			wearsThisCycle: 2,
			photo: "assets/brownPants.jpg"
		})

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Add new garment
	dash.addNewGarment = function() {
		new GarmentFactory.Garment(dash.newGarment)
		dash.newGarment.name = null
		dash.newGarment.type = null
		dash.newGarment.cold = null
		dash.newGarment.moderate = null
		dash.newGarment.hot = null
		dash.newGarment.price = null
		dash.wearsPerCycle = null
		dash.newGarment.wearsPerCycle = null
		dash.newGarment.photo = null

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Activates when garment photo is clicked
	dash.setActiveItem = function(garment) {
		dash.activeItem = garment
		dash.showRetire = true

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Toggles warn/danger buttons inside garment data modal
	dash.toggleRetire = function() {
		dash.showRetire = !dash.showRetire

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Removes garment from wardrobe
	dash.removeItem = function() {
		dash.garments.splice(dash.garments.indexOf(dash.activeItem), 1)
		if (dash.garmentTops.indexOf(dash.activeItem) != -1) {
			dash.garmentTops.splice(dash.garmentTops.indexOf(dash.activeItem), 1)
		} else {
			dash.garmentBottoms.splice(dash.garmentBottoms.indexOf(dash.activeItem), 1)
		}

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Assigns daily outfit
	dash.generateOutfit = function() {

			dash.filteredTops = dash.garmentTops.filter(function(garment) {
				return garment[dash.WeatherFactory.todayTemp]
			})

			dash.filteredBottoms = dash.garmentBottoms.filter(function(garment) {
				return garment[dash.WeatherFactory.todayTemp]
			})

		dash.outfitTop = dash.filteredTops[Math.floor(Math.random() * dash.filteredTops.length)]
		dash.outfitBottom = dash.filteredBottoms[Math.floor(Math.random() * dash.filteredBottoms.length)]

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Locks in daily outfit, adds to wear count
	dash.setDailyOutfit = function(){
		console.log("Daily Outfit Set!")
		dash.dailyOutfit = {}
		dash.dailyOutfit.top = dash.outfitTop
		dash.dailyOutfit.bottom = dash.outfitBottom

		if (dash.dailyOutfit.top && dash.dailyOutfit.bottom) {
			dash.dailyOutfit.top.wearsThisCycle++
			dash.dailyOutfit.top.totalWears++
			dash.dailyOutfit.bottom.wearsThisCycle++
			dash.dailyOutfit.bottom.totalWears++
		}

		if (dash.dailyOutfit.top.wearsThisCycle >= dash.dailyOutfit.top.wearsPerCycle) {
			dash.garmentTops.splice(dash.garmentTops.indexOf(dash.dailyOutfit.top), 1)
		}
		if (dash.dailyOutfit.bottom.wearsThisCycle >= dash.dailyOutfit.bottom.wearsPerCycle) {
			dash.garmentBottoms.splice(dash.garmentBottoms.indexOf(dash.dailyOutfit.bottom), 1)
		}

		dash.outfitLocked = true

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Toggle for outfit button
	dash.toggleOutfitLock = function(){
		dash.outfitLocked = false

		dash.calculateLaundry() // REMOVE ME AFTER DEMO

	}

	// Grays out clothing that has been met its wear count this laundry cycle
	dash.grayOut = function (garment) {
		if (garment.wearsThisCycle >= garment.wearsPerCycle) {
			return {opacity: 0.4}
		}
	}

	// Click to update days until laundry count
	dash.calculateLaundry = function(){

		// TEMPORARY - TO BE REMOVED
		dash.totalTopsArray = []
		dash.totalBottomsArray = []
		dash.garmentTops.forEach(function(garment) {
			dash.totalTopsArray.push(garment.wearsPerCycle - garment.wearsThisCycle)
		})

		dash.totalTops = dash.totalTopsArray.reduce(function(total, num) { return total + num}) || 0
		dash.garmentBottoms.forEach(function(garment) {
			dash.totalBottomsArray.push(garment.wearsPerCycle - garment.wearsThisCycle)
		})

		dash.totalBottoms = dash.totalBottomsArray.reduce(function(total, num) { return total + num}) || 0
		dash.nextLaundry = Math.min(dash.totalTops, dash.totalBottoms)

	}

}
