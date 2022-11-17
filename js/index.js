var currentLeague = "Kalandra";
var shaperJson = JSON.parse('{"shaper":[ {"name":"Fragment of Knowledge", "value":50}, {"name":"Fragment of Shape", "value":50}, {"name":"Shapers Touch", "value":50}, {"name": "Dying Sun", "value":13}, {"name":"Solstice Vivil", "value":5}, {"name":"Echoes of Cremation", "value":5}, {"name":"Starforge", "value":2}, {"name":"Orb of Dominance", "value":2}] }');


function getPoeNinjaPrices(){
	//var url = "https://poe.ninja/api/data/currencyoverview?league="+currentLeague+"&type=Currency";
	//var url = "https://poe.ninja/api/Data/GetStats"
	//let response = fetch(url, {method:"GET"});
	//console.log(response);
	//if (response.ok){
	//	console.log("Yes");
	//}else{
	//	console.log("Sadge");
	//}
	// Ok lets try with JsonP
	var url = "https://poe.ninja/api/data/currencyoverview?League=Kalandra&type=Currency";
	var scriptElement = document.createElement("script");
	scriptElement.setAttribute("src", url);
	scriptElement.setAttribute("id", "jsonp");
};


function shaperTable() {
	var table = document.getElementById("newRows");
	for (var i in shaperJson){
		for(var ii = 0; ii< shaperJson[i].length;ii++){
			var newRow = '<tr><td>' + shaperJson[i][ii].name + '</td><td>' + shaperJson[i][ii].value + '</td></tr>';
			table.insertRow().innerHTML= newRow;
		}		
	}
};


//console.log(shaperJson);
shaperTable();

//getPoeNinjaPrices();
