$(document).ready(function() {
	
	var $localTurno = {
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

	console.log($localTurno.$tblReporteResumen);

	$localTurno.$tipoBusquedaCriterio.on("change", function() {
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "numeroDias":
			$localTurno.$numeroDias.removeClass("hidden");
			$localTurno.$fechaCorteCriterio.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localTurno.$formTipoBusquedaNumeroDias);
			
			break;
		case "fechaCorte":
			$localTurno.$fechaCorteCriterio.removeClass("hidden");
			$localTurno.$numeroDias.addClass("hidden");
			$localTurno.$numeroDias.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localTurno.$formTipoBusquedaFechaCorte);
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}
	});
	
//	$.fn.dataTable.ext.errMode = 'none';
//	$.fn.dataTable.moment('DD/MM/YYYY');
	
	$localTurno.$tblReporteResumen.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$localTurno.tblReporteResumen.clear().draw();
			break;
		}
	});

	$localTurno.tblReporteResumen = $localTurno.$tblReporteResumen.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "reporteEstadisticaPrestamosPorEscuela?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			console.log("sera");
			$localTurno.$tblReporteResumen.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localTurno.$tblReporteResumen, $localTurno.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2],
			"className" : "all filtrable dt-left",
		}],
		"columns" : [ 
		   {
			"data" : 'turno',
			"title" : "Turno"
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
	$localTurno.$tblReporteResumen.find("thead").on('keyup', 'input.filtrable', function() {
		$localTurno.tblReporteResumen.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localTurno.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localTurno.tblReporteResumen.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localTurno.tblReporteResumenPorDia = $localTurno.$tblReporteResumenPorDia.DataTable({
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			$localTurno.$tblReporteResumenPorDia.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localTurno.$tblReporteResumenPorDia, $localTurno.filtrosSeleccionables);
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
				"data" : 'turno',
				"title" : "Turno"
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

	$localTurno.$tblReporteResumenPorDia.find("thead").on('keyup', 'input.filtrable', function() {
		$localTurno.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localTurno.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localTurno.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localTurno.$buscarCriteriosFechaCorte.on("click", function() {
		var data = $localTurno.$formTipoBusquedaFechaCorte.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTurno.tblReporteResumen.clear().draw();
				$localTurno.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				console.log(response);
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localTurno.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTurno.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTurno.tblReporteResumenPorDia.clear().draw();
				$localTurno.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localTurno.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTurno.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
		
	$localTurno.$buscarCriteriosNumeroDias.on("click", function() {
		var data = $localTurno.$formTipoBusquedaNumeroDias.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTurno.tblReporteResumen.clear().draw();
				$localTurno.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localTurno.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTurno.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localTurno.tblReporteResumenPorDia.clear().draw();
				$localTurno.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localTurno.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localTurno.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$localTurno.$formTipoBusquedaNumeroDias.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localTurno.$buscarCriteriosNumeroDias.trigger("click");
			return false;
		}
	});
	
	$localTurno.$formTipoBusquedaFechaCorte.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localTurno.$formTipoBusquedaFechaCorte.trigger("click");
			return false;
		}
	});
	
	/* Exportación de la Información */
	
	$localTurno.$exportarCriterioFechaCorte.on("click", function(){
		var data = $localTurno.$formTipoBusquedaFechaCorte.serializeJSON();
		data.descripcionTipoBusqueda = $localTurno.$formTipoBusquedaFechaCorte.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		data.descripcionFechaCorte = data.fechaCorte || $localTurno.$fechaCorte.val();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	$localTurno.$exportarCriterioNumeroDias.on("click", function(){
		var data = $localTurno.$formTipoBusquedaNumeroDias.serializeJSON();
		data.descripcionTipoBusqueda = $localTurno.$formTipoBusquedaNumeroDias.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	

});