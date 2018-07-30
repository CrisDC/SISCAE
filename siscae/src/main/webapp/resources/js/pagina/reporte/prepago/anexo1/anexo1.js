$(document).ready(function() {

	var $local = {
		$empresas : $("#empresas"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$buscar : $("#buscar"),
		$tablaReporteContable : $("#tablaReporteContable"),
		tablaReporteContable : "",
		$resultadoBusquedaReporteContablePrepago : $("#resultadoBusquedaReporteContable"),
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
			"data" : 'fechaTransaccion',
			"title" : "Fecha de Transacción"
		}, {
			"data" : 'horaTransaccion',
			"title" : "Hora Transaccion"
		}, {
			"data" : 'fechaProceso',
			"title" : "Fecha de Proceso"
		}, {
			"data" : 'fechaProceso',
			"title" : "Fecha de Afectación"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idCliente, row.descripcionCliente);
			},
			"title" : "Cliente"
		}, {
			"data" : 'idPersona',
			"title" : "Id Persona"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.tipoDocumento, row.descripcionTipoDocumento);
			},
			"title" : "Tipo Documento"
		}, {
			"data" : 'numeroDocumento',
			"title" : "Número Documento"
		}, {
			"data" : 'nombres',
			"title" : "Nombres"
		}, {
			"data" : 'apellidoPaterno',
			"title" : "Apellido Paterno"
		}, {
			"data" : 'apellidoMaterno',
			"title" : "Apellido Materno"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idBIN, row.descripcionBIN);
			},
			"title" : "BIN"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idSubBIN, row.descripcionSubBIN);
			},
			"title" : "SubBIN"
		}, {
			"data" : 'nombreAfiliado',
			"title" : "Adquirente"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.transaccion, row.descripcionTransaccion);
			},
			"title" : "Transaccion"
		}, {
			"data" : 'monedaCompensacion',
			"title" : "Moneda Comp"
		}, {
			"data" : 'valorCompensacion',
			"title" : "Valor Comp"
		}, {
			"data" : 'numeroTrace',
			"title" : "Número Trace"
		}, {
			"data" : 'codigoRpta',
			"title" : "Código Respuesta"
		}, {
			"data" : 'codigoAutorizacion',
			"title" : "Código Autorización"
		}, {
			"data" : 'cuentaCargo',
			"title" : "Cuenta Cargo"
		}, {
			"data" : 'cuentaAbono',
			"title" : "Cuenta Abono"
		}, {
			"data" : 'codigoAnalitico',
			"title" : "Código Analítico"
		}
		
		]
	});

	$local.$tablaReporteContable.wrap("<div class='table-responsive'></div>");
	$tablaFuncion.aniadirBotonEnTabla($(".dataTables_filter"), $variableUtil.tableBotonExportarXlsx, $variableUtil.posDerecho);
	$local.$exportarXlsx = $("#exportarXlsx");

	$local.$buscar.on("click", function() {
		var criterioBusqueda = $formCriterioBusquedaReporte.serializeJSON();
		var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaBusqueda);
		criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
		criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		criterioBusqueda.tipo = 'LOGC'
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "/reporte/prepago/contable/anexo?accion=buscar",
			data : criterioBusqueda,
			beforeSend : function() {
				$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(reporteContablePrepago) {
				$local.tablaReporteContable.clear().draw();
				if (reporteContablePrepago.length == 0) {
					$funcionUtil.notificarException("No se encontraron transacciones.", "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaReporteContable.rows.add(reporteContablePrepago).draw();
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
		window.location.href = $variableUtil.root + "reporte/prepago/contabilidad/anexo1?accion=exportar&" + paramCriterioBusqueda;
	});
});