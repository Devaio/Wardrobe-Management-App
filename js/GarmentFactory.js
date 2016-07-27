angular.module("WardrobeApp")
	.factory("GarmentFactory", garmentFactory)

function garmentFactory() {
	console.log("GarmentFactory loaded")
	var garments = []
	var garmentTops = []
	var garmentBottoms = []

	function Garment(garmentInfo) {
		this.name = garmentInfo.name
		this.type = garmentInfo.type
		this.quantity = garmentInfo.quantity || 1
		this.price = garmentInfo.price || 1.00
		this.pricePerWear = (garmentInfo.price || 1)/(garmentInfo.totalWears || 1)
		this.wearsPerCycle = garmentInfo.wearsPerCycle || 0
		this.wearsThisCycle = garmentInfo.wearsThisCycle || 0
		this.totalWears = garmentInfo.totalWears || 0
		this.photo = garmentInfo.photo || "assets/noImage.png"

		garments.push(this)
		if (this.type == "top") {
			garmentTops.push(this)
		}
		if (this.type == "bottom") {
			garmentBottoms.push(this)
		}
	}



	return {
		garments: garments,
		garmentTops: garmentTops,
		garmentBottoms: garmentBottoms,

		Garment: Garment
	}
}
