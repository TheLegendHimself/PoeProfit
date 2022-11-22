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
				if(uberState == 1 && bigJson[whatFight][currItem].uberDrop != 0){
					currDropChance += bigJson[whatFight][currItem].uberDrop;
				}
				var newRow = '<tr><td class="col-6"> ' + currItem + '</td><td class="col-2" id="DropChance'+i+'">' + currDropChance + '</td><td class="col-2"><input type="number" id="Chaos'+i+'" onchange="recalculateDrops()" value="'+ currChaosValue  + '"></td><td class="col-2" id="PerRunValue'+i+'">' + (currChaosValue*currDropChance/100).toFixed(2) + '</td></tr>' ;
				tableOrigin.insertRow().innerHTML = newRow;
			}
		}
	}
	//else invitation

	if(['The Formed', 'The Twisted', 'The Feared', 'The Hidden', 'The Forgotten', 'The Elderslayer'].includes(whatFight)){
		for(var i=0; i<Object.keys(bigJson[whatFight]).length;i++){
			currItem = Object.keys(bigJson[whatFight])[i];
			if(currItem != "setCost"){
				currDropChance = bigJson[whatFight][currItem].dropChance;
				currChaosValue = bigJson[whatFight][currItem].chaosValue;
				if(atlasStateInv == 1 && bigJson[whatFight][currItem].talentedDrop != 0){
					currDropChance += bigJson[whatFight][currItem].talentedDrop;
				}
				var newRow = '<tr><td class="col-6"> ' + currItem + '</td><td class="col-2" id="DropChance'+i+'">' + currDropChance + '</td><td class="col-2"><input type="number" id="Chaos'+i+'" onchange="recalculateDrops()" value="'+ currChaosValue  + '"></td><td class="col-2" id="PerRunValue'+i+'">' + (currChaosValue*currDropChance/100).toFixed(2) + '</td></tr>' ;
				tableOrigin.insertRow().innerHTML = newRow;
			}
		}
	}

	// setting current Boss
	document.getElementById('CurrBoss').innerHTML = whatFight;

	recalculateDrops();
	recalculateDivPerH();


};

