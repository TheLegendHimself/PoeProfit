var currentLeague = "Kalandra";
var bossJson;
var bossCostJson = {"shaper":0, "elder":0, "sirus":0, "maven":0};
var noAtlasBossJson = JSON.parse('{"shaper":[]}')
var uberBossJson = JSON.parse('{"ubershaper":[{}]}')
var bosses = ["shaper", "elder", "sirus", "maven"];
var divineChaosValue;
var bossRunValue;

const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};

function getCurrencyPriceFromWatch(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=currency";
	fetch(url).then(response => response.json()).then(result => {
			var divToChaosEle = document.getElementById("divToChaos");
			for(var i = 0; i<result.length;i++){
				// Divine id = 56
				if(result[i].id == 56){					
					divineChaosValue = result[i].mean;
					divToChaosEle.innerHTML = "Current Divine Value:  "+ divineChaosValue;
				}
				//Orb of Dominance id = 45848
				if(result[i].id == 45848){
					for(var ii =0; ii<bosses.length; ii++)
						for(var iii =0; iii<bossJson[bosses[ii]].length; iii++){
							if(bossJson[bosses[ii]][iii].name == "Orb of Dominance"){
								bossJson[bosses[ii]][iii].chaosValue = result[i].mean;
							}
						}
				}
				// Awakener's Orb id = 49
				if(result[i].id == 49){
					for(var ii =0; ii<bossJson["sirus"].length; ii++){
						if(bossJson["sirus"][ii].name == "Awakeners Orb"){
							bossJson["sirus"][ii].chaosValue = result[i].mean;
						}
					}
				}
			}
		}
	);
};

function expandBosses(){
	var orig = document.getElementById('bossPlace');
	removeChilds(orig);
	for(var i=0; i< bosses.length;i++){
		var newButton = document.createElement('div');
		newButton.innerHTML = bosses[i];
		newButton.setAttribute('onclick',"drawBossTable('"+bosses[i]+"')");
		newButton.className = "col-3 border";
		newButton.style = "text-align:center"
		orig.appendChild(newButton);
	}
};

function changeValue(){
	var changer = document.getElementById("divperH");
	changer.innerHTML = ((bossRunValue-document.getElementById('bossCost').value)*10/divineChaosValue).toFixed(3);
};


function drawBossTable(name) {
	var table = document.getElementById("newRows");	
	var table2 = document.getElementById("newRows2");
	removeChilds(table);
	//create new Table from json
	for(var i = 0; i < bossJson[name].length;i++){
		var newRow = '<tr><td class="col-6"> ' + bossJson[name][i].name + '</td><td class="col-2">' + bossJson[name][i].value + '</td><td class="col-2">'+ bossJson[name][i].chaosValue  + '</td><td class="col-2">' + (bossJson[name][i].chaosValue*(bossJson[name][i].value/100)).toFixed(2) + '</td></tr>' ;
		table.insertRow().innerHTML = newRow;
	};	

	//calculate currency per run
	var currRun = 0;
	for(var i=0; i< bossJson[name].length;i++){
		currRun+= bossJson[name][i].chaosValue*(bossJson[name][i].value/100);
	}
	bossRunValue = currRun;
	removeChilds(table2);
	newRow = '<tr><td class="col-2"><input type="number" id="bossCost" onchange="changeValue()" value="' + bossCostJson[name] +'"></td><td class="col-3">'+ currRun +'</td><td class="col-3">'+ '6 min' +'</td><td class="col-3" id="divperH">'+ ((currRun-bossCostJson[name])*10/divineChaosValue).toFixed(3)+'</td></tr>';
	table2.insertRow().innerHTML = newRow;
};
function getJson(){
	// Hardcoded Items with Dropchances
	var shaperList = [["Fragment of Knowledge",50], ["Fragment of Shape",50], ["Shapers Touch", 50], ["Dying Sun", 13], ["Solstice Vigil", 5],["Echoes of Cremation", 5], ["Starforge", 2], ["Orb of Dominance", 2]];
	var elderList = [["Fragment of Emptiness",50], ["Fragment of Terror",50], ["Blasphemers Grasp", 25], ["Cyclopeon Coil",25], ["Nebuloch",10], ["Hopeshredder",10], ["Shimmeron",10], ["Any Impresence",20], ["Orb of Dominance",45], ["Watchers Eye",25]];
	var sirusList = [["Crown of the Inward Eye",38], ["Hands of the High Templar",25], ["Thread of Hope",20], ["The Burden of Truth",15], ["Orb of Dominance",3], ["Awakeners Orb",20], ["A Fate Worse Then Death",4]];
	var mavenList = [["Legacy of Fury", 32], ["Viridis Veil", 20], ["Arns Anguish", 12], ["Gravens Secret", 12], ["Olesyas Delight", 12], ["Impossible Escape", 10], ["Doppelgänger Guise", 2], ["Orb of Conflict", 25], ["Elevated Sextant", 30],["Awakened Support Gems", 55]];
	// creating a json with all 4 bosses from hardcoded lists
	var realBossJson = {"shaper":[], "elder":[], "sirus":[], "maven":[]};
	for(var i=0;i<shaperList.length;i++){
		realBossJson["shaper"][i] = {"name":shaperList[i][0], "value":shaperList[i][1]};	
	}
	for(var i=0;i<elderList.length;i++){
		realBossJson["elder"][i] = {"name":elderList[i][0], "value":elderList[i][1]};	
	}
	for(var i=0;i<sirusList.length;i++){
		realBossJson["sirus"][i] = {"name":sirusList[i][0], "value":sirusList[i][1]};	
	}
	for(var i=0;i<mavenList.length;i++){
		realBossJson["maven"][i] = {"name":mavenList[i][0], "value":mavenList[i][1]};	
	}
	// setting the json as global variable
	bossJson = realBossJson;
};



getJson();
getCurrencyPriceFromWatch();


// TODO
// Fragment of Knowledge
// Fragment of Shape
// Shapers Touch
// Dying Sun
// Solstice Vigil
// Echoes of Cremation
// Starforge



