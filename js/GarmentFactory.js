angular.module("WardrobeApp")
	.factory("GarmentFactory", garmentFactory)

function garmentFactory() {
	console.log("GarmentFactory loaded")
	var garments = []

	function Garment(garmentInfo) {
		this.name = garmentInfo.name
		this.type = garmentInfo.type
		this.quantity = garmentInfo.quantity || 1
		this.price = garmentInfo.price || 1.00
		this.pricePerWear = ((garmentInfo.price/(garmentInfo.totalWears || 1.00))/garmentInfo.quantity)
		this.wearsPerCycle = garmentInfo.wearsPerCycle
		this.wearsThisCycle = garmentInfo.wearsThisCycle
		this.totalWears = garmentInfo.totalWears
		this.photo = garmentInfo.photo || "assets/noImage.png"

		garments.push(this)
	}



	return {
		garments: garments,

		Garment: Garment
	}
}
