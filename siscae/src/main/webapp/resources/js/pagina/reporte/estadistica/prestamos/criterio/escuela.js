$(document).ready(function() {
	
	var $localEscuela = {
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

	console.log($localEscuela.$tblReporteResumen);

	$localEscuela.$tipoBusquedaCriterio.on("change", function() {
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "numeroDias":
			$localEscuela.$numeroDias.removeClass("hidden");
			$localEscuela.$fechaCorteCriterio.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localEscuela.$formTipoBusquedaNumeroDias);
			
			break;
		case "fechaCorte":
			$localEscuela.$fechaCorteCriterio.removeClass("hidden");
			$localEscuela.$numeroDias.addClass("hidden");
			$localEscuela.$numeroDias.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($localEscuela.$formTipoBusquedaFechaCorte);
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}
	});
	
//	$.fn.dataTable.ext.errMode = 'none';
//	$.fn.dataTable.moment('DD/MM/YYYY');
	
	$localEscuela.$tblReporteResumen.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$localEscuela.tblReporteResumen.clear().draw();
			break;
		}
	});

	$localEscuela.tblReporteResumen = $localEscuela.$tblReporteResumen.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "reporteEstadisticaPrestamosPorEscuela?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			console.log("sera");
			$localEscuela.$tblReporteResumen.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localEscuela.$tblReporteResumen, $localEscuela.filtrosSeleccionables);
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
	$localEscuela.$tblReporteResumen.find("thead").on('keyup', 'input.filtrable', function() {
		$localEscuela.tblReporteResumen.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localEscuela.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localEscuela.tblReporteResumen.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localEscuela.tblReporteResumenPorDia = $localEscuela.$tblReporteResumenPorDia.DataTable({
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			$localEscuela.$tblReporteResumenPorDia.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localEscuela.$tblReporteResumenPorDia, $localEscuela.filtrosSeleccionables);
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

	$localEscuela.$tblReporteResumenPorDia.find("thead").on('keyup', 'input.filtrable', function() {
		$localEscuela.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localEscuela.$tblReporteResumen.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localEscuela.tblReporteResumenPorDia.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localEscuela.$buscarCriteriosFechaCorte.on("click", function() {
		var data = $localEscuela.$formTipoBusquedaFechaCorte.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localEscuela.tblReporteResumen.clear().draw();
				$localEscuela.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				console.log(response);
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localEscuela.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localEscuela.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localEscuela.tblReporteResumenPorDia.clear().draw();
				$localEscuela.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localEscuela.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localEscuela.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
		
	$localEscuela.$buscarCriteriosNumeroDias.on("click", function() {
		var data = $localEscuela.$formTipoBusquedaNumeroDias.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localEscuela.tblReporteResumen.clear().draw();
				$localEscuela.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$localEscuela.tblReporteResumen.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localEscuela.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$localEscuela.tblReporteResumenPorDia.clear().draw();
				$localEscuela.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$localEscuela.tblReporteResumenPorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$localEscuela.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$localEscuela.$formTipoBusquedaNumeroDias.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localEscuela.$buscarCriteriosNumeroDias.trigger("click");
			return false;
		}
	});
	
	$localEscuela.$formTipoBusquedaFechaCorte.find("input").keypress(function(event) {
		if (event.which == 13) {
			$localEscuela.$formTipoBusquedaFechaCorte.trigger("click");
			return false;
		}
	});
	
	/* Exportación de la Información */
	
	$localEscuela.$exportarCriterioFechaCorte.on("click", function(){
		var data = $localEscuela.$formTipoBusquedaFechaCorte.serializeJSON();
		data.descripcionTipoBusqueda = $localEscuela.$formTipoBusquedaFechaCorte.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		data.descripcionFechaCorte = data.fechaCorte || $localEscuela.$fechaCorte.val();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	$localEscuela.$exportarCriterioNumeroDias.on("click", function(){
		var data = $localEscuela.$formTipoBusquedaNumeroDias.serializeJSON();
		data.descripcionTipoBusqueda = $localEscuela.$formTipoBusquedaNumeroDias.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/estadistica/prestamos?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	

});