/**
 * @author Sergio Modino
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
/**
 * Modela la relación entre la variable dependiente Y y la variable 
 * independiente X de todos los puntos del sistema, generando la recta
 * ideal del mismo. 
 */
function regresionLineal(){
	/*De los puntos actuales se obtiene:
	 * 		·La suma de las x
	 * 		·La suma de las y
	 * 		·La suma del producto de x*y
	 * 		·La suma del cuadrado de las x*/
	var Sx = 0;		//Suma de las x
	var Sy = 0;		//Suma de las y.
	var Sxy = 0;	//Suma de x*y.
	var Sx2 = 0;	//Suma de x^2.
	var N = puntos.length;
	
	for (var i = 0; i < puntos.length; i++) {
		Sx += puntos[i][0]; //Se suman todas las x
		Sy += puntos[i][1]; //Se suman todas las y
		Sxy += puntos[i][0] * puntos[i][1]; // Se suman todos los x*y
		Sx2 += puntos[i][0] * puntos[i][0]; // Se suman todas las x^2
	}
	
	/* Calculamos a y b de f(x)= a +b*x	
	 * 		donde 	b = (N*Sxy -Sx*Sy) / (N*Sx^2 - Sx*Sx) 
	 * 		y		a = (Sy - b* Sx) / N
	 * */
	var b = (N * Sxy - Sx * Sy) / (N * Sx2 - Sx*Sx); 
	
	var a = (Sy - b * Sx) / N;
	alert("y = " + a + " + " + b + "x");
	recta_error(a,b);
}

/**
 * Dados los valores a y b de la ecuación y= a + bx se dibuja la 
 * recta ideal del sistema.
 * @param a Punto de corte en el eje de las Y.
 * @param b Pendiente de la recta.
 */
function recta_error(a, b){
	ctx.beginPath();
	var auxX = resize_x(100);
	var auxY = resize_y(a + b * 100);
	ctx.moveTo(auxX , auxY);
	var auxX = resize_x(-100);
	var auxY = resize_y(a + b * -100);
	ctx.lineTo(auxX , auxY);
	ctx.strokeStyle = 'red';
	ctx.stroke();
	ctx.fill();
	ctx.closePath();
	
}

/**
 * Recorre cada punto desde el que tiene un valor de X menor
 * y dibuja la recta hasta el punto más cercano, uniendo así todos
 * los puntos del sistema.
 */
function dibujar_lineas(){
	for(var i= 0; i < puntos.length-1 ; i++){
		ctx.beginPath();
		ctx.moveTo(resize_x(puntos[i][0]),resize_y(puntos[i][1]));
		ctx.lineTo(resize_x(puntos[i+1][0]),resize_y(puntos[i+1][1]));
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'blue';
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
	}
}

/**
 *	TODO 
 * @returns {Number}
 */
function calculate_error(){
	//TODO
	return 5;
}

/**
 * Dado un punto bidimensional se almacena en una matriz que contendrá
 * todos los puntos del sistema.
 * @param x Valor del punto en el eje de las X.
 * @param y Valor del punto en el eje de las Y.
 */
function almacena_punto(x , y){
	var insertado = false;
	var i = 0;
	var punto = [parseInt(x,10) ,parseInt(y,10)];
	if(puntos.length == 0){
		puntos[0] = punto;
		insertado = true;
		}
	while(insertado != true){
		if(i >= puntos.length){
			puntos.push(punto);
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

/**
 * Reescala el valor dado en una posición relativa al
 * 	eje de las X.
 * @param x Valor numérico correspondiente al eje de las X.
 * @returns {Number}
 */
function resize_x(x){
	return x * 10 + MAX_x/2;
}

/**
 * Reescala el valor dado en su posición relativa al
 * 	eje de las Y.
 * @param y valor numérico correspondiente al eje de las Y
 * @returns {Number}
 */
function resize_y(y){
	return MAX_y/2 - y * 10;
}

/**
 * Añade un punto a la gráfica mostrada con canvas
 * @param x valor del punto en el eje de las X.
 * @param y valor del punto en el eje de las Y.
 */
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
	almacena_punto(x,y);
	//TODO
	if(puntos.length == 15){
		dibujar_lineas();
		regresionLineal();
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
			regresionLineal();
		}