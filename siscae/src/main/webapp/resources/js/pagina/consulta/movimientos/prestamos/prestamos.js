// Capturar el id de un button en el div con id for-each
$(document).ready(function(){

	
	$('#salida').click(function () {
		swal("Registrar salida",{
			title: "Registrar salida",
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "resources/images/nuevo_gif.gif",
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
        swal({
			title: "Solicitud de recurso "+numRecurso,
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "resources/images/nuevo_gif.gif",
		
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
    				}
    			},
    			success : function(response) {
    				swal("Peticion realizada con exito", "Usted esta prestando el recurso "+numRecurso, "success");
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

})