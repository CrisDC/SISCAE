$(document).ready(function() {

	var $local = {
		$tablaMantenimiento : $("#tablaConsulta"),
		tablaMantenimiento : "",
		$filaSeleccionada : "",
		filtrosSeleccionables : [],
		$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
		$tipoDocumento : $("#tipoDocumento"),
		$btnBuscarPorDocumentoCliente : $("#btnBuscarPorDocumentoCliente"),
		$selectTipoDocumento : $("#selectTipoDocumento"),
		$txtNumDocumentoCliente : $("#txtNumDocumentoCliente"),
		$canalFiltroParaTablaConsulta : $("#canalFiltroParaTablaConsulta"),
		$codigoProcesoFiltroParaTablaConsulta : $("#codigoProcesoFiltroParaTablaConsulta"),
		$buscarCriterios : $("#buscarCriterios"),
		$rangoFechasTransaccion : $("#rangoFechaMovimientos"),
		$criterios : $("#criterios"),
		$operaciones : $("#operaciones"),
		
		$modalDetalleOperacion : $("#modalDetalleOperacion"),

		$activar : $("#activar"),
		$recargar : $("#recargar"),
		$reasignar : $("#reasignar"),
		$bloquear : $("#bloquear"),
		
		
		$btnReasignar : $("#btnReasignar"),
		$btnRecargar : $("#btnRecargar"),
		$btnActivar : $("#btnActivar"),
		$btnBloquear : $("#btnBloquear")
		
	};

	var criterioBusqueda;
	
	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	$formBusquedaOperaciones = $("#formBusquedaOperaciones");
	
	$formActivar = $("#form-activar");
	$formRecargar = $("#form-recargar");
	$formReasignar = $("#form-reasignar");
	$formBloquear = $("#form-bloquear");
	
	$funcionUtil.crearSelect2($local.$selectTipoDocumento, "Seleccione un Tipo de Documento");

	$.fn.dataTable.ext.errMode = 'none';
	$funcionUtil.crearSelect2($local.$canalFiltroParaTablaConsulta);
	$funcionUtil.crearSelect2($local.$codigoProcesoFiltroParaTablaConsulta);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechasTransaccion);


	$local.$modalDetalleOperacion.PopupWindow({
		title : "Operación",
		autoOpen : false,
		modal : false,
		height : 390,
		width : 400,
	});

	$local.$modalDetalleOperacion.on("open.popupwindow", function() {
		$formActivar.find("input:not([disabled]):first").focus();
		$formRecargar.find("input:not([disabled]):first").focus();
		$formReasignar.find("input:not([disabled]):first").focus();
		$formBloquear.find("input:not([disabled]):first").focus();
	});

	
	$local.$tablaMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaMantenimiento.clear().draw();
			$funcionUtil.notificarException(xhr.responseText, "Error Interno", "danger");
			break;
		}
	});

	$local.tablaMantenimiento = $local.$tablaMantenimiento.DataTable({
		"language" : {
			"emptyTable" : "No se han encontrado Movimientos con los criterios definidos.",
			"processing" : "Procesando..."
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7,8],
			"className" : "all filtrable",
		}],
		"columns" : [ {
			"data" : 'secuencia',
			"title" : "Secuencia"
		},{
			"data" : 'tipo',
			"title" : "Tipo"
		},{
			"data" : 'monto',
			"title" : "Monto"
		},{
			"data" : 'costo',
			"title" : "Costo"
		},{
			"data" : 'hora',
			"title" : "Hora"
		},{
			"data" : 'fecha',
			"title" : "Fecha"
		},{
			"data" : 'comercio',
			"title" : "Comercio"
		},{
			"data" : 'codigoOperacion',
			"title" : "Código de Operación"
		},{
			"data" : 'tarjetaTruncada',
			"title" : "Tarjeta truncada"
		}]
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
			$local.$operaciones.addClass("hidden");
			break;
		case "criterios":
			$local.$tipoDocumento.addClass("hidden");
			$local.$criterios.removeClass("hidden");
			$local.$operaciones.addClass("hidden");
			break;
		case "operaciones":
			$local.$tipoDocumento.addClass("hidden");
			$local.$criterios.addClass("hidden");
			$local.$operaciones.removeClass("hidden");
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
		obtenerSaldo();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "prepago/wshub/consultaMovimientos?accion=buscarPorDocumento",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
				}, 
				409 : function(response) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
				}
			},
			beforeSend : function() {
				$local.tablaMantenimiento.clear().draw();
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(consultaMovimientos) {
				if (consultaMovimientos.movimientos.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				
				$local.tablaMantenimiento.rows.add(consultaMovimientos.movimientos).draw();
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
			var rangoFechaTxn = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechasTransaccion);
			criterioBusqueda.fechaInicioTransaccion = rangoFechaTxn.fechaInicio;
			criterioBusqueda.fechaFinTransaccion = rangoFechaTxn.fechaFin;
			obtenerSaldo(criterioBusqueda);
			obtenerMovimientos(criterioBusqueda);
		}
	});
	
	
	function obtenerMovimientos(criterioBusqueda){
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "prepago/wshub/consultaMovimientos?accion=buscarPorFiltro",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
				}, 
				409 : function(response) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
				}
			},
			beforeSend : function() {
				$local.tablaMantenimiento.clear().draw();
				$local.$buscarCriterios.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				
				$(".dataTables_processing").show();
				
			},
			success : function(consultaMovimientos) {
				console.log(consultaMovimientos);
				if (consultaMovimientos == null) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}

				if (consultaMovimientos.movimientos != null) {
					$local.tablaMantenimiento.rows.add(consultaMovimientos.movimientos).draw();
				}
			},
			complete : function() {
				$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				$(".dataTables_processing").hide();
			}
		});
		
		
	}
	
	function obtenerSaldo(criterioBusqueda){
			
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "prepago/wshub/consultaSaldo?accion=buscarPorFiltro",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
				}, 
				409 : function(response) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
				}
			},
			success : function(consultaSaldos) {
				if(consultaSaldos != null ){
					if(consultaSaldos.moneda != null && consultaSaldos.monto != null){
						$("#datoAdicional").text("Saldo a la fecha/ Moneda: " + consultaSaldos.moneda + " / Monto: " + consultaSaldos.monto)
					} else {
						$("#datoAdicional").text("Saldo no disponible. Verifique que la tarjeta no este bloqueada.");
					}
				}
			}
		});
	}
	
	$local.$activar.on("click", function() {
		if (!$formBusquedaOperaciones.valid()) {
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaOperaciones)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			//$funcionUtil.limpiarFormulario($formDetalleOperaciones);
			$formActivar.find("#numeroTarjeta").val($("#tarjetaCriterio").val());
			$formActivar.removeClass("hidden");
			$formRecargar.addClass("hidden");
			$formReasignar.addClass("hidden");
			$formBloquear.addClass("hidden");
			$local.$modalDetalleOperacion.PopupWindow("open");
		}
	});
	
	$local.$recargar.on("click", function() {
		if (!$formBusquedaOperaciones.valid()) {
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaOperaciones)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			//$funcionUtil.limpiarFormulario($formDetalleOperaciones);
			$formRecargar.find("#numeroTarjeta").val($("#tarjetaCriterio").val());
			$formActivar.addClass("hidden");
			$formRecargar.removeClass("hidden");
			$formReasignar.addClass("hidden");
			$formBloquear.addClass("hidden");
			$local.$modalDetalleOperacion.PopupWindow("open");
		}
	});
	
	$local.$reasignar.on("click", function() {
		if (!$formBusquedaOperaciones.valid()) {
			
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaOperaciones)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			//$funcionUtil.limpiarFormulario($formDetalleOperaciones);
			$formReasignar.find("#numeroTarjetaAnterior").val($("#tarjetaCriterio").val());
			$formActivar.addClass("hidden");
			$formRecargar.addClass("hidden");
			$formReasignar.removeClass("hidden");
			$formBloquear.addClass("hidden");
			$local.$modalDetalleOperacion.PopupWindow("open");
		}
	});
	
	$local.$bloquear.on("click", function() {
		if (!$formBusquedaOperaciones.valid()) {
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaOperaciones)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			$formBloquear.find("#numeroTarjetaAnterior").val($("#tarjetaCriterio").val());
		
			//$funcionUtil.limpiarFormulario($formDetalleOperaciones);
			$formActivar.addClass("hidden");
			$formRecargar.addClass("hidden");
			$formReasignar.addClass("hidden");
			$formBloquear.removeClass("hidden");
			$local.$modalDetalleOperacion.PopupWindow("open");
		}
	});
	
	$local.$btnReasignar.on("click", function() {
			criterioBusqueda = $formReasignar.serializeJSON();
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "prepago/wshub/reasignarTarjeta",
				data : criterioBusqueda,
				statusCode : {
					400 : function(response) {
						$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
						$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
						$funcionUtil.limpiarMensajesDeError($formBusquedaOperaciones);
						$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
						$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
						$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaOperaciones);
					}, 
					409 : function(response) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
					}
				},
				beforeSend : function() {
					$local.$btnReasignar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(respuesta) {
					if (respuesta == null) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					if (respuesta.id != null) {
						if(respuesta.id == "0"){
							$funcionUtil.notificarException("Se reasignó con éxito." , "fa-exclamation-circle", "Información", "info");
						} else {
							$funcionUtil.notificarException("No se reasignó con éxito. " + respuesta.id + "- " + respuesta.descripcion , "fa-exclamation-circle", "Información", "warning");
						
						}
					
					} else {
						$funcionUtil.notificarException("No se obtuvo respuesta del WS." , "fa-exclamation-circle", "Información", "warning");
						
					}
					$local.$modalDetalleOperacion.PopupWindow("close");
				},
				complete : function() {
					$local.$btnReasignar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		
	});
		
	$local.$btnRecargar.on("click", function() {
		var formRecarga = $formRecargar.serializeJSON();

		$.ajax({
			type : "GET",
			url : $variableUtil.root + "prepago/wshub/recargarTarjeta",
			data : formRecarga,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.limpiarMensajesDeError($formBusquedaOperaciones);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaOperaciones);
				}, 
				409 : function(response) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
				}
			},
			beforeSend : function() {
				$local.$btnRecargar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(respuesta) {
				
				if (respuesta == null) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				if (respuesta.id != null) {
					if(respuesta.id == "0"){
						$funcionUtil.notificarException("Se recargó con éxito." , "fa-exclamation-circle", "Información", "info");
						obtenerSaldo(formRecarga);
						obtenerMovimientos(formRecarga);
						
					} else {
						$funcionUtil.notificarException("No se recargó con éxito. " + respuesta.id + "- " + respuesta.descripcion , "fa-exclamation-circle", "Información", "warning");
						
					}
				
				} else {
					$funcionUtil.notificarException("No se obtuvo respuesta del WS" , "fa-exclamation-circle", "Información", "warning");
					
				}
				$local.$modalDetalleOperacion.PopupWindow("close");
				
			},
			complete : function() {
				$local.$btnRecargar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	
	});
	
	$local.$btnActivar.on("click", function() {
		var criterioBusqueda = $formActivar.serializeJSON();

		$.ajax({
			type : "GET",
			url : $variableUtil.root + "prepago/wshub/activarTarjeta",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.limpiarMensajesDeError($formBusquedaOperaciones);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaOperaciones);
					
				}, 
				409 : function(response) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
				}
			},
			beforeSend : function() {
				$local.$btnActivar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(respuesta) {
				
				if (respuesta == null) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				//5339820100000019
				//5339820200005223
				if (respuesta.id != null) {
					if(respuesta.id == "0"){
						$funcionUtil.notificarException("Se activó con éxito." , "fa-exclamation-circle", "Información", "info");
					} else {
						$funcionUtil.notificarException("No se activó con éxito. " + respuesta.id + "- " + respuesta.descripcion , "fa-exclamation-circle", "Información", "info");
						
					}
				
				} else {
					$funcionUtil.notificarException("No se obtuvo respuesta del WS" , "fa-exclamation-circle", "Información", "warning");
					
				}
				$local.$modalDetalleOperacion.PopupWindow("close");
			},
			complete : function() {
				$local.$btnActivar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	
	});
	
	$local.$btnBloquear.on("click", function() {
		var criterioBusqueda = $formBloquear.serializeJSON();
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "prepago/wshub/bloquearTarjeta",
			data : criterioBusqueda,
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formBusquedaTipoDocumento);
					$funcionUtil.limpiarMensajesDeError($formBusquedaCriterios);
					$funcionUtil.limpiarMensajesDeError($formBusquedaOperaciones);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaCriterios);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaTipoDocumento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formBusquedaOperaciones);
				}, 
				409 : function(response) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados , "fa-exclamation-circle", "Información", "info");
				}
			},
			beforeSend : function() {
				$local.$btnBloquear.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(respuesta) {
				
				if (respuesta.id != null) {
					if(respuesta.id == "0"){
						$funcionUtil.notificarException("Se bloqueó con éxito." , "fa-exclamation-circle", "Información", "info");
					} else {
						$funcionUtil.notificarException("No se bloqueó con éxito. " + respuesta.id + "- " + respuesta.descripcion , "fa-exclamation-circle", "Información", "info");
						
					}
				
				} else {
					$funcionUtil.notificarException("No se obtuvo respuesta del WS" , "fa-exclamation-circle", "Información", "warning");
					
				}
				$local.$modalDetalleOperacion.PopupWindow("close");
			},
			complete : function() {
				$local.$btnBloquear.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	
	});
	
});