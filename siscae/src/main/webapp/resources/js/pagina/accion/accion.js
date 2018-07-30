$(document).ready(function() {
	
	var csrf = $('meta[name=_csrf]').attr("content");
	
	var $local = {
			$modalAccion : $("#modalAccion"),
			$registrarAccion : $("#registrarAccion"),
			$actualizarAccionModal : $("#actualizarAccionModal"),
			$tablaAccion : $("#tablaAccion"),
			tablaAccion : "",
			codigo_perfilSeleccionado : "",
			$filaSeleccionada : "",		
		};
	
	$formAccion = $("#formAccion");
	$formAccionModal = $("#formAccionModal");
	
	$local.tablaAccion = $local.$tablaAccion.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "acciones?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Acciones registrados"
		},
		"initComplete": function(){
			$local.$tablaAccion.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}, {
			"targets" : 2,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar
		} ],
		"columns" : [
				{
					"data" : 'idAccion',
					"title" : 'Código Acción'
				},
				{
					"data" : 'accion',
					"title" : 'Descripción'
				},
				{
					"title" :'Accion'
				}]
	});
	
	$local.$modalAccion.PopupWindow({
		title : "Mantenimiento de Acciones",
		autoOpen : false,
		modal : false,
		height : 280,
		width : 626,
	});
	
	
	$local.$registrarAccion.on("click", function() {
		if (!$formAccion.valid()) {
			return;
		}
		var accion = $formAccion.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "acciones",
			data : JSON.stringify(accion),
			beforeSend : function(xhr) {
				$local.$registrarAccion.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formAccion);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formAccion);
				}
			},
			success : function(acciones) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var accion = acciones[0];
				var row = $local.tablaAccion.row.add({
					"idAccion" : accion.idAccion,
					"accion" : accion.accion
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();

			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarAccion.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		$formAccion[0].reset();
	});
	
	$local.$tablaAccion.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formAccion);
		$local.$filaSeleccionada = $(this).parents("tr");
		var accion = $local.tablaAccion.row($local.$filaSeleccionada).data();
		$local.codigo_perfilSeleccionado = accion.idAccion;
		$funcionUtil.llenarFormulario(accion, $formAccionModal);
		$local.$actualizarAccionModal.removeClass("hidden");
		$local.$modalAccion.PopupWindow("open");
	});
	
	$local.$actualizarAccionModal.on("click", function() {
		if (!$formAccionModal.valid()) {
			return;
		}
		var accion = $formAccionModal.serializeJSON();
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "acciones",
			data : JSON.stringify(accion),
			beforeSend : function(xhr) {
				$local.$actualizarAccionModal.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formAccionModal);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formAccionModal);
				}
			},
			success : function(acciones) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaAccion.row($local.$filaSeleccionada).remove().draw(false);
				var accion = acciones[0];
				var row = $local.tablaAccion.row.add({
					"idAccion" : accion.idAccion,
					"accion" : accion.accion
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalAccion.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarAccionModal.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$tablaAccion.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var accion = $local.tablaAccion.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la Acción <b>'" + accion.idAccion + " - " + accion.accion + "'<b/>?",
			buttons : {
				Aceptar : {
					action : function() {
						var confirmar = $.confirm({
							icon : 'fa fa-spinner fa-pulse fa-fw',
							title : "Eliminando...",
							content : function() {
								var self = this;
								self.buttons.close.hide();
								$.ajax({
									type : "DELETE",
									url : $variableUtil.root + "acciones",
									data : JSON.stringify(accion),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaAccion.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("La Acción <b>" + accion.idAccion + " - " + accion.accion + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
										$funcionUtil.notificarException(mensaje, "fa-warning", "Aviso", "warning");
										break;
									}
								});
							},
							buttons : {
								close : {
									text : 'Aceptar'
								}
							}
						});
					},
					keys : [ 'enter' ],
					btnClass : "btn-primary"
				},
				Cancelar : {
					keys : [ 'esc' ]
				},
			}
		});
	});

	
});