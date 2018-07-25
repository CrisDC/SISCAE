$(document).ready(function() {
	var csrf = $('meta[name=_csrf]').attr("content");
	var $local = {
			$modalContrasenia : $("#modalContrasenia"),
			$actualizarContrasenia : $("#actualizarContrasenia"),
			$myModal : $("#myModal"),
			$contrasenia : $("#contrasenia"),
			codigo_contraseniaSeleccionado : "",
			$filaSeleccionada : "",
			requiereCambio : false,
			$idUsuario : $("#idUsuario")
		};
	
	$formContrasenia = $("#formContrasenia");
	$local.$idUsuario.hide();
	var nDias = $("#message").text();
	$("#message").hide();
	console.log("CANTIDAD DIAS : "+nDias);
	if(nDias ==  25) //faltando 5 dias
		$funcionUtil.notificarException($variableUtil.cambioContrasenia, "fa-check", "Aviso", "warning");
	if(nDias ==  29) //faltando 1 dia
		$("#myModal").modal("show");
	
	$local.$actualizarContrasenia.on("click", function() {

		var contrasenia = $formContrasenia.serializeJSON();
		console.log("OBJETO : "+contrasenia);
		console.log("OBJETO : "+contrasenia.password);
		contrasenia.requiereCambio = true;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "contrasenia",
			data : JSON.stringify(contrasenia),
			beforeSend : function(xhr) {
				$local.$actualizarContrasenia.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formContrasenia);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formContrasenia);
				}
			},
			success : function(contrasenias) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$funcionUtil.prepararFormularioRegistro($formContrasenia)
				$local.$myModal.modal('hide');
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarContrasenia.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
//		

	});
});