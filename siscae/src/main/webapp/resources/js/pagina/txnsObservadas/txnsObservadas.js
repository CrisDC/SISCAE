$(document).ready(function() {

	var $local = {
		$tablaTransaccionObservadas : $("#tablaConsulta"),
		tablaTransaccionObservadas : "",
		$filaSeleccionada : "",
		filtrosSeleccionables : [],
		$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
		$tipoDocumento : $("#tipoDocumento"),
		$criterios : $("#criterios"),
		$btnBuscarPorDocumentoCliente : $("#btnBuscarPorDocumentoCliente"),
		$buscarCriterios : $("#buscarCriterios"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$origenesArchivo : $("#origenesArchivo"),
		$modalTxnsObservadasTrace : $("#modal-esquemaAjuste"),
		$btnActualizarTrace : $("#btnActualizarTrace"),
		$modalDetalleConsulta : $("#modalDetalleConsulta"),
		$selectTipoDocumento : $("#selectTipoDocumento")
	};

	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);
	$funcionUtil.crearSelect2($local.$origenesArchivo);
	$funcionUtil.crearSelect2($local.$selectTipoDocumento, "Seleccion un Tipo de Documento");

	$formTxnsTraceObservadas = $("#formTxnsTraceObservadas");

	$local.$modalTxnsObservadasTrace.PopupWindow({
		title : "Esquema de Ajuste",
		autoOpen : false,
		modal : false,
		height : 230,
		width : 450,
	});

	$local.$modalDetalleConsulta.PopupWindow({
		title : "Detalle de Transacciones Observadas",
		autoOpen : false,
		modal : false,
		height : 400,
		width : 600,
	});

	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaTransaccionObservadas.on('xhr.dt', function(e, settings, json, xhr) {
	});

	$local.tablaTransaccionObservadas = $local.$tablaTransaccionObservadas.DataTable({
		"language" : {
			"emptyTable" : "No se han encontrado Transacciones Observadas con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaTransaccionObservadas.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["14"] = $variableUtil.arregloSiNo;
			$local.filtrosSeleccionables["15"] = $variableUtil.arregloSiNo;
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaTransaccionObservadas, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 16, 17, 20, 21, 22, 23 ],
			"className" : "all filtrable"
		}, {
			"targets" : [ 14 ],
			"className" : "all dt-right filtrable"
		}, {
			"targets" : [ 15 ],
			"className" : "all dt-right filtrable"
		}, {
			"targets" : 18,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.extornar);
			}
		}, {
			"targets" : 19,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.devolver);
			}
		}, {
			"targets" : 24,
			"className" : "all dt-center",
			"render" : function(data, type, row) {
				return ((row.idIndicadorConciliacion == 3  && (row.numeroTrace == '' || row.numeroTrace == null)) ? ("" + $variableUtil.botonActualizar) : "N/A");
			} 
		} ],
		"columns" : [ {
			"data" : 'numeroTarjeta',
			"title" : "Nº Tarjeta"
		}, {
			"data" : 'numeroCuenta',
			"title" : "Nº Cuenta"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idRolTransaccion, row.descripcionRolTransaccion);
			},
			"title" : "Rol"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idCanal, row.descripcionCanal);
			},
			"title" : "Canal"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoProcesoSwitch, row.descripcionProcesoSwitch);
			},
			"title" : "Proceso"
		}, {
			"data" : 'numeroDocumentoTransaccion',
			"title" : "Número Documento"
		}, {
			"data" : 'fechaProceso',
			"title" : "Fecha Proceso"
		}, {
			"data" : 'fechaTransaccion',
			"title" : "Fecha Transacción"
		}, {
			"data" : 'horaTransaccion',
			"title" : "Hora Transacción"
		}, {
			"data" : 'fechaSwitch',
			"title" : "Fecha Switch"
		}, {
			"data" : 'autorizacion',
			"title" : "Autorización"
		}, {
			"data" : 'numeroTrace',
			"title" : "Trace"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoRespuestaSwitch, row.descripcionCodigoRespuestaSwitch);
			},
			"title" : "Respuesta"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoMonedaTransaccion, row.descripcionMonedaTransaccion);
			},
			"title" : "Moneda"
		}, {
			"data" : function(row) {
				return row.valorTransaccion.toFixed(2);
			},
			"title" : "Valor Transacción"
		}, {
			"data" : function(row) {
				return row.valorDiferencia.toFixed(2);
			},
			"title" : "Valor Diferencia"
		}, {
			"data" : 'nombreAdquirente',
			"title" : "Adquirente"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idOrigenArchivo, row.descripcionOrigenArchivo);
			},
			"title" : "Origen Archivo"
		}, {
			"data" : null,
			"title" : "Extornar"
		}, {
			"data" : null,
			"title" : "Devolver"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idIndicadorConciliacion, row.descripcionIndicadorConciliacion);
			},
			"title" : "Indicador Conciliación"
		}, {
			"data" : 'fechaRegistro',
			"title" : "Fecha Reg"
		}, {
			"data" : 'horaRegistro',
			"title" : "Hora Reg"
		}, {
			"data" : 'idSecuencia',
			"title" : "Secuencia"
		}, {
			"data" : null,
			"title" : "Accion"
		} ],
		"createdRow" : function(row, data, dataIndex) {
			if (data.idIndicadorConciliacion == 3 && (data.numeroTrace == '' || data.numeroTrace == null)) {
				$(row).css("background-color", "Danger");
				$(row).addClass("danger");
			}
		}
	});

	$local.$tablaTransaccionObservadas.children("tbody").on("click", ".actualizar", function() {
		$local.$modalTxnsObservadasTrace.PopupWindow("open");
		$local.$modalDetalleConsulta.find("input").focus();
		$local.$filaSeleccionada = $(this).parents("tr");
		var observada = $local.tablaTransaccionObservadas.row($local.$filaSeleccionada).data();
		$("#idSecuencia").val(observada.idSecuencia);
	});

	$local.$btnActualizarTrace.on("click", function() {
		var traceObservada = $formTxnsTraceObservadas.serializeJSON();
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "txnsObservadas",
			data : JSON.stringify(traceObservada),
			beforeSend : function(xhr) {
				$local.$btnActualizarTrace.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formTxnsTraceObservadas);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formTxnsTraceObservadas);
				}
			},
			success : function(trace) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaTransaccionObservadas.row($local.$filaSeleccionada).remove().draw(false);
				var trace = trace[0];
				
				var row = $local.tablaTransaccionObservadas.row.add({
					"idSecuencia" : traceObservada.idSecuencia
				}).draw();
				if(row != null){
					row.show().draw(false);
					$(row.node()).animateHighlight();
				}
				$funcionUtil.prepararFormularioRegistro($formTxnsTraceObservadas)
				$local.$modalTxnsObservadasTrace.PopupWindow("close");
			},
			error : function(response) {
				
				$local.$modalTxnsObservadasTrace.PopupWindow("close");
				$local.$modalTxnsObservadasTrace.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
				
			},
			complete : function(response) {
				$local.$modalTxnsObservadasTrace.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$tablaTransaccionObservadas.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaTransaccionObservadas.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaTransaccionObservadas.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaTransaccionObservadas.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$local.$tipoBusqueda.on("change", function() {
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "tipoDocumento":
			$local.$tipoDocumento.removeClass("hidden");
			$local.$criterios.addClass("hidden");
			break;
		case "criterios":
			$local.$tipoDocumento.addClass("hidden");
			$local.$criterios.removeClass("hidden");
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}
	});

	$formBusquedaTipoDocumento.find("input").keypress(function(event) {
		if (event.which == 13) {
			$local.$btnBuscarPorDocumentoCliente.trigger("click");
			return false;
		}
	});

	$formBusquedaCriterios.find("input").keypress(function(event) {
		if (event.which == 13) {
			$local.$buscarCriterios.trigger("click");
			return false;
		}
	});

	$local.$btnBuscarPorDocumentoCliente.on("click", function() {
		if (!$formBusquedaTipoDocumento.valid()) {
			return;
		}
		var criterioBusqueda = $formBusquedaTipoDocumento.serializeJSON();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "txnsObservadas?accion=buscarPorTipoDocumento",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
				}
			},
			beforeSend : function() {
				$local.tablaTransaccionObservadas.clear().draw();
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionObservadas) {
				if (transaccionObservadas.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaTransaccionObservadas.rows.add(transaccionObservadas).draw();
			},
			complete : function() {
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$buscarCriterios.on("click", function() {
		if (!$formBusquedaCriterios.valid()) {
			return;
		}
		if ($funcionUtil.camposVacios($formBusquedaCriterios)) {
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
			return;
		}
		var criterioBusqueda = $formBusquedaCriterios.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "txnsObservadas?accion=buscarPorCriterios",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
				}
			},
			beforeSend : function() {
				$local.tablaTransaccionObservadas.clear().draw();
				$local.$buscarCriterios.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionObservadas) {
				if (transaccionObservadas.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaTransaccionObservadas.rows.add(transaccionObservadas).draw();
			},
			complete : function() {
				$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
});