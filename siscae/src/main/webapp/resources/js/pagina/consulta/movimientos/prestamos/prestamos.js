var espacioDisponible;
var recurso;
var cantidadPrestamosRealizados;
var cantidadPrestamosTotales;
var scannerCodigo = "";

$(document).ready(function(){
	
	$('#detalleInfracciones').css('display', 'none');
	$('#mensajeInfracciones').css('display', 'none');
	
	//Detecta la entrada del scanner y marca la salida automatica
	$(document).keydown(function(e)
	{
	    scannerCodigo = scannerCodigo+keyToValue(e.which);
	    var auxCodigo  = scannerCodigo; 
	    
	    if(scannerCodigo.length >= 10){
	    	scannerCodigo = ""; 
	    	auxCodigo = limpiarSalidaScanner(auxCodigo);
			
			var inputValue = auxCodigo;
			
			var cont = $('.swal-overlay--show-modal').length;
			cont = cont + $('.modal-backdrop').length;
			
			
			if(inputValue != null && cont == 0){
				
				var finPrestamo ={
			        	"numDocumentoSolicitante": inputValue
			    };
	
				$.ajax({
	                url :  $variableUtil.root + "movimientoFinPrestamo",
	                type : 'POST',
	                data : JSON.stringify(finPrestamo),
	                beforeSend : function(xhr) {
	    				xhr.setRequestHeader('Content-Type', 'application/json');
	    				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	    			},
	    			statusCode : {
	    				400 : function(response) {
	    					swal(response.responseJSON);
	    				}
	    			},
	    			statusCode : {
	    				400 : function(response) {
	    					swal(response.responseJSON);
	    				},
	    				500 : function(response) {
	    					swal("Error", response.responseText, "warning");
	    				}
	    			},
	    			success : function(response) {
	    				
	    				swal({
	    					  title: "Registro de salida",
	    					  text: "Marco su salida con exito",
	    					  icon: "success",
	    					  button: false,
	    					  timer: 1000,
	    				}).then((value) => {
	    					location.reload();
	    				});
	    			}
	
	
				});
				
			}
			
		}
	    
	});
	
	function keyToValue(key){
		switch (key) {
		case 48:return 0;break;
		case 49:return 1;break;
		case 50:return 2;break;
		case 51:return 3;break;
		case 52:return 4;break;
		case 53:return 5;break;
		case 54:return 6;break;
		case 55:return 7;break;
		case 56:return 8;break;
		case 57:return 9;break;
		default: return "";break;
		}
	}
	
	$('#salida').click(function () {
		swal("Registrar salida",{
			title: "Registrar salida",
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "/siscae/resources/images/lectora.gif",
		}).then(function (inputValue) {
			
			inputValue = limpiarSalidaScanner(inputValue);
			
			if(inputValue != null){
				var finPrestamo ={
			        	"numDocumentoSolicitante": inputValue
			    };

				$.ajax({
	                url :  $variableUtil.root + "movimientoFinPrestamo",
	                type : 'POST',
	                data : JSON.stringify(finPrestamo),
	                beforeSend : function(xhr) {
	    				xhr.setRequestHeader('Content-Type', 'application/json');
	    				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	    			},
	    			statusCode : {
	    				400 : function(response) {
	    					swal(response.responseJSON);
	    				}
	    			},
	    			statusCode : {
	    				400 : function(response) {
	    					swal(response.responseJSON);
	    				},
	    				500 : function(response) {
	    					swal("Error", response.responseText, "warning");
	    				}
	    			},
	    			success : function(response) {
	    				
	    				swal({
	    					  title: "Registro de salida",
	    					  text: "Marco su salida con exito",
	    					  icon: "success",
	    					  button: false,
	    					  timer: 1000,
	    				}).then((value) => {
	    					location.reload();
	    				});
	    			}


				});
				
			}
			
      });
	});
     $('body #for-each').on('click', 'button', function(){
	        let idRecurso = $(this).attr('key');
	        let numRecurso = $(this).attr('num');
	        	
	        	swal({
	    			title: "Solicitud de recurso "+numRecurso,
	    			text: "Ingrese su carnet de biblioteca por el scanner",
	    			content: "input",
	    			icon: "/siscae/resources/images/lectora.gif",
	    		
	    		}).then(function (inputValue) {

	    			if(inputValue != null && inputValue.length != 0){
	    				
	    				inputValue = limpiarSalidaScanner(inputValue);
	    				
	    				var prestamo ={
		    		        	"idRecurso": idRecurso,
		    		        	"numDocumentoSolicitante": inputValue
		    		    };
	    				
	    				$.ajax({
		                    url :  $variableUtil.root + "movimientoPrestamo",
		                    type : 'POST',
		                    data : JSON.stringify(prestamo),
		                    beforeSend : function(xhr) {
		        				xhr.setRequestHeader('Content-Type', 'application/json');
		        				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		        			},
		        			statusCode : {
		        				400 : function(response) {
		        					swal(response.responseJSON);
		        				},
		        				500 : function(response) {
		        					swal("Error", response.responseText, "warning");
		        				}
		        			},
		        			success : function(response) {
		        				
		        				swal({
		      					  title: "Peticion realizada con exito",
		      					  text: "Usted esta prestando el recurso "+numRecurso,
		      					  icon: "success",
		      					  button: false,
		      					  timer: 1000,
			      				}).then((value) => {
			      					location.reload();
			      				});
		        			}

		    			});
	    				
	    			}else{
	    				if(inputValue.length == 0){
	    					swal('El número de documento no puede estar vacío');
	    				}
	    			}
	          });
      });      
      $("#desocupar").click(function(){
    		swal({
    			  title: "¿Deseas desocupar todo?",
    			  text: "Desocupará todo el area de estudio automaticamente",
    			  icon: "warning",
    			  buttons: true,
    			  dangerMode: true,
    			}).then((willDelete) => {
    			  
    				if (willDelete) {
    				  
    				  var desocupar ={
  	    		        	"username": ""
  	    		      };
    				  
    				  $.ajax({
  	                    url :  $variableUtil.root + "movimientoDesalojarArea",
  	                    type : 'POST',
  	                    data : JSON.stringify(desocupar),
  	                    beforeSend : function(xhr) {
  	        				xhr.setRequestHeader('Content-Type', 'application/json');
  	        				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
  	        			},
  	        			statusCode : {
  	        				400 : function(response) {
  	        					swal(response.responseJSON);
  	        				},
  	        				500 : function(response) {
  	        					swal("Error", response.responseText, "warning");
  	        				}
  	        			},
  	        			success : function(response) {
  	        				
  	        				swal({
  	      					  title: "Desocupacion con exito",
  	      					  text: "El aula ha quedado vacia",
  	      					  icon: "success",
  	      					  button: false,
  	      					  timer: 1000,
  		      				}).then((value) => {
  		      					location.reload();
  		      				});
  	        			}
  	        			
    				  })
    				  
    			    
    			  } else {
    			    // nada
    			  }
    		
    			
    			});
    });
	$('#grupalesModal').keyup(function(e) {
	    if(e.keyCode == 13) {
	    	enviarDatosATabla();
	    }
	});	
	$('#agregarTablaGrupal').on('click', function (event){
		enviarDatosATabla();
	});
	$('#consultaInfraccionesModal').keyup(function(e) {
	    if(e.keyCode == 13) {
	    	consultarInfracciones();
	    }
	});
	$('#consultarInfracciones').on('click', function (event){
		consultarInfracciones();
	});
	$('body #for-each-grupales').on('click', 'button', function(){
		recurso = $(this).attr('key');
        let numRecurso = $(this).attr('id');
        let cantidadPrestamos = $(this).attr('prestado');
        let maxCapacidad = $(this).attr('max');
        espacioDisponible =  parseInt(maxCapacidad) - parseInt(cantidadPrestamos);
		$('#infoRecurso').text('Solicititud de recurso '+numRecurso)
		$('#espacioDisponibleLabel').text('Espacio disponible: '+espacioDisponible)
	});	
	$('#confirmarPrestamo').on('click', function (event){
		//Recorriendo todos los elementos del html de la clase .docum
		cantidadPrestamosRealizados=0;
		cantidadPrestamosTotales=0;
		$(".docum").each(function(){
			let m = $(this).text();
			if(m.length!=0){
				cantidadPrestamosTotales=cantidadPrestamosTotales+1;
			}
		});
		$(".docum").each(function(){
			let m = $(this).text();
			if(m.length!=0){
				realizarPrestamo(m);
			}
		});
		if(cantidadPrestamosRealizados!=0){
			swal({
				title: "Peticion realizada con exito",
				text: "Se hizo un prestamo grupal",
				icon: "success",
				button: false,
				timer: 1000,
			}).then((value) => {
				location.reload();
			});
		}
	});
	//Cuando se abra el modal
	$('#consultaInfraccionesModal').on('show.bs.modal', function (e) {
		$('#numDocumentoInfractor').val('');
		$('#detalleInfracciones').css('display', 'none');
		$('#consultarInfraccionesPorDocumento').css('display', 'block');
		$('#numDocumentoInfractor').focus();
		  setTimeout(function (){
		        $('#numDocumentoInfractor').focus();
		   }, 500);
	});
	//Cuando se cierre el modal
	$('#consultaInfraccionesModal').on('hidden.bs.modal', function (e) {
		$('#numDocumentoInfractor').val('');
		$('#consultarInfraccionesPorDocumento').css('display', 'block');
		$('#detalleInfracciones').css('display', 'none');
		$('#mensajeInfracciones').css('display', 'none');
		$('#contenidoInfracciones').css('width','500px');
	})
	$('#cerrarModalInfractores').on('click', function (event){
		$('div').remove('.fila-temporal');
		$('#bodyInfracciones').css('padding-left','0px');
		$('#bodyInfracciones').css('padding-right','0px');
		$('#mensajeInfracciones').css('display', 'none');
		$('#contenidoInfracciones').css('width','500px');
	});
	$('#grupalesModal').on('show.bs.modal', function (e) {
		$('#numeroDocumentoGrupal').focus();
		  setTimeout(function (){
		        $('#numeroDocumentoGrupal').focus();
		   }, 500);
	});
	$('#cerrarModal').on('click', function (event){
		$('#numeroDocumentoGrupal').val('');
	});
});


