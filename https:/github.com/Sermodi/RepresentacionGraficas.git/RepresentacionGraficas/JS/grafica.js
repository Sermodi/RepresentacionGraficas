/**
 * 
 */
function create_error(x,y,error){
	ctx.beginPath();
	ctx.moveTo(x - error, y);
	ctx.lineTo(x + error, y);
	ctx.stroke();
	ctx.fill();
	ctx.moveTo(x , y + error);
	ctx.lineTo(x , y - error);
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	
}

function dibujar_lineas(){
	for(var i= 0; i < puntos.length-1 ; i++){
		ctx.beginPath();
		ctx.moveTo(puntos[i][0],puntos[i][1]);
		ctx.lineTo(puntos[i+1][0],puntos[i+1][1]);
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
}
function calculate_error(){
	//TODO
	return 5;
}

function almacena_punto(x , y){
	var insertado = false;
	var i = 0;
	var punto = [x,y];
	if(puntos.length == 0){
		puntos[0] = punto;
		insertado = true;
		}
	while(insertado != true){
		if(puntos.length == i){
			puntos[puntos.length -1] = punto;
			insertado = true;
		}else if(puntos[i][0] > punto[0]){
			puntos.splice(i , 0 , punto);
			insertado = true;
		}else if((puntos[i][0] == punto[0]) && (puntos[i][1] > punto[0])){
			puntos.splice(i , 0 , punto);
			insertado = true;
		}else{
			i++;
		}
	}
}

function resize_x(x){
	return x * 10 + MAX_x/2;
}

function resize_y(y){
	return MAX_y/2 - y * 10;
}

function add_point(x,y){
	ctx.beginPath();
	x1 = resize_x(x);
	y1 = resize_y(y);
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x1+1,y1+1);
	ctx.strokeStyle = 'blue';
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	create_error(x1,y1,calculate_error());
	//TODO add al array
	almacena_punto(x1,y1);
	//TODO
	if(puntos.length = 15){
		dibujar_lineas();
	}
	
}
var c=document.getElementById("myCanvas");
var form=document.getElementById("addPunto");
	form = form.children[0]; //los puntos están dentro de un table/tbody/tr/td
var tabla = document.getElementById("Puntos");
var button=document.getElementById("add");
var dibRecta=document.getElementById("dibujarRecta");
var puntos= new Array();
var ctx=c.getContext("2d");
var MAX_x = c.getAttribute('width');
var MAX_y = c.getAttribute('height');
			ctx.beginPath();
			//Eje de las X
			ctx.moveTo(0,MAX_y/2);
			ctx.lineTo(1000,MAX_y/2);
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.fill(); 
			//Eje de las Y
			ctx.moveTo(MAX_x/2,0);
			ctx.lineTo(MAX_x/2,MAX_y);
			ctx.lineWidth = 1;
			ctx.stroke();
			ctx.fill(); 
			ctx.closePath();
			//marcadores Y
			for(var i=0;i<=MAX_x; i+=10){
				ctx.beginPath();
				ctx.moveTo(MAX_x/2 + 3 , i);
				ctx.lineTo(MAX_x/2 - 3 , i);
				ctx.lineWidth = 0.5;
     			 // set line color
      			ctx.stroke();
				ctx.fill();
				ctx.moveTo(i , MAX_y/2 + 3);
				ctx.lineTo(i , MAX_y/2 - 3);
				ctx.lineWidth = 0.5;
     			 // set line color
      			ctx.stroke();
				ctx.fill();
				ctx.closePath();
			}
		
		/*Tomamos los valores del formulario*/
		button.onclick = function(){
			var x = form.children[1].children[0].firstChild.value;
			var y = form.children[1].children[1].firstChild.value;
			if((x != "") && (y != "")){
				if(isNaN(x) || isNaN(y)){//True si la variable NO es un numero
					alert("Es necesario escribir un numero en ese campo");
				}else{
					add_point(x,y);
				}
			}else{
				alert("Debes escribir un valor en los campos X e Y");
				}
		}
			
		/**/
		dibRecta.onclick = function(){
			dibujar_lineas();
		}