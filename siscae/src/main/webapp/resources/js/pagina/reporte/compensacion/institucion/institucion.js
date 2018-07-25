$(document).ready(function() {

	var $local = {
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$exportar : $("#exportar"),
		$buscar : $("#buscar"),
		$navTabla : $("#navTabla"),
		$resultadoBusqueda : $("#resultadoBusqueda"),
		$tablaComisiones : $("table.tablaComisiones"),
		$tablaResultadoBusqueda : $("#tablaResultadoBusqueda"),
		tablaResultadoBusqueda : "",
		$tablaResultadoBusquedaCuerpo : "",
		tablaComisiones : "",
		$rolTransaccion : $(".rolTransaccion"),
		$codigoRespuestaTransaccion : $(".codigoRespuestaTransaccion"),
		$tipoMoneda : $(".tipoMoneda")
	};

	$local.$tablaResultadoBusquedaCuerpo = $local.$tablaResultadoBusqueda.find("tbody");
	$formCriterioBusquedaReporte = $("#formCriterioBusquedaReporte");
	$funcionUtil.crearDateRangePickerSimple($local.$rangoFechaBusqueda);

	$local.tablaResultadoBusqueda = $local.$tablaResultadoBusqueda.DataTable({
		"initComplete" : function() {
			$local.$tablaResultadoBusqueda.wrap("<div class='table-responsive'></div>");
		},
		"language" : {
			"emptyTable" : "No hay transacciones encontradas."
		},
		"columnDefs" : [ {
			"targets" : 0,
			"className" : "all",
		}, {
			"targets" : 1,
			"className" : "all dt-right"
		}, {
			"targets" : 2,
			"className" : "all dt-right monto"
		}, {
			"targets" : [ 3, 4, 5, 6, 7, 8, 9 ],
			"className" : "all dt-right monto comision"
		} ],
		"columns" : [ {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idInstitucion, row.descripcionInstitucion);
			},
			"title" : "Institución"
		}, {
			"data" : 'cantidadInstitucion',
			"title" : "Cantidad"
		}, {
			"data" : function(row) {
				return row.montoInstitucion.toFixed(2);
			},
			"title" : "Monto"
		}, {
			"data" : function(row) {
				return row.comisionTHB.toFixed(4);
			},
			"title" : "THB"
		}, {
			"data" : function(row) {
				return row.comisionINT.toFixed(4);
			},
			"title" : "INT"
		}, {
			"data" : function(row) {
				return row.comisionGAS.toFixed(4);
			},
			"title" : "GAS"
		}, {
			"data" : function(row) {
				return row.comisionOPE.toFixed(4);
			},
			"title" : "OPE"
		}, {
			"data" : function(row) {
				return row.comisionOIF.toFixed(4);
			},
			"title" : "OIF"
		}, {
			"data" : function(row) {
				return row.comisionDIS.toFixed(4);
			},
			"title" : "DIS"
		}, {
			"data" : function(row) {
				return row.comisionTOTAL.toFixed(4);
			},
			"title" : "Total"
		} ],
		"footerCallback" : function(row, data, start, end, display) {
			var tieneData = $local.tablaResultadoBusqueda == "" ? false : $local.tablaResultadoBusqueda.data().any();
			var api = this.api(), data;
			api.columns('.comision').every(function() {
				var suma = this.data().reduce(function(a, b) {
					return parseFloat(a) + parseFloat(b);
				}, 0);
				var index = this.selector.cols;
				$(api.column(index).footer()).html(tieneData ? suma.toFixed(4) : "");
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

	$local.$buscar.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		criterioBusqueda.fechaInicio = $local.$rangoFechaBusqueda.data("daterangepicker").startDate.format('YYYY-MM-DD');
		criterioBusqueda.fechaFin = $local.$rangoFechaBusqueda.data("daterangepicker").endDate.format('YYYY-MM-DD');
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/compensacion/emisor/institucion?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function(xhr) {
				$local.tablaResultadoBusqueda.clear().draw();
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteCompensacionInstitucion) {
				if (reporteCompensacionInstitucion.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaResultadoBusqueda.rows.add(reporteCompensacionInstitucion).draw();
				$tablaFuncion.pintarMontosComisiones($local.$tablaResultadoBusqueda, "tfoot td.monto");
			},
			error : function() {
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$exportar.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		criterioBusqueda.fechaInicio = $local.$rangoFechaBusqueda.data("daterangepicker").startDate.format('YYYY-MM-DD');
		criterioBusqueda.fechaFin = $local.$rangoFechaBusqueda.data("daterangepicker").endDate.format('YYYY-MM-DD');
		var descripcionRangoFechas = $local.$rangoFechaBusqueda.val();
		criterioBusqueda.descripcionRangoFechas = descripcionRangoFechas == "" || descripcionRangoFechas == undefined ? "TODOS" : descripcionRangoFechas;
		criterioBusqueda.descripcionRolTransaccion = $local.$rolTransaccion.filter(":checked").parent("label").text().trim();
		criterioBusqueda.descripcionCodigoRespuestaTransaccion = $local.$codigoRespuestaTransaccion.filter(":checked").parent("label").text().trim();
		criterioBusqueda.descripcionTipoMoneda = $local.$tipoMoneda.filter(":checked").parent("label").text().trim();
		var paramCriterioBusqueda = $.param(criterioBusqueda);
		window.location.href = $variableUtil.root + "reporte/compensacion/emisor/institucion?accion=exportar&" + paramCriterioBusqueda;
	});
});