$(function () {
    $(document).on('click', '.borrar', function (event) {
        event.preventDefault();
        $(this).closest('tr').remove();
        espacioDisponible =  espacioDisponible + 1;
        $('#espacioDisponibleLabel').text('Espacio disponible: '+espacioDisponible);
    });
});


function enviarDatosATabla(){
	
	let numeroDocumento = $('#numeroDocumentoGrupal').val();
	var idPersona;
	var aPaterno;
	var aMaterno;
	
	numeroDocumento = limpiarSalidaScanner(numeroDocumento);
	
	if(espacioDisponible!=0){
		if(numeroDocumento=='' || numeroDocumento == null){
			swal('El numero de documento no puede estar vacio');
			refrescarInput();
		}else{
			if($('#persona'+idPersona).length){
				swal('Te encuentras solicitando el recurso');
				refrescarInput();
			}else{
				
				var num = {
						"numDocumentoSolicitante": numeroDocumento
				};
				//Obteniendo datos de la persona
				//Primero consultamos su estado, si no retorna nada entonces esta normal, si no marcaria un error
				$.ajax({
		                url :  $variableUtil.root + "movimientoConsultarEstadoSolicitante",
		                type : 'POST',
		                data : JSON.stringify(num),
		                beforeSend : function(xhr) {
		    				xhr.setRequestHeader('Content-Type', 'application/json');
		    				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		    			},
		    			statusCode : {
		    				400 : function(response) {
		    					swal(response.responseJSON);
		    				},
		    				500 : function(response) {
		    					swal("Error", response.responseText, "warning");
		    				}
		    			},
		    			success : function(response) {
		    				//AJAX
		    				//Si fue correcto, entonces habrá que obtener sus datos para enviarlo a la tabla
		    				//Primero consultamos por codigo de alumno (mas frecuente en digitar)
		    				//Si la respuesta es nula, entonces debe ser un documento de indentidad
		    				$.ajax({
		    	                    url :  $variableUtil.root + "solicitantesDetalles?accion=buscarPorCriterio&codigo="+numeroDocumento,
		    	                    type : 'GET',
		    	                    beforeSend : function(xhr) {
		    	        				xhr.setRequestHeader('Content-Type', 'application/json');
		    	        				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		    	        			},
		    	        			statusCode : {
		    	        				400 : function(response) {
		    	        					swal(response.responseJSON);
		    	        				},
		    	        				500 : function(response) {
		    	        					swal("Error", response.responseText, "warning");
		    	        				}
		    	        			},
		    	        			success : function(response) {
		    	        				
		    	        				if(response.length==0){
		    	        					//Significa que es un documento de identidad
		    	        					$.ajax({
		    	        	                    url :  $variableUtil.root + "solicitantesDetalles?accion=buscarPorCriterio2&numDocumento="+numeroDocumento,
		    	        	                    type : 'GET',
		    	        	                    beforeSend : function(xhr) {
		    	        	        				xhr.setRequestHeader('Content-Type', 'application/json');
		    	        	        				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		    	        	        			},
		    	        	        			statusCode : {
		    	        	        				400 : function(response) {
		    	        	        					swal(response.responseJSON);
		    	        	        				},
		    	        	        				500 : function(response) {
		    	        	        					swal("Error", response.responseText, "warning");
		    	        	        				}
		    	        	        			},
		    	        	        			success : function(response) {
		    	        	        				idPersona = response[0].idPersona;
		    	        	        				aPaterno = response[0].appPaterno;
				        	        				aMaterno = response[0].appMaterno;
				        	        				
				        	        				if($('#persona'+idPersona).length){
				        	        					swal('Te encuentras solicitando el recurso');
				        	        					refrescarInput();
				        	        				}else{
				        	        					var fila='<tr class="fila-pers"><td id="persona'+idPersona+'" class="celda-pers docum">' +numeroDocumento+'</td><td class="celda-pers">'+aPaterno+' '+aMaterno+'</td><td><button class="btn btn-danger borrar"><i class="fa fa-trash-o"></i></button></td></tr>'
			    	        		    				$('#cuerpoTablaGrupal tr:last').after(fila);
			    	        		    				espacioDisponible =  espacioDisponible - 1;
			    	        		    				$('#espacioDisponibleLabel').text('Espacio disponible: '+espacioDisponible)
			    	        		    				refrescarInput();
				        	        				}
		    	        	        			}
		    	        					});
		    	        				}else{
		    	        					//Fue un codigo de alumno
		    	        					idPersona = response[0].idPersona;
		    	        					aPaterno = response[0].appPaterno;
		        	        				aMaterno = response[0].appMaterno;
		        	        				if($('#persona'+idPersona).length){
		        	        					swal('Te encuentras solicitando el recurso');
		        	        					refrescarInput();
		        	        				}else{
		        	        					var fila='<tr class="fila-pers"><td id="persona'+idPersona+'" class="celda-pers docum">' +numeroDocumento+'</td><td class="celda-pers">'+aPaterno+' '+aMaterno+'</td><td><button class="btn btn-danger borrar"><i class="fa fa-trash-o"></i></button></td></tr>'
	    	        		    				$('#cuerpoTablaGrupal tr:last').after(fila);
	    	        		    				espacioDisponible =  espacioDisponible - 1;
	    	        		    				$('#espacioDisponibleLabel').text('Espacio disponible: '+espacioDisponible)
	    	        		    				refrescarInput();
		        	        				}
		    	        				}
		    	        			}
		    				  });
		    			}
		    			
				});			
			}
		}
	}else{
		swal('No hay mas espacios disponibles');
	}
}


