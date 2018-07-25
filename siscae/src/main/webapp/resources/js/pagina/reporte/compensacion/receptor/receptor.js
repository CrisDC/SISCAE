$(document).ready(function() {

	var $local = {
		$buscar : $("#buscar"),
		$exportar : $("#exportar"),
		$navTabla : $("#navTabla"),	
		$resultadoBusqueda : $("#resultadoBusqueda"),
		$rangoFechas : $("#rangoFechaBusqueda"),
		$tablaResultadoBusqueda : $("#tablaResultadoBusqueda"),
		tablaResultadoBusqueda : "",
		$tablaResultadoBusquedaCuerpo : "",
		tablaPartes : {
			$tr_removible : "",
			$tr_membresia : $("#tr_membresia"),
			$th_tipo_compensacion : $("#th_tipo_compensacion"),
			$tr_cantidades : $("#tr_cantidades"),
			$tr_foot_total : $("#tr_foot_total"),
			template_th_membresia : "<th class='th_membresia' colspan='7'></th>",
			template_th_cantidad : "<th class='cantidad_txn success'>Cantidad</th><th class='monto_txn success'>Monto</th>" +
					"<th class='int_txn warning' data-tooltip='tooltip' title='COMISION INTERCAMBIO'>INT</th>" +
					"<th class='gas_txn warning' data-tooltip='tooltip' title='GASTOS'>GAS</th>" +
					"<th class='ope_txn warning' data-tooltip='tooltip' title='COMISION OPERADOR'>OPE</th>" +
					"<th class='sur_txn warning' data-tooltip='tooltip' title='COMISION SURCHARGE'>SUR</th>"
		},		
	};

	$local.tablaPartes.$th_tipo_compensacion.text("ATMs");
	$local.$tablaResultadoBusquedaCuerpo = $local.$tablaResultadoBusqueda.find("tbody");
	$local.tablaPartes.$tr_removible = $local.$tablaResultadoBusqueda.find(".removible");

	$formCriterioBusquedaCompensacion = $("#formCriterioBusquedaReporte");

	$funcionUtil.crearDateRangePickerSimple($local.$rangoFechas);

	$local.$buscar.on("click", function() {
		if (!$formCriterioBusquedaCompensacion.valid()) {
			return true;
		}
		var criterioBusqueda = $formCriterioBusquedaCompensacion.serializeJSON();
		criterioBusqueda.fechaInicio = $local.$rangoFechas.data("daterangepicker").startDate.format('YYYY-MM-DD');
		criterioBusqueda.fechaFin = $local.$rangoFechas.data("daterangepicker").endDate.format('YYYY-MM-DD');
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporte/compensacion/receptor?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.$resultadoBusqueda.addClass("hidden");
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				if ($local.tablaResultadoBusqueda != "") {
					$local.tablaResultadoBusqueda.destroy();
					$local.tablaResultadoBusqueda = "";
				}
				$local.tablaPartes.$tr_removible.empty();

			},
			success : function(reporteATMs) {
				if(reporteATMs.length != 0){
					var membresias = reporteATMs[0].membresias;
					var cant_columna_por_tr_membresia = 7;
					var cant_membresias = membresias.length;
					var columnas_tr_membresia = (cant_columna_por_tr_membresia * cant_membresias);
					$funcionReporteUtil.construirEncabezadosTabla($local.tablaPartes, columnas_tr_membresia, criterioBusqueda.codigoRespuestaTransaccion, membresias);
					$funcionReporteUtil.llenarTabla(reporteATMs, columnas_tr_membresia, $local.$tablaResultadoBusquedaCuerpo, $local.tablaPartes.$tr_foot_total, cant_columna_por_tr_membresia);
					$local.$tablaResultadoBusqueda.find(".cantidad:empty").text("0");
					$local.$tablaResultadoBusqueda.find(".monto:empty").text("0.00");
					$local.$tablaResultadoBusqueda.find(".comision:empty").text("0.0000");					
					$local.tablaResultadoBusqueda = $local.$tablaResultadoBusqueda.DataTable({
						"initComplete" : function() {
							$local.$tablaResultadoBusqueda.wrap("<div class='table-responsive'></div>");
						},
						"language" : {
							"emptyTable" : "No hay transacciones registradas"
						}
					});	
				}
				$local.$navTabla.tab("show");
				$local.$resultadoBusqueda.removeClass("hidden");				
			},
			error : function() {
			},
			complete : function() {
				$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$exportar.on("click", function() {
		window.location.href = $variableUtil.root + "reporte/compensacion/receptor?accion=exportar";
	});

});