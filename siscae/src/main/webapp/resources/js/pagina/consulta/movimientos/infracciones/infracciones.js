$(document).ready(function() {

	var $local = {
		$tblConsulta : $("#tblConsulta"),
		$rowSeleccionada : "",		
		$irbTipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
		
		$pnlNumeroDocumentoIdentidad : $("#pnlNumeroDocumentoIdentidad"),		
		$pnlCriterios : $("#pnlCriterios"),
		
		$txtNumeroDocumentoIdentidad : $("#txtNumeroDocumentoIdentidad"),
		
		$cmbTipoDocumentoIdentidad : $("#cmbTipoDocumentoIdentidad"),
		$cmbTipoTramite : $("#cmbTipoTramite"),
		$cmbTipoDocumento : $("#cmbTipoDocumento"),
		
		$btnBuscarPorNumeroDocumentoIdentidad : $("#btnBuscarPorNumeroDocumentoIdentidad"),
		$btnBuscarPorCriterio : $("#btnBuscarCriterios"),
		
		$drpFechaBusqueda : $("#drpFechaBusqueda"),
		
		tblConsulta : "",
		fltSeleccionables : [],
		urlBasePagina : 'documento-publico'
	};
	
	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	
	$.fn.dataTable.ext.errMode = 'none';
	
	$funcionUtil.crearSelect2($local.$cmbTipoDocumentoIdentidad);
	$funcionUtil.crearSelect2($local.$cmbTipoTramite);
	$funcionUtil.crearDateRangePickerConsulta($local.$drpFechaBusqueda);

	$local.$tblConsulta.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) { 
		case 500:
			$local.tblConsulta.clear().draw();
			$funcionUtil.notificarException(xhr.responseText, "Error Interno", "danger");
			break;
		}
	});

	$local.tblConsulta = $local.$tblConsulta.DataTable({
		"language" : {
			"emptyTable" : "No se han encontrado documentos con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tblConsulta.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta, $local.fltSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3],
			"className" : "all filtrable",
		},{
			"targets" : 4,
			"className" : "all dt-center",
			"width" : "10%",
			"render" : function() {
				return "" + $variableUtil.botonVerDetalle;
			}
		}],
		"columns" : [ 
		  {
			"data" : 'numeroExpediente',
			"title" : "N° Expediente"
		},{
			"data" : 'descripcionTipoTramite',
			"title" : "Trámite"
		},{
			"data" : 'descripcionDocumento',
			"title" : "Documento"
		},{
			"data" : 'descripcionDependencia',
			"title" : "Dependencia"
		}, {
			"data" : null,
			"title" : 'Acción'
		}
		]
		/*,
		"createdRow": function( row, data, dataIndex ) {
            if ( data.estadoTarjeta == "ACTIVA" ) {
                $( row ).css( "background-color", "Green" );
                $( row ).addClass( "success" );
            }else{
            	$( row ).css( "background-color", "Red" );
                $( row ).addClass( "danger" );
            }
        }*/
	});

	$local.$tblConsulta.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	$local.$irbTipoBusqueda.on("change", function(){
		var tipoBusqueda = $(this).val();
		switch (tipoBusqueda) {
		case "tipoDocumento":
			$local.$pnlNumeroDocumentoIdentidad.removeClass("hidden");
			$local.$pnlCriterios.addClass("hidden");
			break;
		case "criterios":
			$local.$pnlNumeroDocumentoIdentidad.addClass("hidden");
			$local.$pnlCriterios.removeClass("hidden");
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
			$local.$btnBuscarPorNumeroDocumentoIdentidad.trigger("click");
			return false;
		}
	});
	
	$local.$btnBuscarPorNumeroDocumentoIdentidad.on("click",function(){
		if (!$formBusquedaTipoDocumento.valid()) {
			return;
		}
		var criterioBusqueda = $formBusquedaTipoDocumento.serializeJSON();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + $local.urlBasePagina + "?accion=buscarPorNumeroDocumentoIdentificacion",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
				}
			},
			beforeSend : function() {
				$local.tblConsulta.clear().draw();
				$local.$btnBuscarPorNumeroDocumentoIdentidad.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionLiberadas) {
				console.log(transaccionLiberadas)
				if (transaccionLiberadas.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tblConsulta.rows.add(transaccionLiberadas).draw();
			},
			complete : function() {
				$local.$btnBuscarPorNumeroDocumentoIdentidad.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$btnBuscarPorCriterio.on("click", function() {
		if (!$formBusquedaCriterios.valid()) {
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaCriterios)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			var criterioBusqueda = $formBusquedaCriterios.serializeJSON();
			console.log(criterioBusqueda);
			$.ajax({
				type : "GET",
				url : $variableUtil.root + $local.urlBasePagina + "?accion=buscarPorCriterio",
				data : criterioBusqueda,
				statusCode : {
					400 : function(response) {
						$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
						$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
						$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
						$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
					}
				},
				beforeSend : function() {
					$local.tblConsulta.clear().draw();
					$local.$btnBuscarPorCriterio.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(transaccionLiberadas) {
					if (transaccionLiberadas.length == 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					$local.tblConsulta.rows.add(transaccionLiberadas).draw();
				},
				complete : function() {
					$local.$btnBuscarPorCriterio.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
	});
	
	$local.$tblConsulta.children("tbody").on("click", ".descargar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var documento = $local.tblConsulta.row($local.$filaSeleccionada).data();
		var numeroEmision = documento.numeroEmision;	   
		var anio = documento.anio;	   
		window.open($variableUtil.root + $local.urlBasePagina + "?accion=buscarParaDescarga&numeroEmision=" + numeroEmision + "&anio="+anio, "_blank");
	});

	

	
});