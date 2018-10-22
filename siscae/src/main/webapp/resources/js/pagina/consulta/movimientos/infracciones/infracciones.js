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
      				},
      				500 : function(response) {
      					swal("Error", response.responseText, "warning");
      				}
    			},
    			success : function(response) {
    				
	    			swal({
  					  title: "Operacion realizada con exito",
  					  text: "Infraccion aplicada",
  					  icon: "success",
  					  button: false,
  					  timer: 1000,
	  				}).then((value) => {
	  					location.reload();
	  				});
	    				
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
	
	

});