$(document).ready(function() {

	var $local = {
		$empresas : $("#empresas"),
		$indicadorContabilizacion : $(".indicarContabilizacion"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$buscar : $("#buscar"),
		$tablaContabilizacion : $("#tablaContabilizacion"),
		tablaContabilizacion : "",
		$exportarXlsx : "",
		$indicadores : $("#indicadores"),
		encabezadoComisionesArreglo : []
	};

	$funcionUtil.crearSelect2($local.$empresas);
	$funcionUtil.crearSelect2($local.$indicadores);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);

	$local.$encabezados = $local.$tablaContabilizacion.find("th.conceptoComision");

	for (var i = 0; i < $local.$encabezados.length; i++) {
		var conceptoComision = $local.$encabezados.filter("[name=" + i + "]").attr("idConceptoComision");
		$local.encabezadoComisionesArreglo.push(conceptoComision);
	}

	$formCriterioBusquedaReporte = $("#formCriterioBusquedaReporte");

	$local.tablaContabilizacion = $local.$tablaContabilizacion.DataTable({
		"initComplete" : function() {
			$local.$tablaContabilizacion.wrap("<div class='table-responsive'></div>");
		},
		"language" : {
			"emptyTable" : "No se encontraron transacciones"
		},
		"footerCallback" : function(row, data, start, end, display) {
			var tieneData = $local.tablaContabilizacion == "" ? false : $local.tablaContabilizacion.data().any();
			var api = this.api(), data;
			api.columns(".comision").every(function() {
				var index = this.selector.cols;
				if (tieneData) {
					var suma = this.data().reduce(function(a, b) {
						return parseFloat(a) + parseFloat(b);
					}, 0);
					$(api.column(index).footer()).html(suma.toFixed(4));
				} else {
					$(api.column(index).footer()).html("");
				}
			});
			if (tieneData) {
				cantidadTotal = api.column(15).data().reduce(function(a, b) {
					return parseInt(a) + parseInt(b);
				}, 0);
				$(api.column(15).footer()).html(cantidadTotal);
			} else {
				$(api.column(15).footer()).html("");
			}
		},
		"createdRow" : function(row, data, dataIndex) {
			$(row).find(".monto").filter(function() {
				var celda = $(this);
				var valor = parseFloat(celda.text());
				if (valor > 0) {
					celda.addClass("color-blue");
				} else if (valor < 0) {
					celda.addClass("color-red");
				} else {
					celda.addClass("color-inherit");
				}
			});
		}
	});

	$local.$buscar.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicioProceso = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFinProceso = rangoFechaBusqueda.fechaFin;
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/contabilizacion/comisiones?accion=buscar",
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
				var filas = new Array();
				var j = -1;
				var finInicioCelda = "</td><td>";
				$.each(reporteContabilizacionMovimento, function(i, reporte) {
					filas[++j] = "<tr><td>";
					filas[++j] = reporte.fechaProceso;
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.idCliente, reporte.descripcionCliente);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.idEmpresa, reporte.descripcionEmpresa);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoMonedaCompensacion, reporte.descripcionMonedaCompensacion);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoMembresia, reporte.descripcionMembresia);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoClaseServicio, reporte.descripcionClaseServicio);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoBIN, reporte.descripcionBIN);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoSubBIN, reporte.descripcionSubBIN);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoOrigen, reporte.descripcionOrigen); 
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoClaseTransaccion, reporte.descripcionClaseTransaccion);
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.codigoTransaccion, reporte.descripcionCodigoTransaccion);
					filas[++j] = finInicioCelda;
					filas[++j] = reporte.cuentaCargo
					filas[++j] = finInicioCelda;
					filas[++j] = reporte.cuentaAbono;
					filas[++j] = finInicioCelda;
					filas[++j] = reporte.codigoAnalitico;
					filas[++j] = finInicioCelda;
					filas[++j] = $funcionUtil.unirCodigoDescripcion(reporte.indicadorContabilizacion, reporte.descripcionIndicadorContabilizacion)
					filas[++j] = "</td><td class='dt-right'>";
					filas[++j] = reporte.cantidad;
					filas[++j] = "</td><td class='dt-right monto comision'>";
					var k = -1;
					var subTotal = 0;
					for (var k = 0; k < $local.encabezadoComisionesArreglo.length; k++) {
						var montoComision = 0;
						var idConceptoComision = $local.encabezadoComisionesArreglo[k];
						$.each(reporte.comisiones, function(k, comision) {
							if (comision.idConceptoComision == idConceptoComision) {
								montoComision = comision.comision || 0;
								var signo = "";
								if (montoComision != 0) {
									signo = comision.registroContable == "C" ? "-" : "";
								}
								montoComision = parseFloat(signo + montoComision.toFixed(4));
								return false;
							}
						});
						filas[++j] = montoComision.toFixed(4);
						filas[++j] = "</td><td class='dt-right monto comision'>";
						subTotal = parseFloat(subTotal) + parseFloat(montoComision);
					}
					filas[++j] = parseFloat(subTotal).toFixed(4);
					filas[++j] = "</td></tr>";
				});
				$local.tablaContabilizacion.rows.add($(filas.join(''))).draw();
				$tablaFuncion.pintarMontosComisiones($local.$tablaContabilizacion, "tfoot td.monto");
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

});