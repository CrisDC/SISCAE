$(document).ready(function() {

	var $local = {
		$tablaTransaccionAjustes : $("#tablaConsulta"),
		tablaTransaccionAjustes : "",
		$filaSeleccionada : "",
		filtrosSeleccionables : [],
		$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
		$tipoDocumento : $("#tipoDocumento"),
		$criterios : $("#criterios"),
		$btnBuscarPorDocumentoCliente : $("#btnBuscarPorDocumentoCliente"),
		$buscarCriterios : $("#buscarCriterios"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$origenesArchivo : $("#origenesArchivo"),
		$modalDetalleConsulta : $("#modalDetalleConsulta"),
		$selectTipoDocumento : $("#selectTipoDocumento")
	};

	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);
	$funcionUtil.crearSelect2($local.$origenesArchivo);
	$funcionUtil.crearSelect2($local.$selectTipoDocumento, "Seleccione un Tipo de Documento");

 
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaTransaccionAjustes.on('xhr.dt', function(e, settings, json, xhr) {
	});

	$local.tablaTransaccionAjustes = $local.$tablaTransaccionAjustes.DataTable({
		"language" : {
			"emptyTable" : "No se han encontrado Transacciones Ajuste con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaTransaccionAjustes.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaTransaccionAjustes)
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
			"className" : "all filtrable"
		} ],
		"columns" : [ 
		{
			"data" : 'numeroTarjeta',
			"title" : "Nº Tarjeta"
		}, {
			"data" : 'numeroDocumento',
			"title" : "Nº Documento"
		}, {
			"data" : 'secuenciaTransaccion',
			"title" : "Secuencia Transacción"
		}, {
			"data" : 'membresia',
			"title" : "Membresia"
		}, {
			"data" : 'claseServicio',
			"title" : "Clase Servicio"
		}, {
			"data" : 'origen',
			"title" : "Origen"
		}, {
			"data" : 'claseTransaccion',
			"title" : "Clase Transacción"
		}, {
			"data" : 'codigoTransaccion',
			"title" : "Código Transacción"
		}, {
			"data" : 'fechaTransaccion',
			"title" : "Fecha Txn"
		}, {
			"data" : 'horaTransaccion',
			"title" : "Hora Txn"
		}, {
			"data" : 'claseTransaccion',			
			"title" : "Clase Transacción"
		}, {
			"data" : 'monedaCompensacion',
			"title" : "Moneda Compensación"
		}, {
			"data" : 'valorAutorizacion',
			"title" : "Valor Autorización"
		}, {
			"data" : 'valorCompensacion',
			"title" : "Valor Compensación"
		}, {
			"data" : 'valorDiferencia',
			"title" : "Valor Diferencia"
		}, {
			"data" : 'registroContable',
			"title" : "Registro Contable"
		}, {
			"data" : 'proceso',
			"title" : "Proceso"
		}, {
			"data" : 'numeroVoucher',
			"title" : "Número Voucher"
		}, {
			"data" : 'fechaProceso',
			"title" : "Fecha Proceso"
		}, {
			"data" : 'fechaAfectacion',
			"title" : "Fecha Afectación"
		}, {
			"data" : 'autorizacion',
			"title" : "Código Autorización"
		}, {
			"data" : 'codigoRespuesta',
			"title" : "Código Rpta"
		}, {
			"data" : 'nombreAfiliado',
			"title" : "Nombre Afiliado"
		}, {
			"data" : 'rolTransaccion',
			"title" : "Rol Txn"
		}, {
			"data" : 'canal',
			"title" : "Canal"
		}, {
			"data" : 'cuentaCargo',
			"title" : "Cuenta Cargo"
		}, {
			"data" : 'cuentaAbono',
			"title" : "Cuenta Abono"
		}, {
			"data" : 'codigoAnalitico',
			"title" : "Código Analítico"
		}, {
			"data" : 'atm',
			"title" : "ATM"
		}, {
			"data" : 'tipoMovimiento',
			"title" : "Tipo Movimiento"
		}, {
			"data" : 'contabiliza',
			"title" : "Ind Contabilizacion"
		}
		]
	});


	$local.$tablaTransaccionAjustes.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaTransaccionAjustes.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaTransaccionAjustes.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaTransaccionAjustes.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
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
			url : $variableUtil.root + "txnsAjustes?accion=buscarPorTipoDocumento",
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
				$local.tablaTransaccionAjustes.clear().draw();
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionAjustes) {
				if (transaccionAjustes.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaTransaccionAjustes.rows.add(transaccionAjustes).draw();
			},
			complete : function() {
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$buscarCriterios.on("click", function() {
		if (!$formBusquedaCriterios.valid()) {
			return;
		}if($funcionUtil.camposVacios($formBusquedaCriterios)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			var criterioBusqueda = $formBusquedaCriterios.serializeJSON();
			var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
			criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
			criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsAjustes?accion=buscarPorCriterios",
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
					$local.tablaTransaccionAjustes.clear().draw();
					$local.$buscarCriterios.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(transaccionAjustes) {
					if (transaccionAjustes.length == 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					console.log(transaccionAjustes);
					$local.tablaTransaccionAjustes.rows.add(transaccionAjustes).draw();
				},
				complete : function() {
					$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
	});
});