var espacioDisponible;
var recurso;

$(document).ready(function(){

	$('#salida').click(function () {
		swal("Registrar salida",{
			title: "Registrar salida",
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "/siscae/resources/images/lectora.gif",
		}).then(function (inputValue) {
			
			
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
			  
			}

			)
      })

		
	})
	
     $('body #for-each').on('click', 'button', function(){
	        let idRecurso = $(this).attr('key');
	        let numRecurso = $(this).attr('id');
	        	
	        	swal({
	    			title: "Solicitud de recurso "+numRecurso,
	    			text: "Ingrese su carnet de biblioteca por el scanner",
	    			content: "input",
	    			icon: "/siscae/resources/images/lectora.gif",
	    		
	    		}).then(function (inputValue) {
	    			
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
	    			  
	    			})
	          })
      })

      
      
      $("#desocupar").click(function(){
    		swal({
    			  title: "¿Estas segur@?",
    			  text: "Desocupara todo el area de estudio automaticamente",
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
	
	$('body #for-each-grupales').on('click', 'button', function(){
		
		recurso = $(this).attr('key');
        let numRecurso = $(this).attr('id');
        let cantidadPrestamos = $(this).attr('prestado');
        let maxCapacidad = $(this).attr('max');
        espacioDisponible =  parseInt(maxCapacidad) - parseInt(cantidadPrestamos);
		$('#infoRecurso').text('Solicititud de recurso '+Recurso)
		$('#espacioDisponibleLabel').text('Espacio disponible: '+espacioDisponible)

		
	})
	
	$('#agregarTablaGrupal').on('click', function (event){
		enviarDatosATabla();
	})
	
	
	$('#cerrarModal').on('click', function (event){
		location.reload()
	})
	
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
	})
	
      
})


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
