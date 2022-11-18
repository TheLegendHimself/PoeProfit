var currentLeague = "Kalandra";
var bossJson = JSON.parse('{"shaper":[ {"name":"Fragment of Knowledge", "value":50}, {"name":"Fragment of Shape", "value":50}, {"name":"Shapers Touch", "value":50}, {"name": "Dying Sun", "value":13}, {"name":"Solstice Vigil", "value":5}, {"name":"Echoes of Cremation", "value":5}, {"name":"Starforge", "value":2}, {"name":"Orb of Dominance", "value":2}], "elder":[{"name":"Fragment of Emptiness", "value":50}, {"name":"Fragment of Terror", "value":50}, {"name":"Blasphemers Grasp", "value":25}, {"name":"Cyclopeon Coil", "value":25}, {"name":"Nebuloch", "value":10}, {"name":"Hopeshredder", "value":10}, {"name":"Shimmeron", "value":10}, {"name":"Any Impresence", "value":20}, {"name":"Orb of Dominance", "value":5}, {"name":"Watchers Eye", "value":25} ] }');

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

/*
async function getDataFromWatch(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=currency";
	const response = await fetch(url, {method: 'GET'});
	console.log(response.ok);
	//console.log(response);
	//console.log(response.json());
	return response.json();
	//return response;
};
*/


function getDivinePriceFromWatch(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=currency";
	fetch(url).then(response => response.json()).then(result => {
			var divToChaosEle = document.getElementById("divToChaos");
			for(var i = 0; i<result.length;i++){
				if(result[i].id == 56){
					divToChaosEle.innerHTML = "Current Divine Value:  "+ result[i].mean;
				}
				//console.log(result[i]);
			}
		}
	);
};


function drawTable(name) {
	var table = document.getElementById("newRows");	
	//delete old table
	removeChilds(table);
	//create new Table from json
	for(var i = 0; i< bossJson[name].length;i++){
		var newRow = '<tr><td>' + bossJson[name][i].name + '</td><td>' + bossJson[name][i].value + '</td></tr>';
		table.insertRow().innerHTML= newRow;
	}		
	
};

getDivinePriceFromWatch();