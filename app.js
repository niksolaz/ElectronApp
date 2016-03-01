'use strict';

function myApp(){
	var buttonCheck = true;
	if(buttonCheck === true){
		var language  = Math.random();
		if(language < 0.4) {
		        alert('Wie geht es?');
		}if(language < 0.8){
			alert('Come stai?');
		}else{
			alert('How are you?');
		}
	}else{
		alert('ERROR FOUND!');
	}
}