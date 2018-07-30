$(document).ready(function() {
	
	var csrf = $('meta[name=_csrf]').attr("content");
	
	var $local = {
			$modalPerfil : $("#modalPerfil"),
			$registrarPerfil : $("#registrarPerfil"),
			$actualizarPerfilModal : $("#actualizarPerfilModal"),
			$tablaPerfiles : $("#tablaPerfiles"),
			tablaPerfiles : "",
			codigo_perfilSeleccionado : "",
			$filaSeleccionada : "",		
		};
	
	$formPerfil = $("#formPerfil");
	$formPerfilModal = $("#formPerfilModal");
	
	$local.tablaPerfiles = $local.$tablaPerfiles.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "perfil?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Perfiles registrados"
		},
		"initComplete": function(){
			$local.$tablaPerfiles.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}, {
			"targets" : 2,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [
				{
					"data" : 'idPerfil',
					"title" : 'Perfil'
				},
				{
					"data" : 'descripcion',
					"title" : 'Descripcion'
				},
				{
					"title" :'Accion'
				}]
	});
	
	$local.$modalPerfil.PopupWindow({
		title : "Mantenimiento de Perfil",
		autoOpen : false,
		modal : false,
		height : 280,
		width : 626,
	});
	
	
	$local.$registrarPerfil.on("click", function() {
		if (!$formPerfil.valid()) {
			return;
		}
		var perfil = $formPerfil.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "perfil",
			data : JSON.stringify(perfil),
			beforeSend : function(xhr) {
				$local.$registrarPerfil.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formPerfil);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formPerfil);
				}
			},
			success : function(perfiles) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var perfil = perfiles[0];
				var row = $local.tablaPerfiles.row.add({
					"idPerfil" : perfil.idPerfil,
					"descripcion" : perfil.descripcion
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();

			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarPerfil.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		$formPerfil[0].reset();
	});
	
	$local.$tablaPerfiles.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formPerfil);
		$local.$filaSeleccionada = $(this).parents("tr");
		var perfil = $local.tablaPerfiles.row($local.$filaSeleccionada).data();
		$local.codigo_perfilSeleccionado = perfil.idPerfil;
		$funcionUtil.llenarFormulario(perfil, $formPerfilModal);
		$local.$actualizarPerfilModal.removeClass("hidden");
		$local.$modalPerfil.PopupWindow("open");
	});
	
	$local.$actualizarPerfilModal.on("click", function() {
		if (!$formPerfilModal.valid()) {
			return;
		}
		var perfil = $formPerfilModal.serializeJSON();
		console.log("PERFILES : "+perfil)
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "perfil",
			data : JSON.stringify(perfil),
			beforeSend : function(xhr) {
				$local.$actualizarPerfilModal.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formPerfilModal);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formPerfilModal);
				}
			},
			success : function(perfiles) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaPerfiles.row($local.$filaSeleccionada).remove().draw(false);
				var perfil = perfiles[0];
				var row = $local.tablaPerfiles.row.add({
					"idPerfil" : perfil.idPerfil,
					"descripcion" : perfil.descripcion
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalPerfil.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarPerfilModal.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$tablaPerfiles.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var perfil = $local.tablaPerfiles.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar el Perfil <b>'" + perfil.idPerfil + " - " + perfil.descripcion + "'<b/>?",
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
									url : $variableUtil.root + "perfil",
									data : JSON.stringify(perfil),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaPerfiles.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("El Perfil <b>" + perfil.idPerfil + " - " + perfil.descripcion + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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