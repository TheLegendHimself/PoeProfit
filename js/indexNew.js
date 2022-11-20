// 1 = True ; 0 = False
var atlasState = 1;
var atlasStateInv = 1;
var uberState = 1;
// divine chaos value
var divineChaosValue = 150;
var bigJson;
var currentLeague = "Kalandra";



const removeChilds = (parent) => {
    while (parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
};
// switching States:
function changeBtnState(whatButton){
	if(whatButton=="Atlas"){
		if(atlasState == 0){
			atlasState = 1;
		}else{
			atlasState = 0;
		}	
	}
	if(whatButton=="Uber"){
		if(uberState == 0){
			uberState = 1;
		}else{
			uberState = 0;
		}
	}
	if(whatButton=="AtlasInv"){
		if(atlasStateInv == 0){
			atlasStateInv = 1;
		}else{
			atlasStateInv = 0;
		}
	}
};
// ---------------------------
function recalculateDrops(){
	var newDropValue = 0;
	for(var i=1;i<=document.getElementById("DropTable").children.length;i++){
		newDropValue += document.getElementById('Chaos'+i).value*document.getElementById('DropChance'+i).innerHTML/100;
		document.getElementById('PerRunValue'+i).innerHTML = (document.getElementById('Chaos'+i).value*document.getElementById('DropChance'+i).innerHTML/100).toFixed(2);
	}
	document.getElementById('EndDrop').innerHTML = newDropValue.toFixed(2);
	recalculateDivPerH();
};

function recalculateDivPerH(){
	document.getElementById("DivPerH").innerHTML = ((document.getElementById("EndDrop").innerHTML-document.getElementById("Cost").value)*(60/document.getElementById("Time").value)/divineChaosValue).toFixed(2);
};

function drawTable(whatFight){
	tableOrigin = document.getElementById('DropTable');
	document.getElementById('Cost').value = bigJson[whatFight].setCost.toFixed(0);
	removeChilds(tableOrigin);
	if(['shaper', 'elder', 'sirus', 'maven', 'uber elder', 'eater', 'exarch', 'atziri', 'uber atziri', 'maven'].includes(whatFight))
	{
		
		for(var i=0; i<Object.keys(bigJson[whatFight]).length;i++){
			currItem = Object.keys(bigJson[whatFight])[i];
			if(currItem != "setCost"){
				currDropChance = bigJson[whatFight][currItem].dropChance;
				currChaosValue = bigJson[whatFight][currItem].chaosValue;
				if(atlasState == 1 && bigJson[whatFight][currItem].talentedDrop != 0){
					currDropChance += bigJson[whatFight][currItem].talentedDrop;
				}
				if(uberState == 1 && bigJson[whatFight][currItem].talentedDrop != 0){
					currDropChance += bigJson[whatFight][currItem].talentedDrop;
				}
				var newRow = '<tr><td class="col-6"> ' + currItem + '</td><td class="col-2" id="DropChance'+i+'">' + currDropChance + '</td><td class="col-2"><input type="number" id="Chaos'+i+'" onchange="recalculateDrops()" value="'+ currChaosValue  + '"></td><td class="col-2" id="PerRunValue'+i+'">' + (currChaosValue*currDropChance/100).toFixed(2) + '</td></tr>' ;
				tableOrigin.insertRow().innerHTML = newRow;
			}
		}
	}
	//else invitation
	recalculateDrops();
	recalculateDivPerH();


};

function getBigJson(){
	// -------------------------------- Bosses 
	// List[0] = name, [1] = DropChance, [2] = ChaosValue, [3] = talentedDrop (= +base drop), [4] = uberDrop (= +base drop)
	var shaperList = [["Fragment of Knowledge",50, 69, 0, 0], ["Fragment of Shape",50, 69, 0, 0], ["Shapers Touch", 50, 69, 0, 0], ["Dying Sun", 13, 69, 0, 0], ["Solstice Vigil", 5, 69, 0, 0],["Echoes of Cremation", 5, 69, 0, 0], ["Starforge", 2, 69, 0, 0], ["Orb of Dominance", 2, 69, 0, 0]];
	var elderList = [["Fragment of Emptiness",50, 69, 0, 0], ["Fragment of Terror",50, 69, 0, 0], ["Blasphemers Grasp", 25, 69, 0, 0], ["Cyclopeon Coil",25, 69, 0, 0], ["Nebuloch",10, 69, 0, 0], ["Hopeshredder",10, 69, 0, 0], ["Shimmeron",10, 69, 0, 0], ["Any Impresence",20, 69, 0, 0], ["Orb of Dominance",5, 69, 0, 0], ["Watchers Eye",25, 69, 0, 0]];
	var sirusList = [["Crown of the Inward Eye",38, 69, 0, 0], ["Hands of the High Templar",25, 69, 0, 0], ["Thread of Hope",20, 69, 0, 0], ["The Burden of Truth",15, 69, 0, 0], ["Orb of Dominance",3, 69, 0, 0], ["Awakeners Orb",20, 69, 0, 0], ["A Fate Worse Then Death",4, 69, 0, 0]];
	var mavenList = [["Legacy of Fury", 32, 69, 0, 0], ["Viridis Veil", 20, 69, 0, 0], ["Arns Anguish", 12, 69, 0, 0], ["Gravens Secret", 12, 69, 0, 0], ["Olesyas Delight", 12, 69, 0, 0], ["Impossible Escape", 10, 69, 0, 0], ["Doppelgänger Guise", 2, 69, 0, 0], ["Orb of Conflict", 25, 69, 0, 0], ["Elevated Sextant", 30, 69, 0, 0],["Awakened Support Gems", 55, 69, 0, 0]];
	var uberElderList = [["Mark of the Shaper", 30, 69, 0, 0], ["Mark of the Elder", 30, 69, 0, 0], ["Indigon", 12, 69, 0, 0], ["Call of the Void", 12, 69, 0, 0], ["Voidfletcher",6, 69, 0, 0], ["Disintegrator", 6, 69, 0, 0],["Voidforge",2, 69, 0, 0],["The Eternity Shroud",2, 69, 0, 0], ["Watchers Eye", 25, 69, 0, 0], ["Orb of Dominance", 5, 69, 0, 0]];
	var eaterList = [[]];
	var exarchList = [[]];
	var atziriList = [[]];
	var uberAtziriList = [[]];
	var newBigJson = {"shaper":{"setCost" : 0}, "elder":{"setCost" : 0}, "sirus":{"setCost" : 0}, "maven":{"setCost" : 0}, "uber elder":{"setCost" : 0}};
	for(var i = 0; i<shaperList.length;i++){
		newBigJson['shaper'][shaperList[i][0]] = {"dropChance" : shaperList[i][1], "chaosValue": shaperList[i][2], "talentedDrop": shaperList[i][3], "uberDrop": shaperList[i][4]};
	}
	for(var i = 0; i<elderList.length;i++){
		newBigJson['elder'][elderList[i][0]] = {"dropChance" : elderList[i][1], "chaosValue": elderList[i][2], "talentedDrop": elderList[i][3], "uberDrop": elderList[i][4]};
	}
	for(var i = 0; i<sirusList.length;i++){
		newBigJson['sirus'][sirusList[i][0]] = {"dropChance" : sirusList[i][1], "chaosValue": sirusList[i][2], "talentedDrop": sirusList[i][3], "uberDrop": sirusList[i][4]};
	}
	for(var i = 0; i<mavenList.length;i++){
		newBigJson['maven'][mavenList[i][0]] = {"dropChance" : mavenList[i][1], "chaosValue": mavenList[i][2], "talentedDrop": mavenList[i][3], "uberDrop": mavenList[i][4]};
	}
	for(var i = 0; i<uberElderList.length;i++){
		newBigJson['uber elder'][uberElderList[i][0]] = {"dropChance" : uberElderList[i][1], "chaosValue": uberElderList[i][2], "talentedDrop": uberElderList[i][3], "uberDrop": uberElderList[i][4]};
	}
	// --------------------------------- Invitations
	bigJson = newBigJson;
};

function getFragmentValues(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=fragment";
	fetch(url).then(response => response.json()).then(result => {	
		for(var i = 0; i<result.length;i++){
			//Fragment of the Minotaur id = 47
			//Fragment of the Phoenix id = 366
			//Fragment of the Hydra id = 367
			//Fragment of the Chimera id = 368
			if(result[i].id == 47 || result[i].id == 366 || result[i].id == 367 || result[i].id == 368){
						//invitationJson["The Formed"][0] = {"name:":"Fragment of the Minotaur", "chaosValue":result[i].mean};;
				bigJson['shaper'].setCost += result[i].mean;
			}
			//Fragment of Enslavement id = 2871
			//Fragment of Purification id = 369
			//Fragment of Eradication id = 3474
			//Fragment of Constriction id = 426
			if(result[i].id == 2871 || result[i].id == 369 || result[i].id == 3474 || result[i].id == 426){
				bigJson['elder'].setCost += result[i].mean;
			}
			//Crest Al-Hezim 45881
			//Crest Veritania 45882
			//Crest Drox 45883
			//Crest Baran 45917
			if(result[i].id == 45881 || result[i].id == 45882 || result[i].id == 45883 || result[i].id == 45917){
				bigJson['sirus'].setCost += result[i].mean;
			}
			//Maven's writ 35735
			if(result[i].id == 35735){
				bigJson['maven'].setCost = result[i].mean;
			}
			//Fragment of Knowledge 1292
			if(result[i].id == 1292){
				bigJson['shaper']['Fragment of Knowledge'].chaosValue = result[i].mean;
				bigJson['uber elder'].setCost += result[i].mean;
			}
			//Fragment of Shape 1293
			if(result[i].id == 1293){
				bigJson['shaper']['Fragment of Shape'].chaosValue = result[i].mean;
				bigJson['uber elder'].setCost += result[i].mean;
			}
			//Fragment of Emptiness 1995
			if(result[i].id == 1995){
				bigJson['elder']['Fragment of Emptiness'].chaosValue = result[i].mean;
				bigJson['uber elder'].setCost += result[i].mean;
			}
			//Fragment of Terror 2566
			if(result[i].id == 2566){
				bigJson['elder']['Fragment of Terror'].chaosValue = result[i].mean;
				bigJson['uber elder'].setCost += result[i].mean;
			}
		}


	})
};
function getCurrencyValues(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=currency";
	fetch(url).then(response => response.json()).then(result => {
			for(var i = 0; i<result.length;i++){
				// Divine id = 56
				if(result[i].id == 56){					
					divineChaosValue = result[i].mean;
					document.getElementById('DivToChaos').innerHTML = divineChaosValue;
				}
				//Orb of Dominance id = 45848
				if(result[i].id == 45848){
					bigJson['shaper']["Orb of Dominance"].chaosValue = result[i].mean;
					bigJson['elder']["Orb of Dominance"].chaosValue = result[i].mean;
					bigJson['sirus']["Orb of Dominance"].chaosValue = result[i].mean;
					bigJson['uber elder']["Orb of Dominance"].chaosValue = result[i].mean;
				}
				// Awakener's Orb id = 49
				if(result[i].id == 49){
					bigJson['sirus']["Awakeners Orb"].chaosValue = result[i].mean;
				}

				// Orb of Conflict

				// Elevated sextant
			}
		}
	);
};


getBigJson();
getFragmentValues();
getCurrencyValues();

