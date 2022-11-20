// atlasState 1 = True ; 0 = False
var atlasState = 1;
var atlasStateInv = 1;
var uberState = 1;

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



