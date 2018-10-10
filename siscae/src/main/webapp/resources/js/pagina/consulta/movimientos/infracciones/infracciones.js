$(document).ready(function() {
	
	$('#infraccionModal').on('show.bs.modal', function (event){
		var button = $(event.relatedTarget)
		var numDoc = button.data('doc')
		var codigo = button.data('codigo')
		var nombre = button.data('nombre')
		var apellidos = button.data('apellidos')
		
		var modal = $(this)
		
		modal.find('#codigoAlumno').text(codigo)
		modal.find('#nombreAlumno').text(nombre)
		modal.find('#apellidosAlumno').text(apellidos)
		modal.find('#numDoc').text(numDoc)
		
		$('#btnRegistrar').on('click', function (event){
			
			var combo = document.getElementById("tipoInfraccion")
			var txtArea = $('#inputDescripcionInfraccion')
			
			var idItem = combo.value
			var descripcion = txtArea.val()
			
			var movimientoInfraccion = {
				"numDocumento" : numDoc,
				"idTipoInfraccion" : idItem,
				"descripcion" : descripcion
			};
			
			
			$.ajax({
				url :  $variableUtil.root + "movimientoInfraccion",
                type : 'POST',
                data : JSON.stringify(movimientoInfraccion),
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
    				swal("Operacion realizada con exito", "Infraccion registrada con exito");
    				location.reload();
    			},
    			error : function(response) {
    				swal("Error", "Ha ocurrido un problema con el servidor", "warning"); 
    			},
    			complete : function(response) {
    				
    			}
			});
			
			
		})
		
		$('#btnClose').on('click', function (event){
			location.reload()
		})
		
	})
	
	
	/*
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
	*/
});