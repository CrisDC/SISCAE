//Capturar el id de un button en el div con id for-each
$(document).ready(function(){

	
	$('#salida').click(function () {
		swal("Registrar salida",{
			title: "Registrar salida",
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "resources/images/nuevo_gif.gif",
		});
		$.get('/prestamo', { userId : 1234 }, function(resp) {
			console.log(resp);
		});
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
    				swal('Peticion realizada con exito');
    			},
    			error : function(response) {
    				swal('Problemas con el servidor');
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