$(document).ready(function() {
	
	var $local = {
			$tblReporteResumen : $("#tblReporteResumen"),
			tblReporteResumen : "",
			
			$btnBuscarPorCriterio : $("#btnBuscarPorCriterio"),
			
			$tblReporteDetalle: $("#tblReporteDetalle"),
			tblReporteDetalle : "",
			$tblReporteDetallePorDia : $("#tblReporteDetallePorDia"),
			tblReporteDetallePorDia : "",
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

	console.log($local.$tblReporteDetalle);
	//$funcionUtil.crearDatePickerSimple($local.$fechaCorte, "YYYY-MM-DD");
	
	
	$local.$tipoBusquedaCriterio.on("change", function() {
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "numeroDias":
			$local.$numeroDias.removeClass("hidden");
			$local.$fechaCorteCriterio.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($local.$formTipoBusquedaNumeroDias);
			
			break;
		case "fechaCorte":
			$local.$fechaCorteCriterio.removeClass("hidden");
			$local.$numeroDias.addClass("hidden");
			$local.$numeroDias.addClass("hidden");
			$funcionUtil.limpiarCamposFormulario($local.$formTipoBusquedaFechaCorte);
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}
	});
	
//	$.fn.dataTable.ext.errMode = 'none';
//	$.fn.dataTable.moment('DD/MM/YYYY');
	
	$local.$tblReporteDetalle.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tblReporteDetalle.clear().draw();
			break;
		}
	});

	$local.$tblReporteResumen.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tblReporteDetalle.clear().draw();
			break;
		}
	});

	$local.tblReporteDetalle = $local.$tblReporteDetalle.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
		},
		"initComplete" : function() {
			console.log("sera");
			$local.$tblReporteDetalle.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblReporteDetalle, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7],
			"className" : "all filtrable dt-left",
		}],
		"columns" : [ {
			"data":'recurso',
			"title":'Recurso'
		},
			{
			"data" : 'escuela',
			"title" : "Escuela Profesional"
		}, {
			"data" : 'codigo',
			"title" : "Código"
		}, {
			"data" : "nombre",
			"title" : "Nombre"
		}, {
			"data" : "appPaterno",
			"title" : "Ap. Paterno"
		}, {
			"data" : "appMaterno",
			"title" : "Ap. Materno"
		}, {
			"data" : "estadia",
			"title" : "Estadía"
		}, {
			"data" : "areaEstudio",
			"title" : "Área de Estudio"
		}],
		"order":[
			[0, "desc"]
		]
	});
	$local.$tblReporteDetalle.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tblReporteDetalle.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblReporteDetalle.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblReporteDetalle.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$local.tblReporteDetallePorDia = $local.$tblReporteDetallePorDia.DataTable({
		"language" : {
			"emptyTable" : "No se han encontrado Autorizaciones con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tblReporteDetallePorDia.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblReporteDetallePorDia, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4 ],
			"className" : "all filtrable dt-center",
		} ],
		"columns" : [ {
			"data" : 'fechaTxn',
			"title" : "Fecha Txn"
		}, {
			"data" : 'numeroTxnConciliadas',
			"title" : "N° Txn Conciliadas"
		}, {
			"data" : 'numeroTxnNoConciliadas',
			"title" : "N° Txn No Conciliadas"
		}, {
			"data" : 'numeroTotal',
			"title" : "N° Txn Total"
		}, {
			"data" : 'numeroDias',
			"title" : "N° Días"
		} ]
	});

	$local.$tblReporteDetallePorDia.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tblReporteDetallePorDia.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblReporteDetalle.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblReporteDetallePorDia.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$local.$buscarCriteriosFechaCorte.on("click", function() {
		var data = $local.$formTipoBusquedaFechaCorte.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$local.tblReporteDetalle.clear().draw();
				$local.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				console.log(response);
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tblReporteDetalle.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$local.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$local.tblReporteDetallePorDia.clear().draw();
				$local.$buscarCriteriosFechaCorte.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$local.tblReporteDetallePorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$local.$buscarCriteriosFechaCorte.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$exportarCriterioFechaCorte.on("click", function(){
		var data = $local.$formTipoBusquedaFechaCorte.serializeJSON();
		data.descripcionTipoBusqueda = $local.$formTipoBusquedaFechaCorte.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		data.descripcionFechaCorte = data.fechaCorte || $local.$fechaCorte.val();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/logautorizacion/noConciliadas?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	$local.$exportarCriterioNumeroDias.on("click", function(){
		var data = $local.$formTipoBusquedaNumeroDias.serializeJSON();
		data.descripcionTipoBusqueda = $local.$formTipoBusquedaNumeroDias.find("input[name='tipoBusqueda']:checked").parent().text().trim();
		var paramCriterioBusqueda = $.param(data);
		window.location.href = $variableUtil.root + "reporte/logautorizacion/noConciliadas?accion=buscarPorCriterios&" + paramCriterioBusqueda;
	});
	
	$local.$formTipoBusquedaFechaCorte.find("input").keypress(function(event) {
		if (event.which == 13) {
			$local.$formTipoBusquedaFechaCorte.trigger("click");
			return false;
		}
	});
	
	$local.$buscarCriteriosNumeroDias.on("click", function() {
		
		var data = $local.$formTipoBusquedaNumeroDias.serialize();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorCriterios",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$local.tblReporteDetalle.clear().draw();
				$local.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tblReporteDetalle.rows.add(response).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$local.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
			contentType : "application/json",
			dataType : "json",
			data : data,
			beforeSend : function() {
				$local.tblReporteDetallePorDia.clear().draw();
				$local.$buscarCriteriosNumeroDias.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionesPorDia) {
				if (transaccionesPorDia.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				transaccionesNoConciliadasPorFechasChart.dataProvider = transaccionesPorDia;
				transaccionesNoConciliadasPorFechasChart.validateData();
				$local.tblReporteDetallePorDia.rows.add(transaccionesPorDia).draw();
			},
			error : function(response) {

			},
			complete : function() {
				$local.$buscarCriteriosNumeroDias.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$formTipoBusquedaNumeroDias.find("input").keypress(function(event) {
		if (event.which == 13) {
			$local.$buscarCriteriosNumeroDias.trigger("click");
			return false;
		}
	});
	

});