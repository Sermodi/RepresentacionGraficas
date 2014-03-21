/**
 * @author Sergio Modino
 */
$(document).ready(function(){
	/****************
	 * 				*
	 * 	FUNCIONES	*
	 * 				*
	 ***************/
	
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
		var auxX = resize_x(MAX_x/escalaX);
		var auxY = resize_y(a + b * (MAX_x/escalaX));
		ctx.moveTo(auxX , auxY);
		var auxX = resize_x(-(MAX_x/escalaX));
		var auxY = resize_y(a + b * -(MAX_x/escalaX));
		ctx.lineTo(auxX , auxY);
		ctx.strokeStyle = 'red';
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
		
		alert(escalaX + "-escala-" + escalaY);
	}

	/**
	 * Recorre cada punto desde el que tiene un valor de X menor
	 * y dibuja la recta hasta el punto más cercano, uniendo así todos
	 * los puntos del sistema.
	 */
	function dibujar_lineas(){
//		for(var i= 0; i < puntos.length-1 ; i++){
//			var x = puntos[i][0];
//			var nx = resize_x(x);
//			var ny = resize_y(puntos[i][1]);
//			var relativeY = a + b * x;
//			ctx.beginPath();
//			ctx.moveTo(nx , ny);
//			ctx.lineTo(nx , resize_y(relativeY));
//			ctx.lineWidth = 1;
//			ctx.strokeStyle = 'green';
//			ctx.stroke();
//			ctx.fill();
//			ctx.closePath();
////			ctx.beginPath();
////			ctx.moveTo(resize_x(puntos[i][0]),resize_y(puntos[i][1]));
////			ctx.lineTo(resize_x(puntos[i+1][0]),resize_y(puntos[i+1][1]));
////			ctx.lineWidth = 1;
////			ctx.strokeStyle = 'blue';
////			ctx.stroke();
////			ctx.fill();
////			ctx.closePath();
//		}
	}


	/**
	 * Se generan los ejes de las X y de las Y para nuestra gráfica
	 */
	function grafica_inicial(){
		/*Dibujamos los ejes en canvas*/
		ctx.beginPath();
		//Eje de las X
		ctx.moveTo(0 , posicion_ejeY());
		ctx.lineTo(MAX_x+1 , posicion_ejeY());
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();
		ctx.fill(); 
		//Eje de las Y
		ctx.moveTo(posicion_ejeX() , 0);
		ctx.lineTo(posicion_ejeX() , MAX_y);
		ctx.lineWidth = 1;
		ctx.stroke();
		ctx.fill(); 
		ctx.closePath();
		//marcadores 
		var productoX = 1;
		if(escalaX < 15 && escalaX >= 7.5 ){
			productoX = 2;
		}else if(escalaX < 7.5 && escalaX >= 5){
			productoX = 5;
		}else if(escalaX < 5 && escalaX >= 2.5){
			productoX = 10;
		}else if(escalaX < 2.5 && escalaX >= 1){
			productoX = 20;
		}else if(escalaX < 1){
			productoX = 50;
		}else if (escalaX < 0.5){
			productoX = 100;
		}
		var productoY = 1;
		if(escalaY < 15 && escalaY >= 7.5 ){
			productoY = 2;
		}else if(escalaY < 7.5 && escalaY >= 5){
			productoY = 5;
		}else if(escalaY < 5 && escalaY >= 2.5){
			productoY = 10;
		}else if(escalaY < 2.5 && escalaY >= 1){
			productoY = 20;
		}else if(escalaY < 1){
			productoY = 50;
		}else if (escalaY < 0.5){
			productoY = 100;
		}
		for(var i=0;i<=MAX_x; i= parseFloat(i) + parseFloat(escalaX * productoX)){
			//Parte derecha de las X.
			ctx.beginPath();
			ctx.moveTo(posicion_ejeX() + i , posicion_ejeY() + 3);
			ctx.lineTo(posicion_ejeX() + i , posicion_ejeY() - 3);
			ctx.lineWidth = 0.5;
			 // set line color
			ctx.stroke();
			ctx.fill();
			//Texto:
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.font = "8pt Arial";
			ctx.fillStyle = "black";
			ctx.fillText(Math.round(i/escalaX), posicion_ejeX() + i, posicion_ejeY() + 6);
			ctx.closePath();
			//Parte izquierda de las X.
			ctx.beginPath();
			ctx.moveTo(posicion_ejeX() - i , posicion_ejeY() + 3);
			ctx.lineTo(posicion_ejeX() - i, posicion_ejeY() - 3);
			ctx.lineWidth = 0.5;
			 // set line color
			ctx.stroke();
			ctx.fill();
			//Texto:
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.font = "8pt Arial";
			ctx.fillStyle = "black";
			ctx.fillText(-Math.round(i/escalaX), posicion_ejeX() - i, posicion_ejeY() + 6);
			ctx.closePath();
		}
		for(var i=0;i<=MAX_y; i= parseFloat(i) + parseFloat(escalaY * productoY)){
			//Parte superior de las Y.
			ctx.beginPath();
			ctx.moveTo(posicion_ejeX()- 3 , posicion_ejeY() - i);
			ctx.lineTo(posicion_ejeX() + 3, posicion_ejeY() - i);
			ctx.lineWidth = 0.5;
			 // set line color
			ctx.stroke();
			ctx.fill();
			//Texto:
			if(i/escalaY != 0){
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.font = "8pt Arial";
				ctx.fillStyle = "black";
				ctx.fillText(Math.round(i/escalaY), posicion_ejeX() - 10, posicion_ejeY() -i -3);
			}
			ctx.closePath();
			//Parte inferior de las Y.
			ctx.beginPath();
			ctx.moveTo(posicion_ejeX() - 3 , posicion_ejeY() + i);
			ctx.lineTo(posicion_ejeX() + 3, posicion_ejeY() + i);
			ctx.lineWidth = 0.5;
			 // set line color
			ctx.stroke();
			ctx.fill();
			//Texto:
			if(i/escalaY != 0){
				ctx.textAlign = "left";
				ctx.textBaseline = "top";
				ctx.font = "6pt Arial";
				ctx.fillStyle = "black";
				ctx.fillText(-Math.round(i/escalaY), posicion_ejeX() - 10, posicion_ejeY() +i -3);
			}
			ctx.closePath();
		}
	}
	/**
	 * TODO
	 */
	function tabla_inicial(){
		var tr = document.createElement("tr");
		var t1 = document.createElement("th");
		var t2 = document.createElement("th");
		var tbody = document.createElement("tbody");
		var td1;
		var td2;
		var nput1;
		var nput2;
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
	
	function add_tabla(){
		var count = 0;
		var puntoX = "", puntoY = "";
		//Creamos la tabla como un fragmento de HTML
		var tabla = "<table>";
		//Añadimos la cabecera.
		tabla += "<tr><th>X</th><th>Y</th></tr>";
		//Añadimos cada input en su TD correspondiente.
		for (var i = 0; i < TTabla; i++) {
			puntoX = "<td><input id='xPunto"+ (TTabla * nTabla + i) +"' type='number'>";
			puntoY = "<td><input id='yPunto"+ (TTabla * nTabla + i) +"' type='number'>";
			tabla += "<tr>" + puntoX  + puntoY + "</tr>";
		}
		//cerramos la tabla.
		tabla += "</table>";
		
		//Para el div contenedor de las tablas se añade el html generado.
		$("#contenedor").append(tabla);
		//Tras añadir los nuevos inputs nTabla tendrá el valor de la cantidad de inputs.
		nTabla += parseInt(1);
		
		$("#contenedor").find("#xPunto"+ ((TTabla * nTabla) - 1)).change(function(){
			if($(this).attr('id') == ("xPunto" + ((TTabla * nTabla) -1))){
				add_tabla();
			}
		});
	}
	
	/**
	 * Añade los puntos de la Tabla a la gráfica
	 */
	function add_puntos(){
		var pos = 0;
		do{
			x = document.getElementById("xPunto"+pos).value;
			y = document.getElementById("yPunto"+pos).value;
			if(x != "" && y != ""){
				if(isNaN(x) || isNaN(y)){//True si la variable NO es un numero
						alert("Es necesario escribir un numero en ese campo");
				}else{
					if(!esta_punto(x,y)){
						almacena_punto(x,y);
						addPuntoToResultados(x, y);
					}
				}
			}
			pos ++;
		}while(pos < (TTabla * nTabla));
		reiniciarTabla();
	}
	/**
	 * Añade un punto a la gráfica mostrada con canvas
	 * @param x valor del punto en el eje de las X.
	 * @param y valor del punto en el eje de las Y.
	 */
	function draw_points(){
		var x;
		var y;
		for (var i = 0; i < puntos.length; i++) {
			x = puntos[i][0];
			y = puntos[i][1];
			ctx.beginPath();
			x1 = resize_x(x);
			y1 = resize_y(y);
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x1+1,y1+1);
			ctx.strokeStyle = 'green';
			ctx.stroke();
			ctx.fill();
			ctx.closePath();
			create_error(x1,y1,calculate_error());
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
//		return x * 10 + MAX_x/2;
		return x * escalaX + posicion_ejeX();
	}

	/**
	 * Reescala el valor dado en su posición relativa al
	 * 	eje de las Y.
	 * @param y valor numérico correspondiente al eje de las Y
	 * @returns {Number}
	 */
	function resize_y(y){
//		return MAX_y/2 - y * 10;
		return posicion_ejeY() - y * escalaY;
	}
	/**
	*	TODO 
	* @returns {Number}
	*/
	function calculate_error(){
		//TODO
		return 2;
	}

	/****************************************
	 * 										*
	 * 	Acciones sobre el ARRAY de puntos	*
	 * 										*
	 ****************************************/

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

	/**
	 * Elimina todos los puntos almacenados
	 */
	function remove_puntos(){
		puntos.splice(0, puntos.length);
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
	 * Dado un punto bidimensional se almacena en una matriz que contendrá
	 * todos los puntos del sistema.
	 * @param x Valor del punto en el eje de las X.
	 * @param y Valor del punto en el eje de las Y.
	 */
	function almacena_punto(x , y){
		var insertado = false;
		var i = 0;
		var punto = [parseFloat(x) ,parseFloat(y)];
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
	 * Tras pulsar en el boton añadir puntos, se reinicia la tabla con los
	 * inputs, poniendo el valor de todos a cero.
	 */
	function reiniciarTabla(){
//		trs = tabla.children[0].children;
//		for (var i = 1; i < trs.length; i++) {
//			for (var j = 0; j < 2; j++) {
//				input = trs[i].children[j].children[0];
//				input.value = "";
//			}
//		}
		$("input[id^=xPunto]").val("");
		$("input[id^=yPunto]").val("");
	}

	/**
	 * TODO
	 * @param x
	 * @param y
	 */
	function addPuntoToResultados(x , y){
		var td1 = document.createElement("td"); 
		var td2 = document.createElement("td"); 
		x1 = Math.round(x * 1000) / 1000;
		y1 = Math.round(y * 1000) / 1000;
		td1.innerHTML = x1 + "";
		td2.innerHTML = y1 + "";
		resultados[0].appendChild(td1);
		resultados[1].appendChild(td2);
	}

	/**
	 * Todos los puntos que se encuentran en la tabla de resultados
	 *  serán borrados
	 */
	function removePuntosFromResultados(){
		$("#resultados tr td").remove();
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
		b = (N * Sxy - Sx * Sy) / (N * Sx2 - Sx*Sx); 
		
		a = (Sy - b * Sx) / N;
//		alert("y = " + a + " + " + b + "x");
		recta_error(a,b);
	}
	
	/**
	 * Oculta el elemento pasado por argumento
	 */
	function ocultar(elem){
		elem.style.display = 'none';
	}
	
	/**
	 * Muestra el elemento pasado por argumento
	 */
	function mostrar(elem){
		elem.style.display = 'block';
	}
	/**
	 * Hace que un elemento indicado en el argumento parpadee a razon de 5 segundos.
	 * @REQUIRES El elemento pasado por argumento debe ser un elemento jquery. Ejemplo: parpadear($("body"));
	 */
	function parpadear(elem){ 
		for (var i = 0; i < 50; i++) {
			elem.fadeIn(2500).delay(500).fadeOut(1000); 
		}
	}
	
	function tabla_en_imagen(){ 
		var aux = "<table>";
		var rowLength = tabla.rows.length;
		for (i = 0; i < rowLength; i++){
			var celda = tabla.rows.item(i).cells;
			var celdaLength = celda.length;
			aux += "<tr>";
			for(var j = 0; j < celdaLength; j++){
				aux += "<td>" + celda.item(j).innerHTML; + "<td>";
			}
			aux += "</tr>";
		}
		aux += "</table>";
		return aux;
	}
	
	/********************************
	 * 								*
	 *	Operaciones de reescalado	*
	 *								*
	 ********************************/
	//TODO
	function posicion_minima(j){
		var minimo = 0;
		for (var i = 0; i < puntos.length; i++) {
			if(puntos[i][j] < minimo){
				minimo = puntos[i][j];
			}
		}
		//Para que el punto sea visible se añade un valor al resultado.
		return minimo - 1;
	}
	
	function posicion_maxima(j){
		var maximo = 0;
		for (var i = 0; i < puntos.length; i++) {
			if(puntos[i][j] > maximo){
				maximo = puntos[i][j];
			}
		}
		//Para que el punto sea visible se añade un valor al resultado.
		return maximo + 1;
	}
	
	function puntos_mostrados(i){
		return posicion_maxima(i) + Math.abs(posicion_minima(i));
	}
	/**
	 * Indicará el ancho de una unidad de medida en pixeles
	 * @returns
	 */
	function set_escala(){
		// valor 0 para X y valor Y para 1
		escalaY = MAX_y / puntos_mostrados(1);
		escalaX = MAX_x / puntos_mostrados(0);
		escalaX = escalaX.toFixed(3);
		escalaY = escalaY.toFixed(3);
	}
	
	/**
	 * Posicion REAL del eje de las y en la gráfica
	 * 		(no necesita reescalado).
	 * 	Altura del cuadro menos los puntos negativos escalados.
	 * 	pos_ejeY = h - ((puntos_mostrados - punto_máximo) * escala)
	 */
	function posicion_ejeY(){
		/*Se calculan los puntos negativos con:  número de puntos - el punto de mayor valor*/
		var aux = puntos_mostrados(1) - posicion_maxima(1);
		/*posicion = MAX_y - (aux * escala)*/
		var posicion = MAX_y - (aux * escalaY);
		if(posicion < 20){
			return 20;
		}else{
			return posicion;
		}
	}
	/**
	 * Posicion REAL del eje de las x en la gráfica
	 * 		(no necesita reescalado).
	 */
	function posicion_ejeX(){
		/*Se calcula el número de puntos - el punto de mayor valor*/
		var aux = puntos_mostrados(0) - posicion_maxima(0);
		var posicion = aux * escalaX;
		if(posicion > (MAX_x - 20)){
			return MAX_x -20;
		}else{
			return posicion;
		}
	}
	/**
	 * Declaración de variables.
	 */
	var c=document.getElementById("myCanvas");
	c.width = $(window).width() / 2;
	c.height = $(window).height() * 0.75;
	var ctx=c.getContext("2d");
	//Tamaño de la tabla de inserccion de puntos.
	var TTabla = 5; 
	var nTabla = 1; //Numero de tablas mostradas.
	var form=document.getElementById("addPunto");
	form = form.children[0]; //los puntos están dentro de un table/tbody/tr/td
	var tabla = document.getElementById("addPunto");

	var img = document.getElementById("imagen");
	var resultados = document.getElementById("resultados").tBodies[0].children;//array de <tr>'s
	var add_punto = document.getElementById("add");
	var reset_grafica = document.getElementById("resetG");
	var to_image = document.getElementById("to_image");
	/**Almacenamos los puntos en un array.*/
	var puntos= new Array();
	var MAX_x = c.width;
	var MAX_y = c.height;
	var escalaX = 50;
	var escalaY = 50;
	
	
	/**
	 *	LECTURA DE FICHERO
	 */
	var reader;
	var progress = document.querySelector('.percent');
	
		function errorHandler(evt) {
			    switch(evt.target.error.code) {
		      case evt.target.error.NOT_FOUND_ERR:
		        alert('No se encuentra el fichero.');
		        break;
		      case evt.target.error.NOT_READABLE_ERR:
		        alert('El fichero no se puede leer\n Asegurate de que tiene los privilegios correctos.');
		        break;
		      case evt.target.error.ABORT_ERR:
		        break; // noop
		      default:
		        alert('Ha ocurrido un error al leer el fichero, puede que el fichero esté dañado.');
		    };
		}
	
		    function updateProgress(evt) {
		        // evt es el evento de progreso de la barra
		        if (evt.lengthComputable) {
		          var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
		          // Incrementar el tamaño de la barra de progreso.
		          if (percentLoaded < 100) {
		            progress.style.width = percentLoaded + '%';
		            progress.textContent = percentLoaded + '%';
		          }
		        }
		      }
		    
		    function handleFile(evt) {
		    	var file = evt.target.files[0];
		        // Reinicia el indicador de progreso tras la selección de un nuevo fichero.
		        progress.style.width = '0%';
		        progress.textContent = '0%';
	        	$("#lista").text("");
				$("#lista").css("color", "green");
				document.getElementById('progress_bar').className = 'loading';

				if (file.type.match('text/*')) {
					reader = new FileReader();
			        reader.onloadstart = function(e) {
			          document.getElementById('progress_bar').className = 'loading';
			        };
			        reader.onerror = errorHandler;
			        reader.onprogress = updateProgress;
			        reader.onload = function(e) {
			          // Pasa los datos recibidos a la gráfica y se asegura de q la barra de progreso marca 100%
			          fileRead(reader.result);
			          progress.style.width = '100%';
			          progress.textContent = '100%';
			          setTimeout("document.getElementById('progress_bar').className='';", 2000);
			        };
			        reader.onloadend = function(e){
			        	$("#lista").text("¡Archivo leido con exito!");
			        };
			        // Lectura del fichero.
			        reader.readAsBinaryString(file);
				}else{
					$("#lista").text("El archivo no tiene el formato correcto, por favor comprueba que es un archivo en texto plano o .csv");
					$("#lista").css("color", "red");
					parpadear($("#lista"));
					
				}
		        
		      }
		    
		    document.getElementById('archivo').addEventListener('change', handleFile, false);
		    
		function fileRead(texto){
				var numeros = texto.split(/[\n,;\t]/);
//				$("th").each(function(){
//					if($(this).html() == "X"){
//						$(this).html(numeros[0]);
//					}else if($(this).html() == "Y"){
//						$(this).html(numeros[1]);
//					}
				for (var i = 2; i < numeros.length; i+=2) {
					if(!isNaN(numeros[i]) && !isNaN(numeros[i+1])){
						x = numeros[i];
						y = numeros[i+1];
						if(!esta_punto(x, y)){
							almacena_punto(x,y);
							addPuntoToResultados(x, y);
							if(puntos.length > 2){
								ctx.clearRect(0 , 0 , c.width , c.height);
								set_escala();
								grafica_inicial();
								regresionLineal();
					//			dibujar_lineas();
								draw_points();
								mostrar(reset_grafica);
								mostrar(to_image);
							}
						}
	//					alert("x:" + numeros[i] + "  y:" + numeros[i+1]);
					}
				}
			};
	/**
	 * Script principal
	 */
	//El script se ejecuta tras cargar el documento entero.
	tabla_inicial();
	grafica_inicial();
	ocultar(reset_grafica);
	ocultar(to_image);
	ocultar(imagen);
	
	$("#addPunto tbody tr td input").on("change", function(){
		if($(this).attr('id') == ("xPunto" + ((TTabla * nTabla) -1))){
			add_tabla();
		}
	});
	// Comprobamos si la subida de ficheros esta soportada.
	if (window.File && window.FileReader && window.FileList && window.Blob) {
	  // Todo correcto, el navegador soporta todas las APIs de ficheros
	} else {
	  alert('Las API de ficheros no son soportadas por este navegador, la subida de un archivo ".csv" puede dar resultados erroneos o no responder.');
	}

	add_punto.onclick = function(){
		add_puntos();
		if(puntos.length > 2){
			ctx.clearRect(0 , 0 , c.width , c.height);
			set_escala();
			grafica_inicial();
			regresionLineal();
//			dibujar_lineas();
			draw_points();
			mostrar(reset_grafica);
			mostrar(to_image);
		}
	};
	
	reset_grafica.onclick = function(){
		ctx.clearRect(0 , 0 , c.width , c.height);
		grafica_inicial();
		removePuntosFromResultados();
		remove_puntos();
		ocultar(reset_grafica);
		ocultar(to_image);
		ocultar(img);
		mostrar(c);
		mostrar(add_punto);
	};
	
	to_image.onclick = function(){
		ctx.textAlign = "right";
		ctx.textBaseline = "bottom";
		ctx.font = "30 pt Verdana";
		ctx.fillStyle = "red";
		ctx.fillText("y="+a+" + "+b+"x", MAX_x - 50, MAX_y -50);
		img.src = c ? c.toDataURL() : "could not find a <canvas> element";
		ocultar(c);
		ocultar(add_punto);
		mostrar(img);
	};
});