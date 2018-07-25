$(document).ready(function() {
	var $local = {
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$buscar : $("#buscar"),
		$tablaTipoCambio : $("#tablaTipoCambio"),
		tablaTipoCambio : "",
		$resultadoBusquedaTipoCambio : $("#resultadoBusquedaTipoCambio")
	};

	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);
	$formCriterioBusqueda = $("#formCriterioBusqueda");

	$local.tablaTipoCambio = $local.$tablaTipoCambio.DataTable({
		"language" : {
			"emptyTable" : "No hay tipos de cambio encontradas"
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all",
		}, {
			"targets" : 0,
			"render" : $.fn.dataTable.moment('DD/MM/YYYY')
		} ],
		"columns" : [ {
			"data" : 'fechaProceso',
			"title" : "Fecha de Proceso"
		}, {
			"data" : 'tipoCambio',
			"title" : "Tipo de Cambio"
		} ]
	});

	$local.$tablaTipoCambio.wrap("<div class='table-responsive'></div>");

	$local.$buscar.on("click", function() {
		var criterioBusqueda = $formCriterioBusqueda.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		$.ajax({
			type : "GET",
			url : window.location.href + "?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.tablaTipoCambio.clear().draw();
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteResumenAutorizacion) {
				if (reporteResumenAutorizacion.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaTipoCambio.rows.add(reporteResumenAutorizacion).draw();
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
});