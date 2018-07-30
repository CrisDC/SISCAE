$(document).ready(function() {

	var $local = {
		$buscar : $("#buscar"),
		$exportar : $("#exportar"),
		$navTabla : $("#navTabla"),
		$resultadoBusqueda : $("#resultadoBusqueda"),
		$rangoFechas : $("#rangoFechaBusqueda"),
		$tablaResultadoBusqueda : $("#tablaResultadoBusqueda"),
		tablaResultadoBusqueda : "",
		$tablaResultadoBusquedaCuerpo : ""
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
			"data" : "secuenciaTransaccion",
			"title" : "Secuencia Transacción"
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
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idMonedaTransaccion, row.descripcionMonedaTransaccion);
			},
			"title" : "Moneda Transacción"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.valorCompensacion.toFixed(2);
			},
			"title" : "Valor Compensación"
		}, {
			"data" : "nivelRecSc",
			"title" : "Nivel REC SUR"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.surcharge.toFixed(4);
			},
			"title" : "SUR"
		}, {
			"className" : "dt-right",
			"data" : function(row) {
				return row.surchargeRec.toFixed(4);
			},
			"title" : "SUR REC"
		}, {
			"data" : function(row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.cuadra);
			},
			"title" : "Cuadra"
		} ]
	});

	$local.$buscar.on("click", function() {
		if (!$formCriterioBusqueda.valid()) {
			return;
		}
		var criterioBusqueda = {};
		criterioBusqueda.fechaInicio = $local.$rangoFechas.data("daterangepicker").startDate.format('YYYY-MM-DD');
		criterioBusqueda.fechaFin = $local.$rangoFechas.data("daterangepicker").endDate.format('YYYY-MM-DD');
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/tarifario/detalleSurcharge?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteTarifarioDetalleSurcharge) {
				if (reporteTarifarioDetalleSurcharge.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaResultadoBusqueda.rows.add(reporteTarifarioDetalleSurcharge).draw();
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
		window.location.href = $variableUtil.root + "reporte/tarifario/detalleSurcharge?accion=exportar&" + paramCriterioBusqueda;
	});

});