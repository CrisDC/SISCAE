$(document).ready(function() {
	var $local = {
		$tablaMantenimiento : $("#tablaMantenimiento"),
		tablaMantenimiento : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$aniadirMantenimento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$filaSeleccionada : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		idUbicacionSeleccionado : ""
	}
	$formMantenimiento = $("#formMantenimiento");

	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaMantenimiento.clear().draw();
			break;
		}
	});
	$local.tablaMantenimiento = $local.$tablaMantenimiento.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "ubicacion?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay ubicaciones registradas"
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}, {
			"targets" : [ 2, 3 ],
			"className" : "filtrable",
		}, {
			"targets" : 4,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [ {
			"data" : 'idUbicacion',
			"title" : "Id"
		}, {
			"data" : 'coordenadaX',
			"title" : "Coordenada X"
		}, {
			"data" : 'coordenadaY',
			"title" : "Coordenada Y"
		},{
			"data" : null,
			"title" : 'Acción'
		} ]
	});
	$local.$tablaMantenimiento.find("thead").on('keyup', 'input', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$local.$modalMantenimiento.PopupWindow({
		title : "Mantenimiento de Ubicacion",
		autoOpen : false,
		modal : false,
		height : 400,
		width : 626,
	});

	$local.$aniadirMantenimento.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formMantenimiento);
		$local.$actualizarMantenimiento.addClass("hidden");
		$local.$registrarMantenimiento.removeClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
	});

	$local.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:not([disabled]):first").focus();
	});

	$local.$modalMantenimiento.on("close.popupwindow", function() {
		$local.idUbicacionSeleccionado = "";
	});
	$formMantenimiento.find("input").keypress(function(event) {
		if (event.which == 13) {
			if (!$local.$registrarMantenimiento.hasClass("hidden")) {
				$local.$registrarMantenimiento.trigger("click");
				return false;
			} else {
				if (!$local.$actualizarMantenimiento.hasClass("hidden")) {
					$local.$actualizarMantenimiento.trigger("click");
				}
				return false;
			}
		}
	});
	$local.$registrarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var ubicacion = $formMantenimiento.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "ubicacion",
			data : JSON.stringify(ubicacion),
			beforeSend : function(xhr) {
				$local.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				var row = $local.tablaMantenimiento.row.add(ubicacion).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalMantenimiento.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarMantenimiento.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		$local.$tablaMantenimiento.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formMantenimiento);
		$local.$filaSeleccionada = $(this).parents("tr");
		var ubicacion = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$local.idUbicacionSeleccionado = ubicacion.idUbicacion;
		$funcionUtil.llenarFormulario(ubicacion, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
	});
	});
	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var ubicacion = $formMantenimiento.serializeJSON();
		ubicacion.idUbicacion = $local.idUbicacionSeleccionado;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "ubicacion",
			data : JSON.stringify(ubicacion),
			beforeSend : function(xhr) {
				$local.$actualizarMantenimiento.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
				var row = $local.tablaMantenimiento.row.add(ubicacion).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalMantenimiento.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarMantenimiento.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	$local.$tablaMantenimiento.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var ubicacion = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la ubicacion <b>'" + ubicacion.idUbicacion + "'<b/>?",
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
									url : $variableUtil.root + "ubicacion",
									data : JSON.stringify(ubicacion),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("La ubicacion <b>" + ubicacion.idUbicacion  + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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