function getBigJson(){
	// -------------------------------- Bosses 
	// List[0] = name, [1] = DropChance, [2] = ChaosValue, [3] = talentedDrop (= +base drop), [4] = uberDrop (= +base drop)
	var shaperList = [["Fragment of Knowledge",50, 0, 0, 0], ["Fragment of Shape",50, 0, 0, 0], ["Shapers Touch", 50, 0, 0, 0], ["Dying Sun", 13, 0, 0, 0], ["Solstice Vigil", 5, 0, 0, 0],["Echoes of Cremation", 5, 0, 0, 0], ["Starforge", 2, 0, 0, 0], ["Orb of Dominance", 2, 0, 0, 0]];
	var elderList = [["Fragment of Emptiness",50, 0, 0, 0], ["Fragment of Terror",50, 0, 0, 0], ["Blasphemers Grasp", 25, 0, 0, 0], ["Cyclopeon Coil",25, 0, 0, 0], ["Nebuloch",10, 0, 0, 0], ["Hopeshredder",10, 0, 0, 0], ["Shimmeron",10, 0, 0, 0], ["Any Impresence",20, 0, 0, 0], ["Orb of Dominance",5, 0, 0, 0], ["Watchers Eye",25, 0, 10, 0]];
	var sirusList = [["Crown of the Inward Eye",38, 0, 0, 0], ["Hands of the High Templar",25, 0, 0, 0], ["Thread of Hope",20, 0, 0, 0], ["The Burden of Truth",15, 0, 0, 0], ["Orb of Dominance",3, 0, 0, 0], ["Awakeners Orb",20, 0, 0, 0], ["A Fate Worse Then Death",4, 0, 0, 0]];
	var mavenList = [["Legacy of Fury", 32, 0, 0, 0], ["Viridis Veil", 20, 0, 0, 0], ["Arns Anguish", 12, 0, 0, 0], ["Gravens Secret", 12, 0, 0, 0], ["Olesyas Delight", 12, 0, 0, 0], ["Impossible Escape", 10, 0, 0, 0], ["Doppelgänger Guise", 2, 0, 0, 0], ["Orb of Conflict", 25, 0, 0, 0], ["Elevated Sextant", 30, 0, 0, 0],["Awakened Support Gems", 55, 0, 0, 0]];
	var uberElderList = [["Mark of the Shaper", 30, 0, 0, 0], ["Mark of the Elder", 30, 0, 0, 0], ["Indigon", 12, 0, 0, 0], ["Call of the Void", 12, 0, 0, 0], ["Voidfletcher",6, 0, 0, 0], ["Disintegrator", 6, 0, 0, 0],["Voidforge",2, 0, 0, 0],["The Eternity Shroud",2, 0, 0, 0], ["Watchers Eye", 25, 0, 0, 0], ["Orb of Dominance", 5, 0, 0, 0]];
	var eaterList = [["The Gluttonous Tide", 46, 0, 0, 0], ["Inextricable Fate", 46, 0, 0, 0],["Melding of the Flesh", 6, 0, 0, 0], ["Ashes of the Stars", 2, 0, 0, 0], ["Exceptional Eldritch Ichor", 0, 0, 0, 0]];
	var exarchList = [["The Annihilating Light", 46, 0, 0, 0], ["Dawnbreaker", 46, 0, 0, 0],["Dissolution of the Flesh", 6, 0, 0, 0], ["Crystallised Omniscience", 2, 0, 0, 0], ["Exceptional Eldritch Ember", 0, 0, 0, 0] ];
	var atziriList = [["Atziris Promise", 0, 0, 0, 0], ["Atziris Step", 0, 0, 0, 0], ["Droyanis Catalyst", 0, 0, 0, 0], ["Atziris Disfavour", 0, 0, 0, 0], ["Triumvirate Authority", 0, 0, 0, 0], ["Doryanis Invitation", 0, 0, 0, 0], ["Mortal Grief", 0, 0, 0, 0], ["Mortal Hope", 0, 0, 0, 0], ["Mortal Rage", 0, 0, 0, 0], ["Mortal Ignorance", 0, 0, 0, 0], ["Sacrificial Grab", 0, 0, 0, 0]];
	var uberAtziriList = [["Atziris Promise", 0, 0, 0, 0], ["Atziris Step", 0, 0, 0, 0], ["Droyanis Catalyst", 0, 0, 0, 0], ["Atziris Disfavour", 0, 0, 0, 0], ["Triumvirate Authority", 0, 0, 0, 0], ["Doryanis Invitation", 0, 0, 0, 0], ["Sacrificial Grab", 0, 0, 0, 0], ["Atziris Acruity", 0, 0, 0, 0], ["Atziris Reflection", 0, 0, 0, 0], ["Atziris Rule", 0, 0, 0, 0], ["The Vertex", 0, 0, 0, 0], ["Triumvirate Authority", 0, 0, 0, 0], ["Atziris Splendour", 0, 0, 0, 0], ["Plede of Hands", 0, 0, 0, 0]];
	var newBigJson = {"shaper":{"setCost" : 0}, "elder":{"setCost" : 0}, "sirus":{"setCost" : 0}, "maven":{"setCost" : 0}, "uber elder":{"setCost" : 0}, "atziri":{"setCost" : 0}, "uber atziri":{"setCost" : 0}, "exarch":{"setCost" : 0}, "eater":{"setCost" : 0}, "The Formed":{"setCost":0}, "The Feared":{"setCost":0}, "The Forgotten":{"setCost":0}, "The Hidden":{"setCost":0}, "The Elderslayer":{"setCost":0}, "The Twisted":{"setCost":0}};
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
	for(var i = 0; i<eaterList.length;i++){
		newBigJson['eater'][eaterList[i][0]] = {"dropChance" : eaterList[i][1], "chaosValue": eaterList[i][2], "talentedDrop": eaterList[i][3], "uberDrop": eaterList[i][4]};
	}
	for(var i = 0; i<exarchList.length;i++){
		newBigJson['exarch'][exarchList[i][0]] = {"dropChance" : exarchList[i][1], "chaosValue": exarchList[i][2], "talentedDrop": exarchList[i][3], "uberDrop": exarchList[i][4]};
	}
	for(var i = 0; i<atziriList.length;i++){
		newBigJson['atziri'][atziriList[i][0]] = {"dropChance" : atziriList[i][1], "chaosValue": atziriList[i][2], "talentedDrop": atziriList[i][3], "uberDrop": atziriList[i][4]};
	}
	for(var i = 0; i<uberAtziriList.length;i++){
		newBigJson['uber atziri'][uberAtziriList[i][0]] = {"dropChance" : uberAtziriList[i][1], "chaosValue": uberAtziriList[i][2], "talentedDrop": uberAtziriList[i][3], "uberDrop": uberAtziriList[i][4]};
	}
	// --------------------------------- Invitations
	var theFormedList = [["The Maven's Writ", 70, 0, 0, 0],["Orb of Conflict", 1, 0, 0, 0], ["Fragment of the Hydra", 1, 0, 0, 0], ["Fragment of the Minotaur", 1, 0, 0, 0], ["Fragment of the Phoenix", 1, 0, 0, 0], ["Fragment of the Chimera", 1, 0, 0, 0]];
	var theHiddenList = [["The Maven's Writ", 70, 0, 0, 0],["Orb of Conflict", 1, 0, 0, 0], ["Tul's Flawless Breachstone", 1, 0, 0, 0], ["Uul-Netol's Flawless Breachstone", 1, 0, 0, 0], ["Xoph's Flawless Breachstone", 1, 0, 0, 0], ["Esh's Flawless Breachstone", 1, 0, 0, 0]];
	var theFearedList = [["Test", 1, 0, 0, 0],["ToDo", 2, 0, 0, 0]];
	var theTwistedList = [["The Maven's Writ", 70, 0, 0, 0],["Orb of Conflict", 1, 0, 0, 0], ["Fragment of Enslavement", 1, 0, 0, 0], ["Fragment of Constriction", 1, 0, 0, 0], ["Fragment of Eradication", 1, 0, 0, 0], ["Fragment of Purification", 1, 0, 0, 0], ];
	var theForgottenList = [["The Maven's Writ", 70, 0, 0, 0],["Orb of Conflict", 1, 0, 0, 0], ["Circle of Anguish", 1, 0, 0, 0], ["Circle of Fear", 1, 0, 0, 0], ["Circle of Guilt", 1, 0, 0, 0], ["Circle of Nostalgia", 1, 0, 0, 0], ["Circle of Regret", 1, 0, 0, 0], ["Mask of the Tribunal", 1, 0, 0, 0], ["Storm's Gift", 1, 0, 0, 0] ["Perepiteia", 1, 0, 0, 0]];
	var theElderslayerList =[["The Maven's Writ", 70, 0, 0, 0],["Orb of Conflict", 1, 0, 0, 0], ["Al-Hezmin's Crest", 1, 0, 0, 0], ["Baran's Crest", 1, 0, 0, 0], ["Drox's Crest", 1, 0, 0, 0], ["Veritania's Crest", 1, 0, 0, 0], ["Hunter's Exalted Orb", 1, 0, 0, 0], ["Crusader's Exalted Orb", 1, 0, 0, 0], ["Redeemer's Exalted Orb", 1, 0, 0, 0], ["Warlord's Exalted Orb", 1, 0, 0, 0],];
	// List[0] = name, [1] = DropChance, [2] = ChaosValue, [3] = talentedDrop (= +base drop), [4] = not assigned yet
	for(var i = 0; i<theFormedList.length;i++){
		newBigJson['The Formed'][theFormedList[i][0]] = {"dropChance" : theFormedList[i][1], "chaosValue": theFormedList[i][2], "talentedDrop": theFormedList[i][3], "notassigned": theFormedList[i][4]};
	}
	for(var i = 0; i<theHiddenList.length;i++){
		newBigJson['The Hidden'][theHiddenList[i][0]] = {"dropChance" : theHiddenList[i][1], "chaosValue": theHiddenList[i][2], "talentedDrop": theHiddenList[i][3], "notassigned": theHiddenList[i][4]};
	}
	for(var i = 0; i<theTwistedList.length;i++){
		newBigJson['The Twisted'][theTwistedList[i][0]] = {"dropChance" : theTwistedList[i][1], "chaosValue": theTwistedList[i][2], "talentedDrop": theTwistedList[i][3], "notassigned": theTwistedList[i][4]};
	}
	for(var i = 0; i<theFearedList.length;i++){
		newBigJson['The Feared'][theFearedList[i][0]] = {"dropChance" : theFearedList[i][1], "chaosValue": theFearedList[i][2], "talentedDrop": theFearedList[i][3], "notassigned": theFearedList[i][4]};
	}
	for(var i = 0; i<theForgottenList.length;i++){
		newBigJson['The Forgotten'][theForgottenList[i][0]] = {"dropChance" : theForgottenList[i][1], "chaosValue": theForgottenList[i][2], "talentedDrop": theForgottenList[i][3], "notassigned": theForgottenList[i][4]};
	}
	for(var i = 0; i<theElderslayerList.length;i++){
		newBigJson['The Elderslayer'][theElderslayerList[i][0]] = {"dropChance" : theElderslayerList[i][1], "chaosValue": theElderslayerList[i][2], "talentedDrop": theElderslayerList[i][3], "notassigned": theElderslayerList[i][4]};
	}




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
			//Fragment of Purification id = 30
			//Fragment of Eradication id = 3474
			//Fragment of Constriction id = 426
			if(result[i].id == 2871 || result[i].id == 30 || result[i].id == 3474 || result[i].id == 426){
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

			// 420 Sacrifice of Dusk
			//698 Sac of Dawn
			// 841 Sac of Midnight
			//843 Sac of Noon
			if(result[i].id == 420 || result[i].id == 698 || result[i].id == 841 || result[i].id == 843){
				bigJson['atziri'].setCost += result[i].mean;
			}
			// 180 Mortal Rage
			if(result[i].id == 180){
				bigJson['atziri']['Mortal Rage'].chaosValue = result[i].mean;
				bigJson['uber atziri'].setCost += result[i].mean;
			}
			//422 Mortal Hope
			if(result[i].id == 422){
				bigJson['atziri']['Mortal Hope'].chaosValue = result[i].mean;
				bigJson['uber atziri'].setCost += result[i].mean;
			}
			// 424 Mortal Ignorance
			if(result[i].id == 424){
				bigJson['atziri']['Mortal Ignorance'].chaosValue = result[i].mean;
				bigJson['uber atziri'].setCost += result[i].mean;
			}
			// 692 Mortal Grief
			if(result[i].id == 692){
				bigJson['atziri']['Mortal Grief'].chaosValue = result[i].mean;
				bigJson['uber atziri'].setCost += result[i].mean;
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

				// 45849 Orb of Conflict
				if(result[i].id == 45849){
					bigJson['maven']["Orb of Conflict"].chaosValue = result[i].mean;
				}
				// 35647 Elevated sextant
				if(result[i].id == 35647){
					bigJson['maven']["Elevated Sextant"].chaosValue = result[i].mean;
				}
				// 45863 Exceptional Eldritch Ichor
				if(result[i].id == 45863){
					bigJson['eater']["Exceptional Eldritch Ichor"].chaosValue = result[i].mean;
				}
				// 45851 Exceptional Eldritch Ember
				if(result[i].id == 45851){
					bigJson['exarch']["Exceptional Eldritch Ember"].chaosValue = result[i].mean;
				}
			}
		}
	);
};

