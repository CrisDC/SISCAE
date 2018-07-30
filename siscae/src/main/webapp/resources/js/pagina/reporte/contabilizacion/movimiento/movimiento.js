$(document).ready(function() {

	var $local = {
		$empresas : $("#empresas"),
		$indicadorContabilizacion : $(".indicarContabilizacion"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$buscar : $("#buscar"),
		$tablaContabilizacion : $("#tablaContabilizacion"),
		tablaContabilizacion : "",
		$exportarXlsx : "",
		$indicadores : $("#indicadores")
	};

	$funcionUtil.crearSelect2($local.$empresas);
	$funcionUtil.crearSelect2($local.$indicadores);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);

	$formCriterioBusquedaReporte = $("#formCriterioBusquedaReporte");
	
	$local.tablaContabilizacion = $local.$tablaContabilizacion.DataTable({
		"language" : {
			"emptyTable" : "No hay transacciones encontradas."
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2 ],
			"className" : "all",
		}, {
			"targets" : 15,
			"className" : "all dt-right"
		}, {
			"targets" : 16,
			"className" : "all dt-right monto"
		} ],
		"columns" : [ {
			"data" : 'fechaProceso',
			"title" : "F. de Proceso"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idCliente, row.descripcionCliente);
			},
			"title" : "Cliente"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idEmpresa, row.descripcionEmpresa);
			},
			"title" : "Empresa"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoMonedaCompensacion, row.descripcionMonedaCompensacion);
			},
			"title" : "Moneda Compensación"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoMembresia, row.descripcionMembresia);
			},
			"title" : "Membresía"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoClaseServicio, row.descripcionClaseServicio);
			},
			"title" : "Clase de Servicio"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoBIN, row.descripcionBIN);
			},
			"title" : "BIN"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoSubBIN, row.descripcionSubBIN);
			},
			"title" : "SubBIN"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoOrigen, row.descripcionOrigen);
			},
			"title" : "Origen"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoClaseTransaccion, row.descripcionClaseTransaccion);
			},
			"title" : "Clase de Transacción"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoTransaccion, row.descripcionCodigoTransaccion);
			},
			"title" : "Código Transacción"
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
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.indicadorContabilizacion, row.descripcionIndicadorContabilizacion);
			},
			"title" : "Indicador"
		}, {
			"data" : 'cantidad',
			"title" : "Cantidad"
		}, {
			"data" : function(row) {
				return parseFloat(row.monto).toFixed(2);
			},
			"title" : "Monto"
		} ],
		"footerCallback" : function(row, data, start, end, display) {
			var tieneData = $local.tablaContabilizacion == "" ? false : $local.tablaContabilizacion.data().any();
			var api = this.api(), data;
			if (tieneData) {
				montoTotal = api.column(16).data().reduce(function(a, b) {
					return parseFloat(a) + parseFloat(b);
				}, 0);
				cantidadTotal = api.column(15).data().reduce(function(a, b) {
					return parseInt(a) + parseInt(b);
				}, 0);
				$(api.column(16).footer()).html(montoTotal.toFixed(2));
				$(api.column(15).footer()).html(cantidadTotal);
			} else {
				$(api.column(16).footer()).html("");
				$(api.column(15).footer()).html("");
			}
		},
		"createdRow" : function(row, data, dataIndex) {
			if (data.monto > 0) {
				$(row).find(".monto").addClass("color-blue");
			} else if (data.montoTransaccion == 0) {
				$(row).find(".monto").addClass("color-inherit");
			} else {
				$(row).find(".monto").addClass("color-red");
			}
		}
	});
	
	$local.$tablaContabilizacion.wrap("<div class='table-responsive'></div>");
	
	$local.$buscar.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicioProceso = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFinProceso = rangoFechaBusqueda.fechaFin;
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/contabilizacion/movimiento?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.tablaContabilizacion.clear().draw();
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteContabilizacionMovimento) {
				if (reporteContabilizacionMovimento.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaContabilizacion.rows.add(reporteContabilizacionMovimento).draw();
				$tablaFuncion.pintarMontosComisiones($local.$tablaContabilizacion, "tfoot td.monto");
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

});