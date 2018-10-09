// Capturar el id de un button en el div con id for-each
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
    			success : function(response) {
    				swal("Registro de salida", "Usted marco su salida con exito", "success");
    				location.reload();
    			},
    			error : function(response) {
    				swal("Error", "Ha ocurrido un problema con el servidor", "warning");
    			},
    			complete : function(response) {
    				
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
	        let esGrupal = $(this).attr('grupal');
	        
	        
	        if(esGrupal == 'no'){
	        	
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
	        					console.log(response.responseJSON);
	        				}
	        			},
	        			success : function(response) {
	        				swal("Peticion realizada con exito", "Usted esta prestando el recurso "+numRecurso, "success");
	        				location.reload();
	        			},
	        			error : function(response) {
	        				swal("Error", "Ha ocurrido un problema con el servidor "+response, "warning");
	        				
	        			},
	        			complete : function(response) {
	        				
	        			}

	    			}, function (dismiss) {
	    			  // dismiss can be 'cancel', 'overlay',
	    			  // 'close', and 'timer'
	    			  
	    			}

	    			)
	          })
	        
	        }else{
	        	
	        	$('#infoRecurso').text('Solcititud de recurso '+numRecurso);
	        	// Forzar el abrir el modal
	        	$('#modalPrestamoRecurso').modal('show'); 
	        	$('#modalPrestamoRecurso').modal();
	        	
	        	
	        }
        
      })

})


$("#cerrarModal").click(function(){
	$("#cerrarModal .close").click();
});