var currentLeague = "Kalandra";
var bossJson;
var invitationJson = {"The Formed":[],"The Hidden":[] ,"The Twisted":[], "The Feared":[], "The Forgotten":[], "The Elderslayer":[]};
var bossCostJson = {"shaper":0, "elder":0, "sirus":0, "maven":0, "uber elder":0};
var invitations = ["The Formed", "The Hidden", "The Twisted", "The Feared", "The Forgotten", "The Elderslayer"];
var noAtlasBossJson = JSON.parse('{"shaper":[]}')
var uberBossJson = JSON.parse('{"ubershaper":[{}]}')
var bosses = ["shaper", "elder", "sirus", "maven", "uber elder"];

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
			var shaperCost = 0;
			var sirusCost = 0;
			var elderCost = 0;
			var mavenCost = 0;	
			var uberElderCost = 0;	
			for(var i = 0; i<result.length;i++){		
				//Fragment of the Minotaur id = 47
				if(result[i].id == 47){
					invitationJson["The Formed"][0] = {"name:":"Fragment of the Minotaur", "chaosValue":result[i].mean};
					shaperCost += result[i].mean;
				}
				//Fragment of the Phoenix id = 366
				if(result[i].id == 366){
					invitationJson["The Formed"][1] = ["Fragment of the Phoenix", result[i].mean];
					shaperCost += result[i].mean;
				}
				//Fragment of the Hydra id = 367
				if(result[i].id == 367){
					invitationJson["The Formed"][2] = ["Fragment of the Hydra", result[i].mean];	
					shaperCost += result[i].mean;
				}
				//Fragment of the Chimera id = 368
				if(result[i].id == 368){
					invitationJson["The Formed"][3] = ["Fragment of the Chimera", result[i].mean];
					shaperCost += result[i].mean;
				}
				//Fragment of Enslavement id = 2871
				if(result[i].id == 2871){
					elderCost += result[i].mean;
				}
				//Fragment of Purification id = 369
				if(result[i].id == 369){
					elderCost += result[i].mean;
				}
				//Fragment of Eradication id = 3474
				if(result[i].id == 3474){
					elderCost += result[i].mean;
				}
				//Fragment of Constriction id = 426
				if(result[i].id == 426){
					elderCost += result[i].mean;
				}
				//Crest Al-Hezim 45881
				if(result[i].id == 45881){
					sirusCost += result[i].mean;
				}
				//Crest Veritania 45882
				if(result[i].id == 45882){
					sirusCost += result[i].mean;
				}
				//Crest Drox 45883
				if(result[i].id == 45883){
					sirusCost += result[i].mean;
				}
				//Crest Baran 45917
				if(result[i].id == 45917){
					sirusCost += result[i].mean;
				}
				//Maven's writ 35735
				if(result[i].id == 35735){
					mavenCost+= result[i].mean;
				}
				//Fragment of Knowledge 1292 
				if(result[i].id == 1292){
					uberElderCost+=result[i].mean;
					for(var ii=0;ii<bossJson['shaper'].length;ii++){
						if(bossJson['shaper'][ii].name == "Fragment of Knowledge"){
							bossJson['shaper'][ii].chaosValue = result[i].mean;

						}	
					}
					
				}
				//Fragment of Shape 1293
				if(result[i].id == 1293){
					uberElderCost+=result[i].mean;
					for(var ii=0;ii<bossJson['shaper'].length;ii++){
						if(bossJson['shaper'][ii].name == "Fragment of Shape"){
							bossJson['shaper'][ii].chaosValue = result[i].mean;
						}	
					}
				}
				//Fragment of Emptiness 1995
				if(result[i].id == 1995){
					uberElderCost+=result[i].mean;
					for(var ii=0;ii<bossJson['elder'].length;ii++){
						if(bossJson['elder'][ii].name == "Fragment of Emptiness"){
							bossJson['elder'][ii].chaosValue = result[i].mean;

						}	
					}
				}
				//Fragment of Terror 2566
				if(result[i].id == 2566){
					uberElderCost+=result[i].mean;
					for(var ii=0;ii<bossJson['elder'].length;ii++){
						if(bossJson['elder'][ii].name == "Fragment of Terror"){
							bossJson['elder'][ii].chaosValue = result[i].mean;

						}	
					}
				}
			}
			// setting the bosscosts
			bossCostJson['shaper'] = shaperCost;
			bossCostJson['sirus'] = sirusCost;
			bossCostJson['elder'] = elderCost;
			bossCostJson['maven'] = mavenCost;
			bossCostJson['uber elder'] = uberElderCost;
		}
	);
};

