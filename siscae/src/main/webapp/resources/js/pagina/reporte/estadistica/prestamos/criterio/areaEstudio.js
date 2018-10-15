$(document).ready(function() {
	
	var $localAreaEstudio = {
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

	console.log($localAreaEstudio.$tblReporteResumen);

	$localAreaEstudio.$tipoBusquedaCriterio.on("change", function() {
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "numeroDias":
			$localAreaEstudio.$numeroDias.removeClass("hidden");
			$localAreaEstudio.$fechaCorteCriterio.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localAreaEstudio.$formTipoBusquedaNumeroDias);
			
			break;
		case "fechaCorte":
			$localAreaEstudio.$fechaCorteCriterio.removeClass("hidden");
			$localAreaEstudio.$numeroDias.addClass("hidden");
			$localAreaEstudio.$numeroDias.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localAreaEstudio.$formTipoBusquedaFechaCorte);
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}
	});
	
//	$.fn.dataTable.ext.errMode = 'none';
//	$.fn.dataTable.moment('DD/MM/YYYY');
	
	$localAreaEstudio.$tblReporteResumen.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$localAreaEstudio.tblReporteResumen.clear().draw();
			break;
		}
	});

	$localAreaEstudio.tblReporteResumen = $localAreaEstudio.$tblReporteResumen.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "reporteEstadisticaPrestamosPorAreaEstudio?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			console.log("sera");
			$localAreaEstudio.$tblReporteResumen.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localAreaEstudio.$tblReporteResumen, $localAreaEstudio.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2],
			"className" : "all filtrable dt-left",
		}],
		"columns" : [ 
		   {
			"data" : 'escuela',
			"title" : "Escuela Profesional"
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
	$localAreaEstudio.$tblReporteResumen.find("thead").on('keyup', 'input.filtrable', function() {
		$localAreaEstudio.tblReporteResumen.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localAreaEstudio.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localAreaEstudio.tblReporteResumen.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localAreaEstudio.tblReporteResumenPorDia = $localAreaEstudio.$tblReporteResumenPorDia.DataTable({
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			$localAreaEstudio.$tblReporteResumenPorDia.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localAreaEstudio.$tblReporteResumenPorDia, $localAreaEstudio.filtrosSeleccionables);
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
				"data" : 'escuela',
				"title" : "Escuela Profesional"
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

	$localAreaEstudio.$tblReporteResumenPorDia.find("thead").on('keyup', 'input.filtrable', function() {
		$localAreaEstudio.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localAreaEstudio.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localAreaEstudio.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localAreaEstudio.$buscarCriteriosFechaCorte.on("click", function() {
		var data = $localAreaEstudio.$formTipoBusquedaFechaCorte.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localAreaEstudio.tblReporteResumen.clear().draw();
				$localAreaEstudio.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				console.log(response);
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localAreaEstudio.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localAreaEstudio.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localAreaEstudio.tblReporteResumenPorDia.clear().draw();
				$localAreaEstudio.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localAreaEstudio.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localAreaEstudio.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
		
	$localAreaEstudio.$buscarCriteriosNumeroDias.on("click", function() {
		var data = $localAreaEstudio.$formTipoBusquedaNumeroDias.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localAreaEstudio.tblReporteResumen.clear().draw();
				$localAreaEstudio.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localAreaEstudio.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localAreaEstudio.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localAreaEstudio.tblReporteResumenPorDia.clear().draw();
				$localAreaEstudio.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localAreaEstudio.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localAreaEstudio.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$localAreaEstudio.$formTipoBusquedaNumeroDias.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localAreaEstudio.$buscarCriteriosNumeroDias.trigger("click");
			return false;
		}
	});
	
	$localAreaEstudio.$formTipoBusquedaFechaCorte.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localAreaEstudio.$formTipoBusquedaFechaCorte.trigger("click");
			return false;
		}
	});
	
	/* Exportación de la Información */
	
	$localAreaEstudio.$exportarCriterioFechaCorte.on("click", function(){
		var data = $localAreaEstudio.$formTipoBusquedaFechaCorte.serializeJSON();
		data.descripcionTipoBusqueda = $localAreaEstudio.$formTipoBusquedaFechaCorte.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		data.descripcionFechaCorte = data.fechaCorte || $localAreaEstudio.$fechaCorte.val();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	$localAreaEstudio.$exportarCriterioNumeroDias.on("click", function(){
		var data = $localAreaEstudio.$formTipoBusquedaNumeroDias.serializeJSON();
		data.descripcionTipoBusqueda = $localAreaEstudio.$formTipoBusquedaNumeroDias.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	

});