function refrescarInput() {
	//Refrescar campos y hacer focus en 
	$('#numeroDocumentoGrupal').val('');
	$('#numeroDocumentoGrupal').focus();
}

function realizarPrestamo(persona){
	
	
	//AJAX
	var prestamoGrupal ={
        	"idRecurso": recurso,
        	"numDocumentoSolicitante": persona
    };
	
	$.ajax({
        url :  $variableUtil.root + "movimientoPrestamo",
        type : 'POST',
        data : JSON.stringify(prestamoGrupal),
        beforeSend : function(xhr) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		},
		statusCode : {
			400 : function(response) {
				swal(response.responseJSON);
			},
			500 : function(response) {
				swal("Error", response.responseText, "warning");
			}
		},
		success : function(response) {
			cantidadPrestamosRealizados = cantidadPrestamosRealizados + 1;
			if(cantidadPrestamosRealizados==cantidadPrestamosTotales){
				swal({
					title: "Peticion realizada con exito",
					text: "Se hizo un prestamo grupal",
					icon: "success",
					button: false,
					timer: 1000,
				}).then((value) => {
					location.reload();
				});
			}else{
				swal("Ocurrio un problema", "Algunos de los solicitantes no pudieron realizar el prestamo", "warning");
			}
		}
	});
}