function changeDivPerH(){
	var changer = document.getElementById("divperH");
	changer.innerHTML = ((bossRunValue-document.getElementById('BossCost').value)*(60/document.getElementById('BossTime').value)/divineChaosValue).toFixed(3);
};


function recalculateBossRunValue(){
	var origin = document.getElementById('newRows');
	var newBossRunValue =0;
	for(var i=0;i<origin.children.length;i++){
		newBossRunValue += document.getElementById('BossChaos'+i).value*document.getElementById('BossDropChance'+i).innerHTML/100;
		document.getElementById('BossPerRunValue'+i).innerHTML = (document.getElementById('BossChaos'+i).value*document.getElementById('BossDropChance'+i).innerHTML/100).toFixed(2);
	}
	bossRunValue = newBossRunValue;
	document.getElementById("BossDrop").innerHTML = bossRunValue;
	changeDivPerH();
};

function drawBossTable(newName) {
	name = newName[0];
	if(newName[1]==0){
		//untalented
		if(newName[2]==0){
			//untalented & non uber
			var table = document.getElementById("newRows");	
			var table2 = document.getElementById("newRows2");
			removeChilds(table);
			//create new Table from json
			for(var i = 0; i < bossJson[name].length;i++){
				var newRow = '<tr><td class="col-6"> ' + bossJson[name][i].name + '</td><td class="col-2" id="BossDropChance'+i+'">' + bossJson[name][i].value + '</td><td class="col-2"><input type="number" id="BossChaos'+i+'" onchange="recalculateBossRunValue()" value="'+ bossJson[name][i].chaosValue  + '"></td><td class="col-2" id="BossPerRunValue'+i+'">' + (bossJson[name][i].chaosValue*(bossJson[name][i].value/100)).toFixed(2) + '</td></tr>' ;
				table.insertRow().innerHTML = newRow;
			};	

			//calculate currency per run
			var currRun = 0;
			for(var i=0; i< bossJson[name].length;i++){
				currRun+= bossJson[name][i].chaosValue*(bossJson[name][i].value/100);
			}
			bossRunValue = currRun;
			removeChilds(table2);
			newRow = '<tr><td class="col-2"><input type="number" id="BossCost" onchange="changeDivPerH()" value="' + bossCostJson[name].toFixed(0) +'"></td><td class="col-3" id="BossDrop">'+ currRun +'</td><td class="col-3"><input type="number" id="BossTime" onchange="changeDivPerH()" value="6"></td><td class="col-3" id="divperH">'+ ((currRun-bossCostJson[name])*10/divineChaosValue).toFixed(3)+'</td></tr>';
			table2.insertRow().innerHTML = newRow;
		}else{
			//untalented & uber version

		}
	}else{
		// talented
		if(newName[2]==0){
			// talented & non uber
		}else{
			//talented & uber
		}
	}
	recalculateBossRunValue();
	
};
function getBossJson(){
	// Hardcoded Items with Dropchances
	var shaperList = [["Fragment of Knowledge",50], ["Fragment of Shape",50], ["Shapers Touch", 50], ["Dying Sun", 13], ["Solstice Vigil", 5],["Echoes of Cremation", 5], ["Starforge", 2], ["Orb of Dominance", 2]];
	var elderList = [["Fragment of Emptiness",50], ["Fragment of Terror",50], ["Blasphemers Grasp", 25], ["Cyclopeon Coil",25], ["Nebuloch",10], ["Hopeshredder",10], ["Shimmeron",10], ["Any Impresence",20], ["Orb of Dominance",5], ["Watchers Eye",25]];
	var sirusList = [["Crown of the Inward Eye",38], ["Hands of the High Templar",25], ["Thread of Hope",20], ["The Burden of Truth",15], ["Orb of Dominance",3], ["Awakeners Orb",20], ["A Fate Worse Then Death",4]];
	var mavenList = [["Legacy of Fury", 32], ["Viridis Veil", 20], ["Arns Anguish", 12], ["Gravens Secret", 12], ["Olesyas Delight", 12], ["Impossible Escape", 10], ["Doppelgänger Guise", 2], ["Orb of Conflict", 25], ["Elevated Sextant", 30],["Awakened Support Gems", 55]];
	var uberElderList = [["Mark of the Shaper", 30], ["Mark of the Elder", 30], ["Indigon", 12], ["Call of the Void", 12], ["Voidfletcher",6], ["Disintegrator", 6],["Voidforge",2],["The Eternity Shroud",2], ["Watchers Eye", 25], ["Orb of Dominance", 5]];
	// creating a json with all 4 bosses from hardcoded lists
	var realBossJson = {"shaper":[], "elder":[], "sirus":[], "maven":[], "uber elder":[]};
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


function getinvitationJson(){
	// Hardcoded Items with Dropchances
var theformedList = [["The Maven's Writ", 70],["Orb of Conflict", 1], ["Fragment of the Hydra", 1], ["Fragment of the Minotaur", 1], ["Fragment of the Phoenix", 1], ["Fragment of the Chimera", 1]];
var thehiddenList = [["The Maven's Writ", 70],["Orb of Conflict", 1], ["Tul's Flawless Breachstone", 1], ["Uul-Netol's Flawless Breachstone", 1], ["Xoph's Flawless Breachstone", 1], ["Esh's Flawless Breachstone", 1]];
var thefearedList = [["Test", 1],["ToDo", 2]];
var thetwistedList = [["The Maven's Writ", 70],["Orb of Conflict", 1], ["Fragment of Enslavement", 1], ["Fragment of Constriction", 1], ["Fragment of Eradication", 1], ["Fragment of Purification", 1], ];
var theforgottenList = [["The Maven's Writ", 70],["Orb of Conflict", 1], ["Circle of Anguish", 1], ["Circle of Fear", 1], ["Circle of Guilt", 1], ["Circle of Nostalgia", 1], ["Circle of Regret", 1], ["Mask of the Tribunal", 1], ["Storm's Gift", 1] ["Perepiteia", 1]];
var theelderslayerList =[["The Maven's Writ", 70],["Orb of Conflict", 1], ["Al-Hezmin's Crest", 1], ["Baran's Crest", 1], ["Drox's Crest", 1], ["Veritania's Crest", 1], ["Hunter's Exalted Orb", 1], ["Crusader's Exalted Orb", 1], ["Redeemer's Exalted Orb", 1], ["Warlord's Exalted Orb", 1],];

// creating a json with all Invitations from hardcoded lists
var realInvitationJson = {"The Formed":[], "The Hidden":[], "The Twisted":[], "The Feared":[], "The Forgotten":[], "The Elderslayer":[]};
	for(var i=0;i<theformedList.length;i++){
		realInvitationJson["The Formed"][i] = {"name":theformedList[i][0], "value":theformedList[i][1]};	
	}
	for(var i=0;i<thehiddenList.length;i++){
		realInvitationJson["The Hidden"][i] = {"name":thehiddenList[i][0], "value":thehiddenList[i][1]};	
	}
	for(var i=0;i<thefearedList.length;i++){
		realInvitationJson["The Feared"][i] = {"name":thefearedList[i][0], "value":thefearedList[i][1]};	
	}
	for(var i=0;i<thetwistedList.length;i++){
		realInvitationJson["The Twisted"][i] = {"name":thetwistedList[i][0], "value":thetwistedList[i][1]};	
	}
	for(var i=0;i<theforgottenList.length;i++){
		realInvitationJson["The Forgotten"][i] = {"name":theforgottenList[i][0], "value":theforgottenList[i][1]};	
	}
	for(var i=0;i<theelderslayerList.length;i++){
		realInvitationJson["The Elderslayer"][i] = {"name":theelderslayerList[i][0], "value":theelderslayerList[i][1]};	
	}
	// setting the json as global variable
	invitationJson = realInvitationJson;
};



// creating bossJson & invitationJson
getBossJson();
getinvitationJson();
// getting Divine, Dominance & awakeners orb from API
getCurrencyPriceFromWatch();
// getting fragment prices from API
getFragmentPriceFromWatch();




