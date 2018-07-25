$(document).ready(function() {

	var $local = {
		$tablaMantenimiento : $("#tablaMantenimiento"),
		tablaMantenimiento : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$aniadirMantenimento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$filaSeleccionada : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		$claseTransacciones : $("#claseTransacciones"),
		codigoTransaccionSeleccionado : 0,
		codigoClaseTransaccionSeleccionado : 0,
		$claseTransaccionesFiltroParaTableMantenimiento : $("#claseTransacciones-filtroParaTablaMantenimiento"),
		filtrosSeleccionables : {},
		arregloSiNo : [ "1", "0" ]
	};

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
			"url" : $variableUtil.root + "codigoTransaccion?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Códigos de Transacción registrados"
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$claseTransaccionesFiltroParaTableMantenimiento.html();
			$local.filtrosSeleccionables["3"] = $local.arregloSiNo;
			$local.filtrosSeleccionables["4"] = $local.arregloSiNo;
			$local.filtrosSeleccionables["5"] = $local.arregloSiNo;
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 1, 2 ],
			"className" : "all filtrable",
		}, {
			"targets" : 3,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.transaccionMiscelanea);
			}
		}, {
			"targets" : 4,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.compensaFondos);
			}
		}, {
			"targets" : 5,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.compensaComisiones);
			}
		}, {
			"targets" : 6,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [ {
			"className" : "all seleccionable select2 insertable-opciones-html",
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoClaseTransaccion, row.descripcionClaseTransaccion);
			},
			"title" : "Clase de Transacción"
		}, {
			"data" : 'codigoTransaccion',
			"title" : "Código de Transacción"
		}, {
			"data" : 'descripcion',
			"title" : "Descripción de Código de Transacción"
		}, {
			"data" : null,
			"title" : "Transacción Miscelánea"
		}, {
			"data" : null,
			"title" : "Compensa Fondos"
		}, {
			"data" : null,
			"title" : "Compensa Comisiones"
		}, {
			"data" : null,
			"title" : 'Acción'
		} ]
	});

	$local.$tablaMantenimiento.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$funcionUtil.crearSelect2($local.$claseTransacciones, "Seleccione una Clase de Transacción");

	$local.$modalMantenimiento.PopupWindow({
		title : "Mantenimiento de Código de Transacción",
		autoOpen : false,
		modal : false,
		height : 370,
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
		$local.$filaSeleccionada = "";
		$local.codigoClaseTransaccionSeleccionado = 0;
		$local.codigoTransaccionSeleccionado = 0;
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
		var codigoTransaccion = $formMantenimiento.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "codigoTransaccion",
			data : JSON.stringify(codigoTransaccion),
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
			success : function(codigoTransacciones) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var codigoTransaccion = codigoTransacciones[0]
				var row = $local.tablaMantenimiento.row.add(codigoTransaccion).draw();
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
	});

	$local.$tablaMantenimiento.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formMantenimiento);
		$local.$filaSeleccionada = $(this).parents("tr");
		var codigoTransaccion = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$local.codigoTransaccionSeleccionado = codigoTransaccion.codigoTransaccion;
		$local.codigoClaseTransaccionSeleccionado = codigoTransaccion.codigoClaseTransaccion;
		$funcionUtil.llenarFormulario(codigoTransaccion, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
	});

	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var codigoTransaccion = $formMantenimiento.serializeJSON();
		codigoTransaccion.codigoTransaccion = $local.codigoTransaccionSeleccionado;
		codigoTransaccion.codigoClaseTransaccion = $local.codigoClaseTransaccionSeleccionado;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "codigoTransaccion",
			data : JSON.stringify(codigoTransaccion),
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
			success : function(codigoTransacciones) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
				var codigoTransaccion = codigoTransacciones[0]
				var row = $local.tablaMantenimiento.row.add(codigoTransaccion).draw();
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
		var codigoTransaccion = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar el C&oacute;digo de Transacci&oacute;n <b>'" + codigoTransaccion.codigoTransaccion + " - " + codigoTransaccion.descripcion + "'<b/>?",
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
									url : $variableUtil.root + "codigoTransaccion",
									data : JSON.stringify(codigoTransaccion),
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
										var mensaje = $funcionUtil.obtenerMensajeError("El Código de Transacci&oacute;n <b>" + codigoTransaccion.codigoTransaccion + " - " + codigoTransaccion.descripcion + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
										$funcionUtil.notificarException(mensaje, "fa-warning", "Aviso", "warning");
										break
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