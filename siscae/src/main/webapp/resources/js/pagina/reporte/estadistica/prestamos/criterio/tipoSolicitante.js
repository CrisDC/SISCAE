$(document).ready(function() {
	
	var $localTipoSolicitante = {
			$tblReporteResumen : $("#tblReporteResumen"),
			$tblReporteResumenPorDia : $("#tblReporteResumenPorDia"),
			
			tblReporteResumen : "",
			tblReporteResumenPorDia : "",
			
			$btnBuscarPorCriterio : $("#btnBuscarPorCriterio"),
			$modalMantenimiento : $("#modalMantenimiento"),
			$aniadirMantenimento : $("#aniadirMantenimiento"),
			$registrarMantenimiento : $("#registrarMantenimiento"),
			$filaSeleccionada : "",
			$actualizarMantenimiento : $("#actualizarMantenimiento"),
			codigo_clase_servicioSeleccionado : "",
			codigo_membresiaSeleccionado : "",
			$membresias : $("#membresias"),
			$membresiasFiltroParaTableMantenimiento : $("#membresias-filtroParatblReporteDetalle"),
			filtrosSeleccionables : [],
			$resultadoBusqueda : $("#resultadoBusqueda"),
			$transaccionesNoConciliadasPorFechasChart : null,
			$buscarCriteriosFechaCorte : $("#buscarCriteriosFechaCorte"),
			$buscarCriteriosNumeroDias : $("#buscarCriteriosNumeroDias"),
			$formTipoBusquedaNumeroDias : $("#formTipoBusquedaNumeroDias"),
			$formTipoBusquedaFechaCorte : $("#formTipoBusquedaFechaCorte"),
			$exportarCriterioNumeroDias : $("#exportarCriterioNumeroDias"),
			$exportarCriterioFechaCorte : $("#exportarCriterioFechaCorte"),
			$criterios : $("#criterios"),
			$tipoBusquedaCriterio : $("input[type=radio][name=tipoBusquedaCriterio]"),
			$fechaCorteCriterio : $("#fechaCorteCriterio"),
			$fechaCorte : $("#fechaCorte"),
			$numeroDias : $("#numeroDias")
		};

	console.log($localTipoSolicitante.$tblReporteResumen);

	$localTipoSolicitante.$tipoBusquedaCriterio.on("change", function() {
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "numeroDias":
			$localTipoSolicitante.$numeroDias.removeClass("hidden");
			$localTipoSolicitante.$fechaCorteCriterio.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localTipoSolicitante.$formTipoBusquedaNumeroDias);
			
			break;
		case "fechaCorte":
			$localTipoSolicitante.$fechaCorteCriterio.removeClass("hidden");
			$localTipoSolicitante.$numeroDias.addClass("hidden");
			$localTipoSolicitante.$numeroDias.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localTipoSolicitante.$formTipoBusquedaFechaCorte);
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}
	});
	
//	$.fn.dataTable.ext.errMode = 'none';
//	$.fn.dataTable.moment('DD/MM/YYYY');
	
	$localTipoSolicitante.$tblReporteResumen.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$localTipoSolicitante.tblReporteResumen.clear().draw();
			break;
		}
	});

	$localTipoSolicitante.tblReporteResumen = $localTipoSolicitante.$tblReporteResumen.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "reporteEstadisticaPrestamosPorTipoSolicitante?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			console.log("sera");
			$localTipoSolicitante.$tblReporteResumen.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localTipoSolicitante.$tblReporteResumen, $localTipoSolicitante.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2],
			"className" : "all filtrable dt-left",
		}],
		"columns" : [ 
		   {
			"data" : 'tipoSolicitante',
			"title" : "Tipo Solicitante"
		}, {
			"data" : 'numeroPrestamo',
			"title" : "Numero Prestamos"
		}, {
			"data" : "promedioTiempo",
			"title" : "Promedio Tiempo"
		}],
		"order":[
			[0, "desc"]
		]
	});
	$localTipoSolicitante.$tblReporteResumen.find("thead").on('keyup', 'input.filtrable', function() {
		$localTipoSolicitante.tblReporteResumen.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localTipoSolicitante.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localTipoSolicitante.tblReporteResumen.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localTipoSolicitante.tblReporteResumenPorDia = $localTipoSolicitante.$tblReporteResumenPorDia.DataTable({
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			$localTipoSolicitante.$tblReporteResumenPorDia.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localTipoSolicitante.$tblReporteResumenPorDia, $localTipoSolicitante.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3 ],
			"className" : "all filtrable dt-center",
		} ],
		"columns" : [ 
			{
				"data" : 'fecha',
				"title" : "Fecha"
			}, {
				"data" : 'tipoSolicitante',
				"title" : "Tipo Solicitante"
			}, {
				"data" : 'numeroPrestamo',
				"title" : "Numero Prestamos"
			}, {
				"data" : "promedioTiempo",
				"title" : "Promedio Tiempo"
			}],
			"order":[
				[0, "desc"]
		]
	});

	$localTipoSolicitante.$tblReporteResumenPorDia.find("thead").on('keyup', 'input.filtrable', function() {
		$localTipoSolicitante.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localTipoSolicitante.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localTipoSolicitante.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localTipoSolicitante.$buscarCriteriosFechaCorte.on("click", function() {
		var data = $localTipoSolicitante.$formTipoBusquedaFechaCorte.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTipoSolicitante.tblReporteResumen.clear().draw();
				$localTipoSolicitante.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				console.log(response);
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localTipoSolicitante.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTipoSolicitante.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTipoSolicitante.tblReporteResumenPorDia.clear().draw();
				$localTipoSolicitante.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localTipoSolicitante.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTipoSolicitante.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
		
	$localTipoSolicitante.$buscarCriteriosNumeroDias.on("click", function() {
		var data = $localTipoSolicitante.$formTipoBusquedaNumeroDias.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTipoSolicitante.tblReporteResumen.clear().draw();
				$localTipoSolicitante.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localTipoSolicitante.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTipoSolicitante.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTipoSolicitante.tblReporteResumenPorDia.clear().draw();
				$localTipoSolicitante.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localTipoSolicitante.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTipoSolicitante.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$localTipoSolicitante.$formTipoBusquedaNumeroDias.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localTipoSolicitante.$buscarCriteriosNumeroDias.trigger("click");
			return false;
		}
	});
	
	$localTipoSolicitante.$formTipoBusquedaFechaCorte.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localTipoSolicitante.$formTipoBusquedaFechaCorte.trigger("click");
			return false;
		}
	});
	
	/* Exportación de la Información */
	
	$localTipoSolicitante.$exportarCriterioFechaCorte.on("click", function(){
		var data = $localTipoSolicitante.$formTipoBusquedaFechaCorte.serializeJSON();
		data.descripcionTipoBusqueda = $localTipoSolicitante.$formTipoBusquedaFechaCorte.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		data.descripcionFechaCorte = data.fechaCorte || $localTipoSolicitante.$fechaCorte.val();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	$localTipoSolicitante.$exportarCriterioNumeroDias.on("click", function(){
		var data = $localTipoSolicitante.$formTipoBusquedaNumeroDias.serializeJSON();
		data.descripcionTipoBusqueda = $localTipoSolicitante.$formTipoBusquedaNumeroDias.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	

});