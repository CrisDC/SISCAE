$(document).ready(function() {
	var csrf = $('meta[name=_csrf]').attr("content");
	var $local = {
			$modalUsuario : $("#modalUsuario"),
			$registrarUsuario : $("#registrarUsuario"),
			$actualizarUsuarioModal : $("#actualizarUsuarioModal"),
			$tablaUsuarios : $("#tablaUsuarios"),
			tablaUsuarios : "",
			codigo_usuarioSeleccionado : "",
			$filaSeleccionada : "",		
			arregloSiNo : [ "1", "0" ],
			filtrosSeleccionables : {},

			$repetirContrasenia : $("#repetirContrasenia"),
			requiereCambio : false,
			$boton : $("#boton"),
			$txtPassword : $("#txtPassword")
		};
	
	$formUsuario = $("#formUsuario");
	$formUsuarioModal = $("#formUsuarioModal");
	$local.$repetirContrasenia.hide();
	
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaUsuarios.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaUsuarios.clear().draw();
			$funcionUtil.notificarException(xhr.responseText, "Error Interno", "danger");
			break;
		}
	});
	
	$local.tablaUsuarios = $local.$tablaUsuarios.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "usuario?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay USUARIOS registradas"
		},
		"initComplete" : function() {
			$local.$tablaUsuarios.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["3"] = $local.arregloSiNo;
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaUsuarios, $local.filtrosSeleccionables);

		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}, {
			"targets" : 2,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.activo);
			}
		}, {
			"targets" : 3,
			"className" : "all dt-center",

			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [
				{
					"data" : 'idUsuario',
					"title" : 'Usuario'
				},
				{
					"data" : 'idPerfil',
					"title" : 'Perfil'
				},
				{
					"data" : null,
					"title" : 'Activo'
				},
				{
					"title" :'Accion'
				}]
	});
	
	$local.$tablaUsuarios.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaUsuarios.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	$local.$tablaUsuarios.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaUsuarios.column($(this).parent().index() + ':visible').search(this.value).draw();
	});
	
	$local.$modalUsuario.PopupWindow({
		title : "Mantenimiento de Usuario",
		autoOpen : false,
		modal : false,
		height : 410,
		width : 626,
	});
	
	$local.$boton.on("click", function() {

		$local.$txtPassword.attr("readonly", false);
		$local.$txtPassword.val("");
		$local.requiereCambio = true;
		$local.$repetirContrasenia.show();
	});
	
	

	$local.$registrarUsuario.on("click", function() {

		var usuario = $formUsuario.serializeJSON();
		usuario.requiereCambio = true;
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "usuario",
			data : JSON.stringify(usuario),
			beforeSend : function(xhr) {
				$local.$registrarUsuario.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formUsuario);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formUsuario);
				}
			},
			success : function(usuarios) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var usuario = usuarios[0];
				var row = $local.tablaUsuarios.row.add({
					"idUsuario" : usuario.idUsuario,
					"idPerfil" : usuario.idPerfil,
					"activo" : usuario.activo
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$funcionUtil.prepararFormularioRegistro($formUsuario)

			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarUsuario.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});

	});
	
	$local.$tablaUsuarios.children("tbody").on("click", ".actualizar", function() {
		$local.$repetirContrasenia.hide();
		$funcionUtil.prepararFormularioActualizacion($formUsuarioModal);
		$local.$filaSeleccionada = $(this).parents("tr");
		var usuario = $local.tablaUsuarios.row($local.$filaSeleccionada).data();
		$local.codigo_usuarioSeleccionado = usuario.idUsuario;
		$funcionUtil.llenarFormulario(usuario, $formUsuarioModal);
		$local.$txtPassword.attr("readonly", true);
		$local.requiereCambio = false;
		$local.$txtPassword.val("12345678");

		$local.$actualizarUsuarioModal.removeClass("hidden");

		$local.$modalUsuario.PopupWindow("open");
	});
	
	$local.$actualizarUsuarioModal.on("click", function() {

		var usuario = $formUsuarioModal.serializeJSON();
		usuario.requiereCambio = $local.requiereCambio;
		console.log("cambio usuario : "+usuario);

		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "usuario",
			data : JSON.stringify(usuario),
			beforeSend : function(xhr) {
				$local.$actualizarUsuarioModal.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formUsuarioModal);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formUsuarioModal);
				}
			},
			success : function(usuarios) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaUsuarios.row($local.$filaSeleccionada).remove().draw(false);
				var usuario = usuarios[0];
				var row = $local.tablaUsuarios.row.add({
					"idUsuario" : usuario.idUsuario,
					"idPerfil" : usuario.idPerfil,
					"activo" : usuario.activo
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$funcionUtil.prepararFormularioRegistro($formUsuarioModal)
				$local.$modalUsuario.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarUsuarioModal.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$tablaUsuarios.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var usuario = $local.tablaUsuarios.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar el Usuario <b>'" + usuario.idUsuario + "'<b/>?",
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
									url : $variableUtil.root + "usuario",
									data : JSON.stringify(usuario),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaUsuarios.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("El Usuario <b>" + usuario.idUsuario + " - " + usuario.password + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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