function getMapValues(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=map";
	fetch(url).then(response => response.json()).then(result => {
			for(var i = 0; i<result.length;i++){
				//incandestant invitation  45934 = exarch
				if(result[i].id == 45934){
					bigJson['exarch'].setCost = result[i].mean;
				}
				//Screaming Invitation 45954 = eater
				if(result[i].id == 45954){
					bigJson['eater'].setCost = result[i].mean;
				}
			}
		});
};

function getJewelValues(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=jewel";
	fetch(url).then(response => response.json()).then(result => {
			for(var i = 0; i<result.length;i++){
				//unid watcher 85 47390
				if(result[i].id == 47390){
					bigJson['elder']['Watchers Eye'].chaosValue = result[i].mean;
				}
				//unid watcher 86 47391
				if(result[i].id == 47391){
					bigJson['uber elder']['Watchers Eye'].chaosValue = result[i].mean;
				}
			}
		});


};

function getUniqueArmorValues(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=armour";
	fetch(url).then(response => response.json()).then(result => {
			for(var i = 0; i<result.length;i++){
				// id: 957 Blasphemer's Grasp
				if(result[i].id == 957){
					bigJson['elder']['Blasphemers Grasp'].chaosValue = result[i].mean;
				}
				//  id: 2640, name: "Indigon"
				if(result[i].id == 2640){
					bigJson['uber elder']['Indigon'].chaosValue = result[i].mean;
				}
				//  id: 1167, name: "Voidfletcher"
				if(result[i].id == 1167){
					bigJson['uber elder']['Voidfletcher'].chaosValue = result[i].mean;
				}
				//  id: 34773, name: "The Eternity Shroud",
				if(result[i].id == 34773){
					bigJson['uber elder']['The Eternity Shroud'].chaosValue = result[i].mean;
				}
			}
		});
};

