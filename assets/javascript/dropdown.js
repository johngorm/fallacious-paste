		var neighborhoodList = [
	"Albany Park",
	"Archer Heights",
	"Armour Square",
	"Ashburn",
	"Auburn Gresham",
	"Austin",
	"Avalon Park",
	"Avondale",
	"Belmont Cragin",
	"Beverly",
	"Bridgeport",
	"Brighton Park",
	"Burnside",
	"Calumet Heights",
	"Chatham",
	"Chicago Lawn",
	"Clearing",
	"Douglas",
	"Dunning",
	"East Garfield Park",
	"East Side",
	"Edgewater",
	"Edison Park",
	"Englewood",
	"Forest Glen",
	"Fuller Park",
	"Gage Park",
	"Garfield Ridge",
	"Grand Boulevard",
	"Greater Grand Crossing",
	"Hegewisch",
	"Hermosa",
	"Humboldt Park",
	"Hyde Park",
	"Irving Park",
	"Jefferson Park",
	"Kenwood",
	"Lakeview",
	"Lincoln Park",
	"Lincoln Square",
	"Logan Square",
	"Loop",
	"Lower West Side",
	"Near North Side",
	"Near South Side",
	"Near West Side",
	"New City",
	"North Center",
	"North Lawndale",
	"North Park",
	"Norwood Park",
	"McKinley Park",
	"Montclare",
	"Mount Greenwood",
	"Morgan Park",
	"Oakland",
	"O'Hare",
	"Portage Park",
	"Pullman",
	"Riverdale",
	"Rogers Park",
	"Roseland",
	"South Chicago",
	"South Deering",
	"South Lawndale",
	"South Shore",
	"Washington Heights",
	"Washington Park",
	"West Elsdon",
	"West Englewood",
	"West Garfield Park",
	"West Lawn",
	"West Pullman",
	"West Ridge",
	"West Town",
	"Woodlawn",
	"Uptown"
];

	for (i=0; i<neighborhoodList.length; i++) {
	var neighName = $("<a>");
	neighName.attr("href", "#");
	neighName.prepend(neighborhoodList[i]);

	$("#neighborhoods").append(neighName);
}


function dropdownList(){

	document.getElementById("neighborhoods").classList.toggle("show")
};

window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {
		var dropdowns = document.getElementsByClassName("neigh-list");
		var i;
		for (i=0; i<neighborhoods.length; i++) {
			var openDropdown = neighborhoods[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
				
			}
		} 
	}
}