function consultarInfracciones(){
	//AJAX
	let numDoc = $('#numDocumentoInfractor').val();
	
	//Desaparecer la barra de busqueda
	$('#consultarInfraccionesPorDocumento').css('display', 'none');
	
	$.ajax({
            url :  $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorCriterio&numeroDocumento="+numDoc,
            type : 'GET',
            beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					swal(response.responseJSON);
				},
				500 : function(response) {
					swal("Error", response.responseText, "warning");
				}
			},
			success : function(response) {

				if(response.length!=0){
					let nombre = response[0].nombre;
    				let numeroDocumento = response[0].numeroDocumento;
    				let tipoDocumento = response[0].tipoDocumento;
    				let aPaterno = response[0].appPaterno;
    				let aMaterno = response[0].appMaterno;
    				let infraccion = response[0].descripcion;
    				let fechaInfraccion = response[0].fechaInfraccion;
    				let estado = response[0].estadoInfraccion;
    				let estadoSolicitante = response[0].estadoSolicitante;
    				
    				$('#tipoDocumento').text(tipoDocumento);
    				$('#numeroDocumentoInfractor').text(numeroDocumento);
    				$('#nombre').text(nombre+' '+aPaterno+' '+aMaterno);
    				$('#infraccion').text(infraccion);
    				$('#fechaInfraccion').text(fechaInfraccion);
    				$('#estado').text(estado);
    				$('#estadoSolicitante').text(estadoSolicitante);
    				
    				$('#mensajeInfracciones').css('display', 'none');
    				$('#detalleInfracciones').css('display', 'flex');
    				$('#numDocumentoInfractor').val('');
    				$('#numDocumentoInfractor').focus();
    				
    				for(i=0;i<response.length;i++){
    					let filaInfracciones='<div class="row fila-temporal"><div class="col-md-2"><label>'+response[i].fechaInfraccion+'</label></div><div class="col-md-6"><label>'+response[i].descripcion+'</label></div><div class="col-md-4"><label>'+response[i].estadoInfraccion+'</label></div></div>';
    					$('#for-iteraciones span:last').after(filaInfracciones);
    				}
    				$('#bodyInfracciones').css('padding-left','40px');
    				$('#bodyInfracciones').css('padding-right','40px');
					$('#contenidoInfracciones').css('width','850px');
				
				}else{
					$('#mensajeInfracciones').css('display', 'block');
					$('#contenidoInfracciones').css('width','500px');
				}	
			}	
	  });
}

function limpiarSalidaScanner(valor){
	//logica: Si la longitud del codigo es igual a 10 es un carnet y comienza con 00
	if(valor.length==10){
		if(valor[0]=='0' && valor[1]=='0'){
			let nuevoValor='';
			for(i=2;i<10;i++){
				nuevoValor = nuevoValor+valor[i];
			}
			return nuevoValor;
		}else{
			return valor;
		}
	}else{
		return valor;
	}
}