function getUniqueAccessories(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=accessory";
	fetch(url).then(response => response.json()).then(result => {
			for(var i = 0; i<result.length;i++){
				//id: 1797 Cyclopean Coil
				if(result[i].id == 1797 ){
					bigJson['elder']['Cyclopeon Coil'].chaosValue = result[i].mean;
				}
				// id: 1570, name: "Impresence"
				if(result[i].id == 1570 ){
					bigJson['elder']['Any Impresence'].chaosValue = result[i].mean;
				}
				//  id: 653, name: "Mark of the Shaper
				if(result[i].id == 653 ){
					bigJson['uber elder']['Mark of the Shaper'].chaosValue = result[i].mean;
				}
				// id: 1706, name: "Mark of the Elder"
				if(result[i].id == 1706 ){
					bigJson['uber elder']['Mark of the Elder'].chaosValue = result[i].mean;
				}
				//  id: 46489, name: "Call of the Void"
				if(result[i].id == 46489 ){
					bigJson['uber elder']['Call of the Void'].chaosValue = result[i].mean;
				}
			}
		});
};

function getUniqueWeapons(){
	var url = "https://api.poe.watch/get?league="+currentLeague+"&category=weapon";
	fetch(url).then(response => response.json()).then(result => {
			for(var i = 0; i<result.length;i++){
				//id: 1618, name: "Nebuloch"
				if(result[i].id == 1618 ){
					bigJson['elder']['Nebuloch'].chaosValue = result[i].mean;
				}
				// id: 2338, name: "Hopeshredder"
				if(result[i].id == 2338 ){
					bigJson['elder']['Hopeshredder'].chaosValue = result[i].mean;
				}
				// id: 2486, name: Shimmeron
				if(result[i].id == 2486 ){
					bigJson['elder']['Shimmeron'].chaosValue = result[i].mean;
				}
				// id: 2515, name: "Disintegrator
				if(result[i].id == 2515 ){
					bigJson['uber elder']['Disintegrator'].chaosValue = result[i].mean;
				}
				//id: 34783, name: "Voidforge"
				if(result[i].id == 34783 ){
					bigJson['uber elder']['Voidforge'].chaosValue = result[i].mean;
				}
			}
		});
};

getBigJson();
getFragmentValues();
getCurrencyValues();
getMapValues();
getJewelValues();
getUniqueArmorValues();
getUniqueAccessories();
getUniqueWeapons();