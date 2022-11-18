var currentLeague = "Kalandra";
var shaperJson = JSON.parse('{"shaper":[ {"name":"Fragment of Knowledge", "value":50}, {"name":"Fragment of Shape", "value":50}, {"name":"Shapers Touch", "value":50}, {"name": "Dying Sun", "value":13}, {"name":"Solstice Vigil", "value":5}, {"name":"Echoes of Cremation", "value":5}, {"name":"Starforge", "value":2}, {"name":"Orb of Dominance", "value":2}], "elder":[{"name":"Fragment of Emptiness", "value":50}, {"name":"Fragment of Terror", "value":50}, {"name":"Blasphemers Grasp", "value":25}, {"name":"Cyclopeon Coil", "value":25}, {"name":"Nebuloch", "value":10}, {"name":"Hopeshredder", "value":10}, {"name":"Shimmeron", "value":10}, {"name":"Any Impresence", "value":20}, {"name":"Orb of Dominance", "value":5}, {"name":"Watchers Eye", "value":25} ] }');

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};


async function getDataFromWatch(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=currency";
	const response = await fetch(url, {method: 'GET'});
	return response.json();
};

test = getDataFromWatch();
console.log(test);


function drawTable(name) {
	var table = document.getElementById("newRows");	
	//delete old table
	removeChilds(table);

	for(var ii = 0; ii< shaperJson[name].length;ii++){
		var newRow = '<tr><td>' + shaperJson[name][ii].name + '</td><td>' + shaperJson[name][ii].value + '</td></tr>';
		table.insertRow().innerHTML= newRow;
	}		
	
};


