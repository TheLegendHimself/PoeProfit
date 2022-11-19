var currentLeague = "Kalandra";
var bossJson;
var bossCostJson;
var invitationJson;
var noAtlasBossJson = JSON.parse('{"shaper":[]}')
var uberBossJson = JSON.parse('{"ubershaper":[{}]}')
var bosses = ["shaper", "elder", "sirus", "maven"];
var invitations = ["The Formed", "The Hidden", "The Twisted", "The Feared"];
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

function getFragmentPriceFromWatch(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=fragment";
	fetch(url).then(response => response.json()).then(result => {			
			for(var i = 0; i<result.length;i++){		
				//Fragment of the Minotaur id = 47
				if(result[i].id == 47){
					for(var ii =0; ii<invitations.length; ii++)
						if(invitationJson["The Formed"[ii]].name == "Fragment of the Minotaur"){
						invitationJson["The Formed"[ii]].chaosValue = result[i].mean;
						}
				}
				//Fragment of the Phoenix id = 366
				if(result[i].id == 366){
					for(var ii =0; ii<invitations.length; ii++)
						if(invitationJson["The Formed"[ii]].name == "Fragment of the Phoenix"){
						invitationJson["The Formed"[ii]].chaosValue = result[i].mean;
						}
				}
				//Fragment of the Hydra id = 367
				if(result[i].id == 367){
					for(var ii =0; ii<invitations.length; ii++)
						if(invitationJson["The Formed"[ii]].name == "Fragment of the Hydra"){
						invitationJson["The Formed"[ii]].chaosValue = result[i].mean;
						}
				}
				//Fragment of the Chimera id = 368
				if(result[i].id == 368){
					for(var ii =0; ii<invitations.length; ii++)
						if(invitationJson["The Formed"[ii]].name == "Fragment of the Chimera"){
						invitationJson["The Formed"[ii]].chaosValue = result[i].mean;
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
	// grab the item values


	//assemble the strings
	var shaperList = [["Fragment of Knowledge",50], ["Fragment of Shape",50]];
	var elderList = [["Fragment of Emptiness",50], ["Fragment of Terror",50], ["Blasphemers Grasp", 25], ["Cyclopeon Coil",25], ["Nebuloch",10], ["Hopeshredder",10], ["Shimmeron",10], ["Any Impresence",20], ["Orb of Dominance",45], ["Watchers Eye",25]];
	var siruslist = [["Crown of the Inward Eye",38], ["Hands of the High Templar",25], ["Thread of Hope",20], ["The Burden of Truth",15, ]["Orb of Dominance",3], ["Awakeners Orb",20], ["A Fate Worse Then Death",4]];
	var elderList;
	var sirusList;
	var mavenList;
	shaperString = '{"shaper":[ {"name":"Fragment of Knowledge", "value":50, "chaosValue":45}, {"name":"Fragment of Shape", "value":50, "chaosValue":45}, {"name":"Shapers Touch", "value":50, "chaosValue":45}, {"name": "Dying Sun", "value":13, "chaosValue":45}, {"name":"Solstice Vigil", "value":5, "chaosValue":45}, {"name":"Echoes of Cremation", "value":5, "chaosValue":45}, {"name":"Starforge", "value":2, "chaosValue":45}, {"name":"Orb of Dominance", "value":2}], ';
	elderString	 = '"elder":[{"name":"Fragment of Emptiness", "value":50}, {"name":"Fragment of Terror", "value":50}, {"name":"Blasphemers Grasp", "value":25}, {"name":"Cyclopeon Coil", "value":25}, {"name":"Nebuloch", "value":10}, {"name":"Hopeshredder", "value":10}, {"name":"Shimmeron", "value":10}, {"name":"Any Impresence", "value":20}, {"name":"Orb of Dominance", "value":5}, {"name":"Watchers Eye", "value":25}],';
	sirusString  = '"sirus":[{"name":"Crown of the Inward Eye", "value":38}, {"name":"Hands of the High Templar", "value":25}, {"name":"Thread of Hope", "value":20}, {"name":"The Burden of Truth", "value":15}, {"name":"Orb of Dominance", "value":3},{"name":"Awakeners Orb", "value":20}, {"name":"A Fate Worse Then Death", "value":4}], ';
	mavenString  = '"maven":[]}'
	// convert the strings into 1 Json object
	bossJson = shaperString + elderString + sirusString+ mavenString;		
	bossJson = JSON.parse(bossJson);

	//create bossCostJson
	bossCostJson = {"shaper":50, "elder":50, "sirus":50};
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
// Orb of Dominance


