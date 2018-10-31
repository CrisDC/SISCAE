var espacioDisponible;
var recurso;

$(document).ready(function(){
	
	$('#detalleInfracciones').css('display', 'none');
	
	$('#salida').click(function () {
		swal("Registrar salida",{
			title: "Registrar salida",
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "/siscae/resources/images/lectora.gif",
		}).then(function (inputValue) {
			
			console.log(inputValue);
			
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


				}, function (dismiss) {
				  // dismiss can be 'cancel', 'overlay',
				  // 'close', and 'timer'
				  
				

				});
				
			}
			
      });
	});
     $('body #for-each').on('click', 'button', function(){
	        let idRecurso = $(this).attr('key');
	        let numRecurso = $(this).attr('id');
	        	
	        	swal({
	    			title: "Solicitud de recurso "+numRecurso,
	    			text: "Ingrese su carnet de biblioteca por el scanner",
	    			content: "input",
	    			icon: "/siscae/resources/images/lectora.gif",
	    		
	    		}).then(function (inputValue) {

	    			if(inputValue != null){
	    				
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

		    			}, function (dismiss) {
		    			  // dismiss can be 'cancel', 'overlay',
		    			  // 'close', and 'timer'
		    			  
		    			});
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
    			})
    			.then((willDelete) => {
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
  	        			
    				  }, function (dismiss) {
    	    			  // dismiss can be 'cancel', 'overlay',
    	    			  // 'close', and 'timer'
    	    			  
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
		$(".docum").each(function(){
			let m = $(this).text();
			realizarPrestamo(m);
		});
		swal({
			title: "Peticion realizada con exito",
			text: "Ustedes estan prestando el recurso",
			icon: "success",
			button: false,
			timer: 1000,
		}).then((value) => {
			location.reload();
		});
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
	})
	
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
	if(espacioDisponible!=0){
		let numeroDocumento = $('#numeroDocumentoGrupal').val();
		
		if($('#'+numeroDocumento).length){
			swal('Te encuentras solicitando el recurso');
			refrescarInput();
		}else{
			if(numeroDocumento==''){
				swal('El numero de documento no puede estar vacio');
				refrescarInput();
			}else{
				
				var num = {
						"numDocumentoSolicitante": numeroDocumento
	    		};
				
				//AJAX
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
	        			
	        				console.log(response);
	        				
	        				//AJAX
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
	        	        				
	        	        				let aPaterno = response[0].appPaterno;
	        	        				let aMaterno = response[0].appMaterno;
	        	        				
	        	        				var fila='<tr class="fila-pers"><td id="'+numeroDocumento+'" class="celda-pers docum">' +numeroDocumento+'</td><td class="celda-pers">'+aPaterno+' '+aMaterno+'</td><td><button class="btn btn-danger borrar"><i class="fa fa-trash-o"></i></button></td></tr>'
	        	        				$('#cuerpoTablaGrupal tr:last').after(fila);
	        	        				espacioDisponible =  espacioDisponible - 1;
	        	        				$('#espacioDisponibleLabel').text('Espacio disponible: '+espacioDisponible)
	        	        				refrescarInput();
	        	        			}
	        	        			
	        				  }, function (dismiss) {
	        	    			  // dismiss can be 'cancel', 'overlay',
	        	    			  // 'close', and 'timer'
	        	    			  
	        				  })
	        				
	        				
	        				
	        				
	        			}
	        			
				  }, function (dismiss) {
	    			  // dismiss can be 'cancel', 'overlay',
	    			  // 'close', and 'timer'
	    			  
				  })
				
			}
		}
	}else{
		swal('No hay mas espacios disponibles')
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
		}

	}, function (dismiss) {
	  // dismiss can be 'cancel', 'overlay',
	  // 'close', and 'timer'
	  
	})
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

				console.log(response);
				
				if(response.length!=0){
					
					let nombre = response[0].nombre;
    				let numeroDocumento = response[0].numeroDocumento;
    				let tipoDocumento = response[0].tipoDocumento;
    				let aPaterno = response[0].appPaterno;
    				let aMaterno = response[0].appMaterno;
    				let infraccion = response[0].descripcion;
    				let fechaInfraccion = response[0].fechaInfraccion;
    				let estado = response[0].estadoInfraccion;
    				
    				$('#tipoDocumento').text(tipoDocumento);
    				$('#numeroDocumentoInfractor').text(numeroDocumento);
    				$('#nombre').text(nombre+' '+aPaterno+' '+aMaterno);
    				$('#infraccion').text(infraccion);
    				$('#fechaInfraccion').text(fechaInfraccion);
    				$('#estado').text(estado);
    				
    				$('#detalleInfracciones').css('display', 'flex');
    				$('#numDocumentoInfractor').val('');
    				$('#numDocumentoInfractor').focus();
    				
    				for(i=0;i<response.length;i++){
    					let filaInfracciones='<div class="row"><div class="col-md-2"><label>'+response[i].fechaInfraccion+'</label></div><div class="col-md-6"><label>'+response[i].descripcion+'</label></div><div class="col-md-4"><label>'+response[i].estadoInfraccion+'</label></div></div>';
    					$('#for-iteraciones span:last').after(filaInfracciones);
    				}
    				
				}
				
				
				
			}
			
	  }, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay',
		  // 'close', and 'timer'
		  
	  })
}
