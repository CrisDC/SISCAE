$(document).ready(function() {

	var $local = {
		$buscar : $("#buscar"),
		$exportar : $("#exportar"),
		$resultadoBusqueda : $("#resultadoBusqueda"),
		$rangoFechas : $("#rangoFechaBusqueda"),
		$tablaResultadoBusqueda : $("#tablaResultadoBusqueda"),
		tablaResultadoBusqueda : ""
	};

	$local.$tablaResultadoBusquedaCuerpo = $local.$tablaResultadoBusqueda.find("tbody");
	$formCriterioBusqueda = $("#formCriterioBusqueda");
	$funcionUtil.crearDateRangePickerSimple($local.$rangoFechas);

	$local.tablaResultadoBusqueda = $local.$tablaResultadoBusqueda.DataTable({
		"initComplete" : function() {
			$local.$tablaResultadoBusqueda.wrap("<div class='table-responsive'></div>");
		},
		"language" : {
			"emptyTable" : "No hay transacciones encontradas"
		},
		"columns" : [ {
			"data" : "fechaProceso",
			"title" : "F. de Proceso"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idInstitucionRecep, row.descripcionInstitucionReceptor);
			},
			"title" : "Institución Receptora"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idInstitucionEmi, row.descripcionInstitucionEmisor);
			},
			"title" : "Institución Emisor"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idMembresia, row.descripcionMembresia);
			},
			"title" : "Membresía"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idClaseServicio, row.descripcionClaseServicio);
			},
			"title" : "Clase de Servicio"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idOrigen, row.descripcionOrigen);
			},
			"title" : "Origen"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.transaccion, row.descripcionCodigoTransaccion);
			},
			"title" : "Transacción"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idMonedaCompensacion, row.descripcionMonedaCompensacion);
			},
			"title" : "Moneda Compensación"
		}, {
			"data" : "tipoTarifaRecOpe",
			"title" : "T. Tarifa Rec. OPE"
		}, {
			"data" : "nivelCompensacion",
			"title" : "Nivel Compensación"
		}, {
			"data" : "nivelRecOpe",
			"title" : "Nivel Rec. OPE"
		}, {
			"className" : "dt-right",
			"data" : "cantidad",
			"title" : "Cantidad"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.sumaValorCompensacion.toFixed(2);
			},
			"title" : "Suma Valor Compensación"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.sumaSurcharge.toFixed(4);
			},
			"title" : "Suma SUR"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.sumaSurchargeRec.toFixed(4);
			},
			"title" : "Suma SUR REC"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.sumaValorComision.toFixed(4);
			},
			"title" : "Suma Valor Comisión"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.sumaValorComisionRec.toFixed(4);
			},
			"title" : "Suma Valor Comisión REC"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.sumaValorComisionRec2.toFixed(4);
			},
			"title" : "Suma Valor Comisión REC 2"
		}, {
			"data" : function(row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.cuadra);
			},
			"title" : "Cuadra"
		} ]
	});

	$local.$buscar.on("click", function() {
		if (!$formCriterioBusqueda.valid()) {
			return true;
		}
		var criterioBusqueda = {};
		criterioBusqueda.fechaInicio = $local.$rangoFechas.data("daterangepicker").startDate.format('YYYY-MM-DD');
		criterioBusqueda.fechaFin = $local.$rangoFechas.data("daterangepicker").endDate.format('YYYY-MM-DD');
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/tarifario/resumenAdquirente?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.tablaResultadoBusqueda.clear().draw();
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteTarifarioResumenAdquirente) {
				if (reporteTarifarioResumenAdquirente.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaResultadoBusqueda.rows.add(reporteTarifarioResumenAdquirente).draw();
			},
			error : function() {
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$exportar.on("click", function() {
		var criterioBusqueda = {};
		criterioBusqueda.fechaInicio = $local.$rangoFechas.data("daterangepicker").startDate.format('YYYY-MM-DD');
		criterioBusqueda.fechaFin = $local.$rangoFechas.data("daterangepicker").endDate.format('YYYY-MM-DD');
		var descripcionRangoFechas = $local.$rangoFechas.val();
		criterioBusqueda.descripcionRangoFechas = descripcionRangoFechas == "" || descripcionRangoFechas == undefined ? "TODOS" : descripcionRangoFechas;
		var paramCriterioBusqueda = $.param(criterioBusqueda);
		window.location.href = $variableUtil.root + "reporte/tarifario/resumenAdquirente?accion=exportar&" + paramCriterioBusqueda;
	});

});