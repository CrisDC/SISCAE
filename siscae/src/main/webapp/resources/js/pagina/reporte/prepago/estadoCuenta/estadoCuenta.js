$(document).ready(function() {

	var $local = {
		$empresas : $("#empresas"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$buscar : $("#buscar"),
		$tablaReporteContable : $("#tablaReporteEstadoCuenta"),
		tablaReporteContable : "",
		$resultadoBusquedaReporteContablePrepago : $("#resultadoBusquedaReporteEstadoCuenta"),
		$exportarXlsx : ""
	};

	$funcionUtil.crearSelect2($local.$empresas);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);

	$formCriterioBusquedaReporte = $("#formCriterioBusquedaReporte");

	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaReporteContable.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaReporteContable.clear().draw();
			$funcionUtil.notificarException(xhr.responseText, "Error Interno", "danger");
			break;
		}
	});

	$local.tablaReporteContable = $local.$tablaReporteContable.DataTable({
		"language" : {
			"emptyTable" : "No hay transacciones encontradas"
		},
		"columnDefs" : [{
			"targets" : [ 0, 1, 2,3,4 ],
			"className" : "all",
		}, {
			"targets" : 5,
			"className" : "all dt-right monto"
		} ],
		"columns" : [ {
			"data" : 'fechaTransaccion',
			"title" : "Fecha de Transacción"
		}, {
			"data" : 'horaTransaccion',
			"title" : "Hora Transaccion"
		}, {
			"data" : 'trace',
			"title" : "Trace"
		}, {
			"data" : 'descripcionCodigoTransaccion',
			"title" : "Operación"
		}, {
			"data" : 'nombreAfiliado',
			"title" : "Descripcion"
		}, {
			"data" : 'valorTransaccion',
			"title" : "Monto"
		}
		
		]
	});

	$local.$tablaReporteContable.wrap("<div class='table-responsive'></div>");
	//$tablaFuncion.aniadirBotonEnTabla($(".dataTables_filter"), $variableUtil.tableBotonExportarXlsx, $variableUtil.posDerecho);
	$local.$exportarXlsx = $("#exportarXlsx");

	$local.$buscar.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "/reporte/estadoCuenta?accion=buscarPorCriterio",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteContablePrepago) {
				$local.tablaReporteContable.clear().draw();
				console.log(reporteContablePrepago.movimientos);
				if (reporteContablePrepago.movimientos == null) {
					$funcionUtil.notificarException("No se encontraron transacciones.", "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaReporteContable.rows.add(reporteContablePrepago.movimientos).draw();
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$exportarXlsx.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		//criterioBusqueda.fechaProceso = rangoFechaBusqueda.fechaFin;
		criterioBusqueda.descripcionEmpresa = $local.$empresas.find("option:selected").text();
		var descripcionRangoFechas = $local.$rangoFechaBusqueda.val();
		criterioBusqueda.descripcionRangoFechas = descripcionRangoFechas == "" || descripcionRangoFechas == undefined ? "TODOS" : descripcionRangoFechas;
		criterioBusqueda.tipo = "LOGC";

		var paramCriterioBusqueda = $.param(criterioBusqueda);
		window.location.href = $variableUtil.root + "reporte/estadoCuenta?accion=exportar&" + paramCriterioBusqueda;
	});
});