$(document).ready(function() {
	 
	var csrf = $('meta[name=_csrf]').attr("content");
	var $local = {
		$modalPoliticaSeguridad : $("#modalPoliticaSeguridad"),
		$tablaPoliticaSeguridad : $("#tablaPoliticaSeguridad"),
		tablaPoliticaSeguridad : "",
		$actualizarPoliticaModal : $("#actualizarPoliticaModal"),
		codigo_politicaSeleccionado : "",
		$titulo : $("#titulo"),
		$filaSeleccionada : "",
		arregloSiNo : [ "1", "0" ],
		filtrosSeleccionables : {},
	};
	
	$formPoliticaSeguridadModal = $("#formPoliticaSeguridadModal");

	$local.tablaPoliticaSeguridad = $local.$tablaPoliticaSeguridad.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "politica?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay POLITICAS DE SEGURIDAD registradas"
		},
		"initComplete" : function() {
			$local.$tablaPoliticaSeguridad.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ 
     	{
			"targets" : 1,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.complejidadContrasenia);
			}
		}, {
			"targets" : 4,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.autenticacionActiveDirectory);
			}
		}, {
			"targets" : 5,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar
		} ],
		"columns" : [ {
			"data" : 'numeroMaximoIntentos',
			"title" : 'Numero de Intentos'
		}, {
			"data" : null,
			"title" : 'Complejidad Contraseña'
		}, {
			"data" : 'cantidadDiasParaCaducidadContrasenia',
			"title" : 'Cantidad Dias'
		}, {
			"data" : 'longitudMinimaContrasenia',
			"title" : 'Longitud Minima'
		}, {
			"data" : null,
			"title" : 'Active Directory'
		}, {
			"title" : 'Accion'
		} ]
	});

	$local.$modalPoliticaSeguridad.PopupWindow({
		title : "Mantenimiento de Politicas de Seguridad",
		autoOpen : false,
		modal : false,
		height : 420,
		width : 640,
	});
	
	$local.$tablaPoliticaSeguridad.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formPoliticaSeguridadModal);
		$local.$filaSeleccionada = $(this).parents("tr");
		var politica = $local.tablaPoliticaSeguridad.row($local.$filaSeleccionada).data();
		$funcionUtil.llenarFormulario(politica, $formPoliticaSeguridadModal);
//		$("#compContrasenia option[value="+ politica.complejidadContrasenia +"]").attr("selected",true);
		$local.$actualizarPoliticaModal.removeClass("hidden");
		$local.$modalPoliticaSeguridad.PopupWindow("open");
	});
	
	
	$local.$actualizarPoliticaModal.on("click", function() {
		if (!$formPoliticaSeguridadModal.valid()) {
			return;
		}
		var politica = $formPoliticaSeguridadModal.serializeJSON();
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "politica",
			data : JSON.stringify(politica),
			beforeSend : function(xhr) {
				$local.$actualizarPoliticaModal.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formPoliticaSeguridadModal);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formPoliticaSeguridadModal);
				}
			},
			success : function(politica) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaPoliticaSeguridad.row($local.$filaSeleccionada).remove().draw(false);
				var politica = politica[0];
				var row = $local.tablaPoliticaSeguridad.row.add({
					"numeroMaximoIntentos" : politica.numeroMaximoIntentos,
					"complejidadContrasenia" : politica.complejidadContrasenia,
					"cantidadDiasParaCaducidadContrasenia" : politica.cantidadDiasParaCaducidadContrasenia,
					"longitudMinimaContrasenia" : politica.longitudMinimaContrasenia,
					"autenticacionActiveDirectory" : politica.autenticacionActiveDirectory
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalPoliticaSeguridad.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarPoliticaModal.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
});
