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

//Capturar el id de un button en el div con id for-each
$(document).ready(function(){
      $('body #for-each').on('click', 'button', function(){
        let idRecurso = $(this).attr('key');
        let numRecurso = $(this).attr('id');
        
        swal({
			title: "Solicitud de recurso "+numRecurso,
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "resources/images/nuevo_gif.gif",
		
		}).then(function (inputValue) {
			$.ajax({
                // la URL para la petición
                url : 'movimientoPrestamo',
                // la información a enviar
                // (también es posible utilizar una cadena de datos)
                data : 'idRecurso='+idRecurso+'&numDocumento='+inputValue,
                // especifica si será una petición POST o GET
                type : 'POST',
             
                // código a ejecutar si la petición es satisfactoria;
                // la respuesta es pasada como argumento a la función
                success : function(json) {
                    $('<h1/>').text(json.title).appendTo('body');
                    $('<div class="content"/>')
                        .html(json.html).appendTo('body');
                    swal('Peticion de recurso con exito');
                },
             
                // código a ejecutar si la petición falla;
                // son pasados como argumentos a la función
                // el objeto de la petición en crudo y código de estatus de la petición
                error : function(xhr, status) {
                    swal('Problemas con el servidor');
                },
                /*
                // código a ejecutar sin importar si la petición falló o no
                complete : function(xhr, status) {
                    alert('Petición realizada');
                }
                });*/

			}, function (dismiss) {
			  // dismiss can be 'cancel', 'overlay',
			  // 'close', and 'timer'
			  
			}

			)
      })
})

})