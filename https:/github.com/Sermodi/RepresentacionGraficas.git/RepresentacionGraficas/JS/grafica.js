/**
 * @author Sergio Modino
 */

var TTabla = 5; //Tamaño de la tabla de inserccion de puntos.
var c=document.getElementById("myCanvas");
c.width = screen.availWidth * 0.5;
c.height = screen.availHeight * 0.75;
var form=document.getElementById("addPunto");
	form = form.children[0]; //los puntos están dentro de un table/tbody/tr/td
var tabla = document.getElementById("addPunto");
var tbody = document.createElement("tbody");

var resultados = document.getElementById("resultados").tBodies[0].children;//array de <tr>'s
var button=document.getElementById("add");
var dibRecta=document.getElementById("dibujarRecta");
var puntos= new Array();
var ctx=c.getContext("2d");
var MAX_x = c.width;
var MAX_y = c.height;

/********************************
 * 								*
 *	Acciones sobre la GRÁFICA	*
 * 								*
 ********************************/
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
 * Añade un punto a la gráfica mostrada con canvas
 * @param x valor del punto en el eje de las X.
 * @param y valor del punto en el eje de las Y.
 */
function add_point(x,y){
	if(!esta_punto(x,y)){
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
		addPuntoToResultados(x, y);
	}
}

/*************************
 * 						 *
 * 	CÁLCULOS necesarios	 *
 * 						 *
 *************************/

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
*	TODO 
* @returns {Number}
*/
function calculate_error(){
	//TODO
	return 2;
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

/****************************************
 * 										*
 * 	Acciones sobre el ARRAY de puntos	*
 * 										*
 ****************************************/
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
 * Comprueba si el punto dado está en la lista de puntos. Devuelve verdadero si el punto
 * se encuentra en la lista de puntos.
 * @param x Coordenada X del punto.
 * @param y Coordenada Y del punto.
 * @returns {Boolean} True si el punto está en la lista, False en el caso contrario.
 */
function esta_punto(x,y){
	for (var i = 0; i < puntos.length; i++) {
		if(puntos[i][0] == x && puntos[i][1] == y){
			return true;
		}
	}
	return false;
} 

/**
 * Indica el indice del punto pasado por parámetro.
 * @param x Valor del punto en el eje de las X.
 * @param y Valor del punto en el eje de las Y.
 * @returns {Number} Posición den la que se encuentra el punto. -1 si no existe 
 * el punto en la lista.
 */
function index_of(x,y){
	if(esta_punto){
		for (var i = 0; i < puntos.length; i++) {
			if(puntos[i][0] == x && puntos[i][1] == y){
				return i;
			}
		}
	}else{
		return -1;
	}
}

function remove_punto(x,y){
	var index = index_of(x,y);
	puntos.splice(index,1); //del indice "index" se borra 1 elemento.
}

/************************
 * 						*
 * 	Edicion del HTML	*
 * 						*
 ************************/
/**
 * TODO
 */
function tabla_inicial(){
	var tr = document.createElement("tr");
	var t1 = document.createElement("th");
	var t2 = document.createElement("th");
	t1.innerHTML = "X";
	t2.innerHTML = "Y";
	tr.appendChild(t1);
	tr.appendChild(t2);
	tbody.appendChild(tr);
	tabla.appendChild(tbody);
	for (var pos = 0; pos < TTabla; pos++) {
		tr = document.createElement("tr");
		td1= document.createElement("td");
		td2= document.createElement("td");
		nput1 = document.createElement("input");
		nput2 = document.createElement("input");
		nput1.setAttribute('type','number');
		nput2.setAttribute('type','number');
		nput1.setAttribute('id','xPunto' + pos);
		nput2.setAttribute('id', 'yPunto' + pos);
		td1.appendChild(nput1);
		td2.appendChild(nput2);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tbody.appendChild(tr);
		tabla.appendChild(tbody);
	}
}

/**
 * TODO
 * @param x
 * @param y
 */
function addPuntoToResultados(x , y){
	var td1 = document.createElement("td"); 
	var td2 = document.createElement("td"); 
	td1.innerHTML = x + "";
	td2.innerHTML = y + "";
	resultados[0].appendChild(td1);
	resultados[1].appendChild(td2);
}

/**
 * Tras pulsar en el boton añadir puntos, se reinicia la tabla con los
 * inputs, poniendo el valor de todos a cero.
 */
function reiniciarTabla(){
	trs = tabla.children[0].children;
	for (var i = 1; i < trs.length; i++) {
		for (var j = 0; j < 2; j++) {
			input = trs[i].children[j].children[0];
			input.value = "";
		}
	}
}
/********************************
 * 								*
 * Codigo PRINCIPAL del script	*
 * 								*
 ********************************/
/*Iniciamos la tabla de inserción de datos*/
tabla_inicial();
/*Dibujamos los ejes en canvas*/
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
			var pos = 0;
			do{
				x = document.getElementById("xPunto"+pos).value;
				y = document.getElementById("yPunto"+pos).value;
				if(x != "" && y != ""){
					if(isNaN(x) || isNaN(y)){//True si la variable NO es un numero
							alert("Es necesario escribir un numero en ese campo");
					}else{
							add_point(x,y);
					}
				}
				pos ++;
			}while(pos < TTabla);
			reiniciarTabla();
		}
			
		/**/
		dibRecta.onclick = function(){
			dibujar_lineas();
			regresionLineal();
		}