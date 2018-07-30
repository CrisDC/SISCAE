$(document).ready(function() {

	var $local = {

		$tablaMantenimiento : $("#tablaMantenimiento"),
		tablaMantenimiento : "",
		$tablaSubBinesAsociados : $("#tablaSubBinesAsociados"),
		tablaSubBinesAsociados : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$formularioAdicionalMantenimiento : $("#formularioAdicionalMantenimiento"),
		$aniadirMantenimento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		$botonesActualizacion : $("#botonesActualizacion"),
		$filaSeleccionada : "",
		idClienteSeleccionado : "",
		idEmpresaSeleccionado : "",
		codigoBINSeleccionado : "",
		codigoSubBINSeleccionado : "",

		$empresas : $("#empresas"),
		$instituciones : $("#instituciones"),
		$bines : $("#bines"),
		$subBines : $("#subBines"),
		$empresasFiltroParaTablaMantenimiento : $("#empresas-filtroParaTablaMantenimiento"),
		filtrosSeleccionables : [],

		$asociarSubBin : $("#asociarSubBin"),
		$actualizarAsociacionSubBin : $("#actualizarAsociacionSubBin"),
		$cancelarActualizacionAsociacionSubBin : $("#cancelarActualizacionAsociacionSubBin"),
		$filaSeleccionadaTablaSubBinesAsociados : ""
	};

	$formMantenimiento = $("#formMantenimiento");
	$formAsociacionSubBin = $("#formAsociacionSubBin");

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

	$funcionUtil.crearSelect2($local.$empresas, "Seleccione una empresa");
	$funcionUtil.crearSelect2($local.$bines, "Seleccione un BIN");
	$funcionUtil.crearSelect2($local.$subBines, "Seleccione un SubBIN");

	$local.$bines.on("change", function(event, opcionSeleccionada) {
		var codigoBIN = $(this).val();
		if (codigoBIN == null || codigoBIN == undefined) {
			$local.$subBines.find("option:not(:eq(0))").remove();
			return;
		}
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "subBin/bin/" + codigoBIN,
			beforeSend : function(xhr) {
				$local.$subBines.find("option:not(:eq(0))").remove();
				$local.$subBines.parent().append("<span class='help-block cargando'><i class='fa fa-spinner fa-pulse fa-fw'></i> Cargando SubBINES</span>")
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formAsociacionSubBin);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formAsociacionSubBin);
				}
			},
			success : function(subBines) {
				$.each(subBines, function(i, subBin) {
					$local.$subBines.append($("<option />").val(this.codigoSubBIN).text(this.codigoSubBIN + " - " + this.descripcion));
				});
				if (opcionSeleccionada != null && opcionSeleccionada != undefined) {
					$local.$subBines.val(opcionSeleccionada).trigger("change.select2");
				}
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$subBines.parent().find(".cargando").remove();
			}
		});
	});

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
			"url" : $variableUtil.root + "cliente?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay clientes registradas"
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$empresasFiltroParaTablaMantenimiento.html();
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 1, 2 ],
			"className" : "all filtrable",
		}, {
			"targets" : 3,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [ {
			"className" : "all seleccionable select2 insertable-opciones-html",
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idEmpresa, row.descripcionEmpresa);
			},
			"title" : "Empresa"
		}, {
			"data" : 'idCliente',
			"title" : "Código de cliente"
		}, {
			"data" : 'descripcion',
			"title" : "Descripción de cliente"
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

	$local.$modalMantenimiento.PopupWindow({
		title : "Mantenimiento de Cliente",
		autoOpen : false,
		modal : false,
		height : 321,
		width : 516,
	});

	$local.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:not([disabled]):first").focus();
	});

	$local.$modalMantenimiento.on("close.popupwindow", function() {
		$local.idClienteSeleccionado = "";
		$local.idEmpresaSeleccionado = "";
		$local.$filaSeleccionada = "";
		$local.$filaSeleccionadaTablaSubBinesAsociados = "";
		$local.$formularioAdicionalMantenimiento.addClass("hidden");
		$local.$cancelarActualizacionAsociacionSubBin.trigger("click");
	});

	$local.$aniadirMantenimento.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formMantenimiento);
		$local.$actualizarMantenimiento.addClass("hidden");
		$local.$registrarMantenimiento.removeClass("hidden");
		$local.$formularioAdicionalMantenimiento.addClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
	});

	$local.tablaSubBinesAsociados = $local.$tablaSubBinesAsociados.DataTable({
		"lengthChange" : false,
		"pageLength" : 4,
		"language" : {
			"emptyTable" : "No hay BIN/SubBINES asociados"
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2 ],
			"className" : "all",
		}, {
			"targets" : 3,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [ {
			"data" : 'codigoBIN',
			"title" : "BIN"
		}, {
			"data" : 'codigoSubBIN',
			"title" : "SubBIN"
		}, {
			"data" : 'descripcion',
			"title" : "Descripción"
		}, {
			"data" : null,
			"title" : 'Acción'
		} ]
	});

	$local.$tablaSubBinesAsociados.wrap("<div class='table-responsive'></div>");

	$local.$registrarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var cliente = $formMantenimiento.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "cliente",
			data : JSON.stringify(cliente),
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
			success : function(clientes) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var cliente = clientes[0];
				var row = $local.tablaMantenimiento.row.add(cliente).draw();
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
		$funcionUtil.prepararFormularioRegistro($formAsociacionSubBin);
		$local.$filaSeleccionada = $(this).parents("tr");
		var cliente = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$local.idClienteSeleccionado = cliente.idCliente;
		$local.idEmpresaSeleccionado = cliente.idEmpresa;
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "cliente/" + $local.idClienteSeleccionado + "/subBin",
			beforeSend : function() {
				$local.tablaSubBinesAsociados.clear().draw();
			},
			success : function(subBines) {
				if(subBines.length == 0){
					$funcionUtil.notificarException("No existen SubBINES asociados al cliente seleccionado.", "fa-check", "Aviso", "info");
				}
				$local.tablaSubBinesAsociados.rows.add(subBines).draw();
			}
		});
		$local.$formularioAdicionalMantenimiento.removeClass("hidden");
		$funcionUtil.llenarFormulario(cliente, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
		$local.$modalMantenimiento.PopupWindow("maximize");
	});

	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var cliente = $formMantenimiento.serializeJSON();
		cliente.idCliente = $local.idClienteSeleccionado;
		cliente.idEmpresa = $local.idEmpresaSeleccionado;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "cliente",
			data : JSON.stringify(cliente),
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
			success : function(clientes) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
				var cliente = clientes[0];
				var row = $local.tablaMantenimiento.row.add(cliente).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarMantenimiento.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$asociarSubBin.on("click", function() {
		if (!$formAsociacionSubBin.valid()) {
			return;
		}
		var subBinAsociado = $formAsociacionSubBin.serializeJSON();
		subBinAsociado.idCliente = $local.idClienteSeleccionado;
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "cliente?accion=asociarSubBIN",
			data : JSON.stringify(subBinAsociado),
			beforeSend : function(xhr) {
				$local.$asociarSubBin.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formAsociacionSubBin);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formAsociacionSubBin);
				}
			},
			success : function(subBinesAsociados) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var subBinAsociado = subBinesAsociados[0];
				var row = $local.tablaSubBinesAsociados.row.add(subBinAsociado).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$funcionUtil.prepararFormularioRegistro($formAsociacionSubBin);
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$asociarSubBin.attr("disabled", false).find("i").addClass("fa-random").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$tablaSubBinesAsociados.children("tbody").on("click", ".actualizar", function() {
		$local.$filaSeleccionadaTablaSubBinesAsociados = $(this).parents("tr");
		var subBinAsociado = $local.tablaSubBinesAsociados.row($local.$filaSeleccionadaTablaSubBinesAsociados).data();
		$funcionUtil.prepararFormularioActualizacion($formAsociacionSubBin);
		$funcionUtil.llenarFormulario(subBinAsociado, $formAsociacionSubBin);
		$local.$bines.trigger("change", [ subBinAsociado.codigoSubBIN ]);
		$local.$botonesActualizacion.removeClass("hidden");
		$local.$asociarSubBin.addClass("hidden");
		$local.codigoBINSeleccionado = subBinAsociado.codigoBIN;
		$local.codigoSubBINSeleccionado = subBinAsociado.codigoSubBIN;
	});

	$local.$actualizarAsociacionSubBin.on("click", function() {
		var descripcionSubBinAsociado = $local.tablaSubBinesAsociados.row($local.$filaSeleccionadaTablaSubBinesAsociados).data().descripcion;
		var subBinAsociado = $formAsociacionSubBin.serializeJSON();
		subBinAsociado.idCliente = $local.idClienteSeleccionado;
		subBinAsociado.codigoSubBINAntiguo = $local.codigoSubBINSeleccionado;
		subBinAsociado.codigoBINAntiguo = $local.codigoBINSeleccionado;
		if (!$formAsociacionSubBin.valid()) {
			return;
		}
		if (subBinAsociado.codigoSubBINAntiguo == subBinAsociado.codigoSubBIN && subBinAsociado.codigoBIN == subBinAsociado.codigoBINAntiguo) {
			$local.$cancelarActualizacionAsociacionSubBin.trigger("click");
			return;
		}
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "cliente?accion=actualizarAsociacionSubBIN",
			data : JSON.stringify(subBinAsociado),
			beforeSend : function(xhr) {
				$local.$actualizarAsociacionSubBin.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formAsociacionSubBin);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formAsociacionSubBin);
				},
				409 : function(response) {
					var mensaje = $funcionUtil.obtenerMensajeError("La asociaci&oacute;n <b>" + descripcion + " asociado al Cliente '" + $local.idClienteSeleccionado + "'</b>", xhr.responseJSON, $variableUtil.accionActualizado);
					$funcionUtil.notificarException(mensaje, "fa-warning", "Aviso", "warning");
				}
			},
			success : function(subBinesAsociados) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				$local.tablaSubBinesAsociados.row($local.$filaSeleccionadaTablaSubBinesAsociados).remove().draw(false);
				var subBinAsociado = subBinesAsociados[0];
				var row = $local.tablaSubBinesAsociados.row.add(subBinAsociado).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$cancelarActualizacionAsociacionSubBin.trigger("click");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarAsociacionSubBin.attr("disabled", false).find("i").addClass("fa-random").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$cancelarActualizacionAsociacionSubBin.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formAsociacionSubBin);
		$local.$botonesActualizacion.addClass("hidden");
		$local.$asociarSubBin.removeClass("hidden");
		$local.$filaSeleccionadaTablaSubBinesAsociados = "";
		$local.codigoBINSeleccionado = "";
		$local.codigoSubBINSeleccionado = "";
	});

	$local.$tablaSubBinesAsociados.children("tbody").on("click", ".eliminar", function() {
		var $filaSeleccionadaTablaSubBinesAsociados = $(this).parents("tr");
		var subBinAsociado = $local.tablaSubBinesAsociados.row($filaSeleccionadaTablaSubBinesAsociados).data();
		subBinAsociado.idCliente = $local.idClienteSeleccionado;
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la asociaci&oacute;n de <b>'" + subBinAsociado.descripcion + " asociado al Cliente " + $local.idClienteSeleccionado + "'<b/>?",
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
									url : $variableUtil.root + "cliente?accion=removerAsociacionSubBIN",
									data : JSON.stringify(subBinAsociado),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaSubBinesAsociados.row($filaSeleccionadaTablaSubBinesAsociados).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("La asociaci&oacute;n <b>" + subBinAsociado.descripcion + " asociado al Cliente '" + $local.idClienteSeleccionado + "'</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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

	$local.$tablaMantenimiento.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var cliente = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar el Cliente <b>'" + cliente.idCliente + " - " + cliente.descripcion + "'<b/>?",
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
									url : $variableUtil.root + "cliente",
									data : JSON.stringify(cliente),
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
										var mensaje = $funcionUtil.obtenerMensajeError("El Cliente <b>" + cliente.idCliente + " - " + cliente.descripcion + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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