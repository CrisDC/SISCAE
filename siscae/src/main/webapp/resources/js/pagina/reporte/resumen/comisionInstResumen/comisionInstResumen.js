$(document).ready(function() {

	var $local = {
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$buscar : $("#buscar"),
		$resultadoBusqueda : $("#resultadoBusqueda"),
		$tablaComisiones : $("table.tablaComisiones"),
		tablaComisiones : "",
		tablasComisiones : {},
		$encabezados : "",
		encabezadoComisionesArreglo : []
	};

	$funcionUtil.crearDatePickerSimple($local.$rangoFechaBusqueda, "YYYY-MM-DD");

	$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
		$.fn.dataTable.tables({
			visible : true,
			api : true
		}).columns.adjust();
	});

	$local.$tablaComisiones.filter(function() {
		var tablaComision = $(this);
		$local.$encabezados = tablaComision.find("th.conceptoComision");
		var idTabla = tablaComision.attr("idTabla");
		$local.tablasComisiones[idTabla] = tablaComision.DataTable({
			"scrollX" : true,
			"scrollCollapse" : true,
			"language" : {
				"emptyTable" : "No hay transacciones encontradas."
			},
			"fixedColumns" : {
				"leftColumns" : 1
			},
			"footerCallback" : function(row, data, start, end, display) {
				var api = this.api(), data;
				var tieneData = false;
				api.columns('.comision').every(function() {
					var index = this.selector.cols;
					if (this.data().length > 0) {
						tieneData = true;
						var suma = this.data().reduce(function(a, b) {
							return parseFloat(a) + parseFloat(b);
						}, 0);
						$(api.column(index).footer()).html(suma.toFixed(4));
						if (suma > 0) {
							$(api.column(index).footer()).addClass("color-blue");
						} else if (suma < 0) {
							$(api.column(index).footer()).addClass("color-red");
						} else {
							$(api.column(index).footer()).addClass("color-inherit");
						}
					} else {
						$(api.column(index).footer()).html("");
					}
				});
				if (tieneData) {
					cantidadTotal = api.column(1).data().reduce(function(a, b) {
						return parseInt(a) + parseInt(b);
					}, 0);
					monto = api.column(2).data().reduce(function(a, b) {
						return parseFloat(a) + parseFloat(b);
					}, 0);
					$(api.column(1).footer()).html(cantidadTotal);
					$(api.column(2).footer()).html(monto.toFixed(2));
					if (monto > 0) {
						$(api.column(2).footer()).addClass("color-blue");
					} else if (monto < 0) {
						$(api.column(2).footer()).addClass("color-red");
					} else {
						$(api.column(2).footer()).addClass("color-inherit");
					}
				} else {
					$(api.column(1).footer()).html("");
					$(api.column(2).footer()).html("");
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
	});

	for (var i = 0; i < $local.$encabezados.length; i++) {
		var conceptoComision = $local.$encabezados.filter("[name=" + i + "]").attr("idConceptoComision");
		$local.encabezadoComisionesArreglo.push(conceptoComision);
	}

	$local.$buscar.on("click", function() {
		var criterioBusqueda = {};
		criterioBusqueda.fechaProceso = $local.$rangoFechaBusqueda.data("daterangepicker").startDate.format('YYYY-MM-DD');
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/comision/moneda?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function(xhr) {
				$.each($local.tablasComisiones, function(i, tablaComision) {
					$local.tablasComisiones[i].clear().draw();
				});
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteComisionMoneda) {
				if (reporteComisionMoneda.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				var finInicioCelda = "</td><td>";
				$.each(reporteComisionMoneda, function(i, comisionMoneda) {
					var $tablaMoneda = $("#tabla" + comisionMoneda.codigoMoneda);
					var filas = new Array();
					var j = -1;
					$.each(comisionMoneda.transacciones, function(i, transaccion) {
						filas[++j] = "<tr><td>";
						filas[++j] = $funcionUtil.unirCodigoDescripcion(transaccion.numeroTransaccion, transaccion.descripcionTransaccion);
						filas[++j] = "</td><td class='dt-right'>";
						filas[++j] = transaccion.cantidadTransaccion;
						filas[++j] = "</td><td class='dt-right monto'>";
						filas[++j] = transaccion.monto.toFixed(2);
						filas[++j] = "</td><td class='dt-right monto comision'>";
						var k = -1;
						var subTotal = parseFloat(transaccion.monto).toFixed(2);
						for (var k = 0; k < $local.encabezadoComisionesArreglo.length; k++) {
							var montoComision = 0;
							var idConceptoComision = $local.encabezadoComisionesArreglo[k];
							$.each(transaccion.comisiones, function(k, comision) {
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
					var idTabla = $tablaMoneda.attr("idTabla");
					$local.tablasComisiones[idTabla].rows.add($(filas.join(''))).draw();
				});
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
});