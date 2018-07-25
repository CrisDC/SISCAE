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
		
		$cmbTipoTramite : $("#cmbTiposTramite"),
		$cmbTipoDocumento : $("#cmbTiposDocumento"),
		
		$buscarCriterios : $("#buscarCriterios"),
		$rangoFechaBusqueda : $("#rangoFechaBusqueda"),
		$criterios : $("#criterios")
	};

	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales"); 
	
	$funcionUtil.crearSelect2($local.$selectTipoDocumento);

	$.fn.dataTable.ext.errMode = 'none';
	$funcionUtil.crearSelect2($local.$cmbTipoDocumento);
	$funcionUtil.crearSelect2($local.$cmbTipoTramite);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechaBusqueda);

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
			"url" : "",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se han encontrado documentos con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$membresiasFiltroParaTableMantenimiento.html();
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4],
			"className" : "all filtrable",
		},  {
			"targets" : 5,
			"className" : "all dt-center",
			"width" : "10%",
			"render" : function() {
				return "" + $variableUtil.botonVerDetalle;
			}
		} ],
		"columns" : [ {
			"data" : 'numeroExpediente',
			"title" : "N° Expediente"
		},{
			"data" : 'numeroEmision',
			"title" : "N° Emisión"
		},{
			"data" : 'Asunto',
			"title" : "Motivo"
		},{
			"data" : 'dependenciaElabora',
			"title" : "Dependencia Emisora"
		},{
			"data" : 'numeroDocumentoDescripcion',
			"title" : "N° Documento"
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
		if (!$formBusquedaTipoDocumento.valid()) {
			return;
		}
		var criterioBusqueda = $formBusquedaTipoDocumento.serializeJSON();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "consultaDocumentos?accion=buscarPorDocumento",
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
				$local.tablaMantenimiento.clear().draw();
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionLiberadas) {
				console.log(transaccionLiberadas)
				if (transaccionLiberadas.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaMantenimiento.rows.add(transaccionLiberadas).draw();
			},
			complete : function() {
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$buscarCriterios.on("click", function() {
		if (!$formBusquedaCriterios.valid()) {
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaCriterios)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			var criterioBusqueda = $formBusquedaCriterios.serializeJSON();
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "consultaDocumentos?accion=buscarPorCriterio",
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
					$local.tablaMantenimiento.clear().draw();
					$local.$buscarCriterios.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(transaccionLiberadas) {
					if (transaccionLiberadas.length == 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					$local.tablaMantenimiento.rows.add(transaccionLiberadas).draw();
				},
				complete : function() {
					$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
	});
	
	$local.$tablaMantenimiento.children("tbody").on("click", ".descargar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var documento = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		var data = documento.numeroEmision;	   
		window.open($variableUtil.root + "consultaDocumentos?accion=buscarPorNumeroEmision&numeroEmision=" + data, "_blank");
	});

	

	
});