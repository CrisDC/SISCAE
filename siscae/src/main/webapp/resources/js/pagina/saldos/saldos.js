$(document).ready(function() {
	
var $local = {
		$tablaMantenimiento : $("#tablaConsulta"),
		tablaMantenimiento : "",
		$filaSeleccionada : "",
		$membresiasFiltroParaTableMantenimiento : $("#membresias-filtroParaTablaMantenimiento"),
		filtrosSeleccionables : [],
		$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
		$tipoDocumento : $("#tipoDocumento"),
		$btnBuscarPorDocumentoCliente : $("#btnBuscarPorDocumentoCliente"),
		$selectTipoDocumento : $("#selectTipoDocumento"),
		$txtNumDocumentoCliente : $("#txtNumDocumentoCliente"),
		$canalFiltroParaTablaConsulta : $("#canalFiltroParaTablaConsulta"),
		$codigoProcesoFiltroParaTablaConsulta : $("#codigoProcesoFiltroParaTablaConsulta"),
		$buscarCriterios : $("#buscarCriterios"),
		$rangoFechasTransaccion : $("#rangoFechasTransaccion"),
		$criterios : $("#criterios"),
		$binFiltroTablaConsulta : $("#binFiltroTablaConsulta"),
		$exportarXlsx : $("#exportarXlsx")
	};

	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	$funcionUtil.crearSelect2($local.$selectTipoDocumento, "Seleccione un Tipo de Documento");

	$.fn.dataTable.ext.errMode = 'none';
	$funcionUtil.crearSelect2($local.$canalFiltroParaTablaConsulta);
	$funcionUtil.crearSelect2($local.$codigoProcesoFiltroParaTablaConsulta);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechasTransaccion);

	$local.$tablaMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaMantenimiento.clear().draw();
			$funcionUtil.notificarException(xhr.responseText, "Error Interno", "danger");
			break;
		}
	});

	$local.tablaMantenimiento = $local.$tablaMantenimiento.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "saldos?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se ha encontrado Saldos con los criterios definidos"
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$membresiasFiltroParaTableMantenimiento.html();
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6],
			"className" : "all filtrable",
		}],
		"columns" : [ {
			"data" : 'numeroTarjeta',
			"title" : "N° Tarjeta"
		},{
			"data" : 'fechaProceso',
			"title" : "Fecha Proceso"
		},{
			"data" : 'saldoDisponible',
			"title" : "Saldo"
		},{
			"data" : 'idCuenta',
			"title" : "Id Cuenta"
		},{
			"data" : 'idBIN',
			"title" : "Id BIN"
		},{
			"data" : 'idSubBIN',
			"title" : "Id SubBIN"
		},{
			"data" : 'moneda',
			"title" : "Moneda"
		} ]
	});
	
	$local.$binFiltroTablaConsulta.on("change", function(event, opcionSeleccionada) {
		var codigoBIN = $(this).val();
		if (codigoBIN == null || codigoBIN == undefined) {
			$local.$subBin.find("option:not(:eq(0))").remove();
			return;
		}
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "subBin/bin/" + codigoBIN,
			beforeSend : function(xhr) {
				$local.$subBin.find("option:not(:eq(0))").remove();
				$local.$subBin.parent().append("<span class='help-block cargando'><i class='fa fa-spinner fa-pulse fa-fw'></i> Cargando clases de servicio</span>")
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(subBines) {
				$.each(subBines, function(i, subBin) {
					$local.$subBin.append($("<option />").val(this.codigoSubBIN).text(this.codigoSubBIN + " - " + this.descripcion));
				});
				if (opcionSeleccionada != null && opcionSeleccionada != undefined) {
					$local.$subBin.val(opcionSeleccionada).trigger("change.select2");
				}
			},
			complete : function() {
				$local.$subBin.parent().find(".cargando").remove();
			}
		});
	});

	$local.$tablaMantenimiento.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	$local.$tipoBusqueda.on("change", function(){
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "tipoDocumento":
			$local.$tipoDocumento.removeClass("hidden");
			$local.$criterios.addClass("hidden");
			break;
		case "criterios":
			$local.$tipoDocumento.addClass("hidden");
			$local.$criterios.removeClass("hidden");
			break;
		default:
			$funcionUtil.notificarException("Seleccione un Tipo de Búsqueda válido", "fa-warning", "Aviso", "warning");
		}		
	});
	
	$formBusquedaTipoDocumento.find("input").keypress(function(event) {
		if (!$formBusquedaTipoDocumento.valid()) {
			return;
		}
		if (event.which == 13) {
			$local.$btnBuscarPorDocumentoCliente.trigger("click");
			return false;
		}
	});
	
	$local.$btnBuscarPorDocumentoCliente.on("click",function(){
		var tipoDocumento = $local.$selectTipoDocumento.val();
		var numeroDocumento = $local.$txtNumDocumentoCliente.val();
		$local.tablaMantenimiento.ajax.url($variableUtil.root + "txnsPendientes?accion=buscarPorDocumento&tipoDocumento=" + tipoDocumento +"&numeroDocumento=" + numeroDocumento).load();
	});
	
	$local.$buscarCriterios.on("click", function() {
		if (!$formBusquedaCriterios.valid()) {
			return;
		}
		var rangoFechaTxn = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechasTransaccion);
		var data = $formBusquedaCriterios.serialize();
		$local.tablaMantenimiento.ajax.url($variableUtil.root + "txnsPendientes?accion=buscarPorFiltro&fechaInicioTransaccion=" + rangoFechaTxn.fechaInicio + "&fechaFinTransaccion=" + rangoFechaTxn.fechaFin + "&" + data).load();
	});
	
	$local.$exportarXlsx.on("click", function() {
		
		window.location.href = $variableUtil.root + "/reporte/prepago/contabilidad/saldos?accion=exportar";
	});
	
});