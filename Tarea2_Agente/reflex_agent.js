// MIT License
// Copyright (c) 2020 Luis Espino

var state_1 = 0, state_2 = 0, state_3 = 0, state_4 = 0, state_5 = 0, state_6 = 0, state_7 = 0, state_8 = 0;


function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

function test(states){
		finalizar();
      	var location = states[0];		
      	var state = states[0] == "A" ? states[1] : states[2];
      	var action_result = reflex_agent(location, state);
      	document.getElementById("log").innerHTML+="<br><strong>Ubicación: ".concat(location).concat(" ---- Acción: ").concat(action_result).concat("</strong>");
      	document.getElementById("contadores").innerHTML = "Estado1: ".concat(state_1).concat(" Estado2: ").concat(state_2).concat(" Estado3: ").concat(state_3).concat(" Estado4: ").concat(state_4).concat(" Estado5: ").concat(state_5).concat(" Estado6: ").concat(state_6).concat(" Estado7: ").concat(state_7).concat(" Estado8: ").concat(state_8)
      	if (action_result == "CLEAN"){
        	if (location == "A"){
        		// **********************        		
        		states[1] = "CLEAN";

        		if (states[1] == "DIRTY" && states[2] == "DIRTY") {
        			setImage(1);
        			state_1++;
        		}else if (states[1] == "DIRTY"  && states[2] == "CLEAN") {
        			setImage(3);
        			state_3++;
        		}else if (states[1] == "CLEAN"  && states[2] == "DIRTY") {
        			setImage(5);
        			state_5++;
        		}else if (states[1] == "CLEAN"  && states[2] == "CLEAN") {
        			setImage(7);
        			state_7++;
        		}

        	}
         	else if (location == "B"){
         		// **********************
         		states[2] = "CLEAN";

         		if (states[1] == "DIRTY" && states[2] == "DIRTY") {
        			setImage(2);
        			state_2++;
        		}else if (states[1] == "DIRTY"  && states[2] == "CLEAN") {
        			setImage(4);
        			state_4++;
        		}else if (states[1] == "CLEAN"  && states[2] == "DIRTY") {
        			setImage(6);
        			state_6++;
        		}else if (states[1] == "CLEAN"  && states[2] == "CLEAN") {
        			setImage(8);
        			state_8++;
        		}
         	}
      	}
      	else if (action_result == "RIGHT"){
      		states[0] = "B";
      	}
      	else if (action_result == "LEFT"){
      		states[0] = "A";
      	}
	setTimeout(function(){ 
		test(states);
		ensuciar(states);
	}, 2000);
}

function setImage(n) {
	const img = document.getElementById("stateImg");
	if (n === 1)
		img.src = "img/1.png";
	else if (n === 2)
		img.src = "img/2.png";
	else if (n === 3)
		img.src = "img/3.png";
	else if (n === 4)
		img.src = "img/4.png";
	else if (n === 5)
		img.src = "img/5.png";
	else if (n === 6)
		img.src = "img/6.png";
	else if (n === 7)
		img.src = "img/7.png";
	else if (n === 8)
		img.src = "img/8.png";
}

function ensuciar(states) {
	//ENSUCIAR DE FORMA ALEATORIA
  	var num = Math.floor(Math.random() * ((2+1) - 1) + 1);
  	if (num === 1) {
  		//Ensuciar A
  		states[1] = "DIRTY";
  	}else if (num === 2) {
  		//Ensuciar B
  		states[2] = "DIRTY";
  	}
}

function finalizar() {
	if (state_1 == 2 && state_2 == 2 && state_3 == 2 && state_4 == 2 && state_5 == 2 && state_6 == 2 && state_7 == 2 && state_8 == 2) {
		alert("Finalizo la ejecución");
        return;
    }
}

var states = ["A","DIRTY","DIRTY"];
test(states);