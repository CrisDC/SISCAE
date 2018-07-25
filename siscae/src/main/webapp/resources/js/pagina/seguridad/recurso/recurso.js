$(document).ready(function() {
	var csrf = $('meta[name=_csrf]').attr("content");
	var $local = {
			$modalRecurso : $("#modalRecurso"),
			$registrarRecurso : $("#registrarRecurso"),
			$actualizarRecursoModal : $("#actualizarRecursoModal"),
			$tablaRecursos : $("#tablaRecursos"),
			tablaRecursos : "",
			codigo_recursoSeleccionado : "",
			$filaSeleccionada : "",		

		};
	
	$formRecurso = $("#formRecurso");
	$formRecursoModal = $("#formRecursoModal");
	
	$local.tablaRecursos = $local.$tablaRecursos.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "recurso?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Recursos registradas"
		},
		"initComplete" : function() {
			$local.$tablaRecursos.wrap("<div class='table-responsive'></div>");

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
					"data" : 'idRecurso',
					"title" : 'Recurso'
				},
				{
					"data" : 'descripcion',
					"title" : 'Descripcion'
				},
				{
					"title" :'Accion'
				}]
	});
	
	$local.$modalRecurso.PopupWindow({
		title : "Mantenimiento de Recurso",
		autoOpen : false,
		modal : false,
		height : 280,
		width : 626,
	});
	
	$local.$registrarRecurso.on("click", function() {
		if (!$formRecurso.valid()) {
			return;
		}
		var recurso = $formRecurso.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "recurso",
			data : JSON.stringify(recurso),
			beforeSend : function(xhr) {
				$local.$registrarRecurso.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formRecurso);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formRecurso);
				}
			},
			success : function(recursos) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				
				var recurso = recursos[0];
				var row = $local.tablaRecursos.row.add({
					"idRecurso" : recurso.idRecurso,
					"descripcion" : recurso.descripcion
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();

			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarRecurso.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		$formRecurso[0].reset();
	});
	
	$local.$tablaRecursos.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formRecurso);
		$local.$filaSeleccionada = $(this).parents("tr");
		var recurso = $local.tablaRecursos.row($local.$filaSeleccionada).data();
		$local.codigo_recursoSeleccionado = recurso.idRecurso;
		$funcionUtil.llenarFormulario(recurso, $formRecursoModal);

		$local.$actualizarRecursoModal.removeClass("hidden");

		$local.$modalRecurso.PopupWindow("open");
	});
	
	$local.$actualizarRecursoModal.on("click", function() {
		if (!$formRecursoModal.valid()) {
			return;
		}
		var recurso = $formRecursoModal.serializeJSON();
        console.log("TODO RECURSO : "+recurso);
        console.log("SOLO ID RECURSO : "+recurso.idRecurso);
        console.log("SOLO DESCRIPCION RECURSO : "+recurso.descripcion);
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "recurso",
			data : JSON.stringify(recurso),
			beforeSend : function(xhr) {
				$local.$actualizarRecursoModal.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formRecursoModal);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formRecursoModal);
				}
			},
			success : function(recursos) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaRecursos.row($local.$filaSeleccionada).remove().draw(false);
				var recurso = recursos[0];
				var row = $local.tablaRecursos.row.add({
					"idRecurso" : recurso.idRecurso,
					"descripcion" : recurso.descripcion
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalRecurso.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarRecursoModal.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$tablaRecursos.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var recurso = $local.tablaRecursos.row($local.$filaSeleccionada).data();
		console.log("var 1 : "+recurso)
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar el Recurso <b>'" + recurso.idRecurso + " - " + recurso.descripcion + "'<b/>?",
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
									url : $variableUtil.root + "recurso",
									data : JSON.stringify(recurso),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaRecursos.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("El Recurso <b>" + recurso.idRecurso + " - " + recurso.descripcion + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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