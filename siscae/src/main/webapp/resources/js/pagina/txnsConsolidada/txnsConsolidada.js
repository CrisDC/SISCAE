$(document).ready(function() {
	var $local = {
			$tablaConsolidada : $("#tablaConsulta"),
			tablaConsolidada : "",
			filtrosSeleccionables : [],
			$buscarCriterios : $("#buscarCriterios"),
			$rangoFechasTxn : $("#rangoFechasTransaccion"),
			$membresiasFiltroParaTableMantenimiento : $("#membresias-filtroParaTablaMantenimiento"),
			$detalleCompensacion : $("#detalleCompensacion"),
			$detalleSwDmpLog : $("#detalleSwDmpLog"),
			$detalleAutorizada : $("#detalleAutorizacion"),
			$modalDetalleConsulta : $("#modalDetalleConsulta"),
			$detalleCliente : $("#detalleCliente"),
			$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
			$tipoDocumento : $("#tipoDocumento"),
			$criterios : $("#criterios"),
			$selectTipoDocumento : $("#selectTipoDocumento"),
			$btnBuscarPorDocumentoCliente : $("#btnBuscarPorDocumentoCliente"),
			$canalFiltroParaTablaConsulta : $("#canalFiltroParaTablaConsulta"),
			$origenesArchivo : $("#origenesArchivo"),
			$txtNumDocumentoCliente : $("#txtNumDocumentoCliente"),
			$btnPrimero : $(".btnPrimero"),
			$btnSiguiente : $(".btnSiguiente"),
			$btnAnterior : $(".btnAnterior"),
			$btnUltimo : $(".btnUltimo")
	};
	
	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	$funcionUtil.crearSelect2($local.$selectTipoDocumento, "Seleccion un Tipo de Documento");
	$funcionUtil.crearSelect2($local.$canalFiltroParaTablaConsulta);
	$funcionUtil.crearSelect2($local.$origenesArchivo)
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechasTxn);
	
	$local.$modalDetalleConsulta.PopupWindow({
		title : "Detalle Consolidada",
		autoOpen : false,
		modal : false,
		height : 400,
		width : 600
	});
	
	$local.tablaConsolidada= $local.$tablaConsolidada.DataTable({
		"language" : {
			"emptyTable" : "No se han encontrado Transacciones Consolidadas con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaConsolidada.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$membresiasFiltroParaTableMantenimiento.html();
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsolidada, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12,13,14,15 ],
			"className" : "all filtrable",
		}, {
			"targets" : 16,
			"className" : "all dt-center", 
			"width" : "10%",
			"defaultContent" : $variableUtil.botonVerDetalle
		}],
		"columns" : [{
				"data" : 'numeroTarjeta',
				"title" : 'Número Tarjeta'
		},{
				"data" : 'numeroCuenta',
				"title" : 'Número Cuenta'
		},{
				"data" : 'origenArchivo',
				"title" : 'Origen Archivo'
		},{
				"data" : 'canal',
				"title" : 'Canal'
		},{
				"data" : 'tipoTransaccion',
				"title" : 'Tipo Transacción'
		},{
				"data" : 'fechaTransaccion',
				"title" : 'Fecha Transacción'
		},{
				"data" : 'horaTransaccion',
				"title" : 'Hora Transacción'
		},{
				"data" : 'fechaCompensacion',
				"title" : 'Fecha Compensación'
		},{
				"data" : 'numeroTrace',
				"title" : 'Número Trace'
		},{
				"data" : 'autorizacion',
				"title" : 'Autorización'
		},{
				"data" : 'adquirente',
				"title" : 'Adquirente'
		},{
				"data" : 'monedaTransaccion',
				"title" : 'Moneda'
		},{
				"data" : 'valorTransaccion',
				"title" : 'Monto Transacción'
		},{
				"data" : 'monedaCompensacion',
				"title" : 'Moneda'
		},{
				"data" : 'valorCompensacion',
				"title" : 'Monto Compensación'
		},{
				"data" : 'codigoRespuesta',
				"title" : 'Código Respuesta'
		},{
				"data" : null,
				"title" : 'Acción'
		}],
		"createdRow" : function(row, data, dataIndex) {
			if (data.estadoTarjeta == "ACTIVA") {
				$(row).css("background-color", "Green");
				$(row).addClass("success");
			} else {
				$(row).css("background-color", "Red");
				$(row).addClass("danger");
			}
		}
	});
	
	$local.$tablaConsolidada.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaConsolidada.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaConsolidada.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaConsolidada.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	$local.$buscarCriterios.on("click", function() {
		if(!$formBusquedaCriterios.valid()){
			return;
		}if($funcionUtil.camposVacios($formBusquedaCriterios)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			var criterioBusqueda = $formBusquedaCriterios.serializeJSON();
			var rangoFechasTxn = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechasTxn);
			criterioBusqueda.fechaInicioTxn = rangoFechasTxn.fechaInicio;
			criterioBusqueda.fechaFinTxn = rangoFechasTxn.fechaFin;
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsConsolidada?accion=buscarPorFiltro",
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
					$local.tablaConsolidada.clear().draw();
					$local.$buscarCriterios.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(transaccionConsolidada) {
					if (transaccionConsolidada.length == 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					$local.tablaConsolidada.rows.add(transaccionConsolidada).draw();
				},
				complete : function() {
					$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
	});
	
	$local.$tablaConsolidada.children("tbody").on("click", ".ver-detalle", function() {
		$local.$btnPrimero.removeClass("hidden");
		$local.$btnSiguiente.removeClass("hidden");
		$local.$btnAnterior.removeClass("hidden");
		$local.$btnUltimo.removeClass("hidden");
		$local.$filaSeleccionada = $(this).parents("tr");
		var consolidada = $local.tablaConsolidada.row($local.$filaSeleccionada).data();
		var idOrigenArchivo = consolidada.idOrigenArchivo;
		console.log(idOrigenArchivo);
		switch(idOrigenArchivo){
			case "2": 
				var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(consolidada.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
				var data = {
						"numeroCuenta": consolidada.numeroTarjeta,
						"fechaTransmision": fechaTransmision,
						"numeroRastreo": consolidada.numeroTrace,
						"tipoMensaje" : consolidada.tipoMensaje
				}
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "txnsAutorizacion?accion=buscarDetalle",
					data : data,
					beforeSend : function(xhr) {				
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
					},
					success : function(detalleAutorizacion) {
						if(detalleAutorizacion.length == 0){
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidada.numeroTarjeta+" ,fechaTransmisión: "+
							consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
						}else{
							if(detalleAutorizacion.length == 1){
								$local.$modalDetalleConsulta.PopupWindow("open");
								$local.$modalDetalleConsulta.PopupWindow("maximize");
								$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
								$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
								$local.$detalleAutorizada.removeClass("hidden");
								$local.$detalleCompensacion.addClass("hidden");
								$local.$detalleSwDmpLog.addClass("hidden");
								$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleCliente);
								$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleAutorizacion);
							}else{
								$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidada.numeroTarjeta+" ,fechaTransmisión: "+
								consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
							}
						}				
					}
				});
				break;
			case "3":
				console.log("tipoMensaje: "+consolidada.tipoMensaje);
				var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidada.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
				var data = {
					"numeroCuenta" : consolidada.numeroTarjeta,
					"fechaTransmision" : fechaTransaccion,
					"numeroRastreo" : consolidada.numeroTrace,
					"tipoMensaje" : consolidada.tipoMensaje
				}
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "txnsSwDmpLog?accion=buscarDetalle",
					data : data,
					beforeSend : function(xhr) {
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
					},
					success : function(detalleSwDmpLog) {
						console.log(detalleSwDmpLog.length);
						if(detalleSwDmpLog.length == 0){
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidada.numeroTarjeta+" ,fechaTransmisión: "+
							consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
							}else{
								if(detalleSwDmpLog.length == 1){
									$local.$modalDetalleConsulta.PopupWindow("open");
									$local.$modalDetalleConsulta.PopupWindow("maximize");
									$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
									$funcionUtil.limpiarCamposFormulario($local.$detalleAutorizada);
									$local.$detalleAutorizada.addClass("hidden");
									$local.$detalleCompensacion.addClass("hidden");
									$local.$detalleSwDmpLog.removeClass("hidden");
									$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleSwDmpLog);
									$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleCliente);
									}else{							
										$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidada.numeroTarjeta+" ,fechaTransmisión: "+
										consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
							}
							
						}
					}
				});
				break;
			case "4":
				var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidada.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
				var data = {
						"numeroTarjeta": consolidada.numeroTarjeta,
						"fechaTransaccion": fechaTransaccion,
						"numeroVoucher": consolidada.numeroTrace
				}
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "txnsCompensacion?accion=buscarDetalle",
					data : data,
					beforeSend : function(xhr) {				
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
					},
					success : function(detalleCompensacion) {
						if(detalleCompensacion.length == 0){
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidada.numeroTarjeta+" ,fechaTransmisión: "+
							consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
							}else{
								if(detalleCompensacion.length == 1){
									$local.$modalDetalleConsulta.PopupWindow("open");
									$local.$modalDetalleConsulta.PopupWindow("maximize");
									$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
									$local.$detalleAutorizada.addClass("hidden");
									$local.$detalleSwDmpLog.addClass("hidden");
									$local.$detalleCompensacion.removeClass("hidden");
									$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCliente);
									$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCompensacion);	
									}else{
										$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidada.numeroTarjeta+" ,fechaTransmisión: "+
										consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
							}	
						}								
					}
			});
				break;
			case "5":
				$funcionUtil.notificarException("Las Transacciones Liberadas no tienen Detalle", "fa-exclamation-circle", "Información", "info");
				break;
		}
	});
	
	$local.$tipoBusqueda.on("change", function() {
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
		if (event.which == 13) {
			$local.$btnBuscarPorDocumentoCliente.trigger("click");
			return false;
		}
	});
	
	$local.$btnBuscarPorDocumentoCliente.on("click", function() {
		if (!$formBusquedaTipoDocumento.valid()) {
			return;
		}
		var criterioBusqueda = $formBusquedaTipoDocumento.serializeJSON();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "txnsConsolidada?accion=buscarPorDocumento",
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
				$local.tablaConsolidada.clear().draw();
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(transaccionConsolidada) {
				if (transaccionConsolidada.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaConsolidada.rows.add(transaccionConsolidada).draw();
			},
			complete : function() {
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
			
	$local.$btnPrimero.on("click",function(){
		$local.$btnAnterior.addClass("hidden");
		$local.$btnSiguiente.removeClass("hidden");
		var indexes = $local.tablaConsolidada.rows().indexes();
		var currentIndex = $local.tablaConsolidada.row($local.$filaSeleccionada).index();
		var consolidadaPrimero = $local.tablaConsolidada.row( indexes[0] ).data();  
		var idOrigenArchivo = consolidadaPrimero.idOrigenArchivo;
		switch(idOrigenArchivo){
			case "2" :
				var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(consolidadaPrimero.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
				var data = {
						"numeroCuenta": consolidadaPrimero.numeroTarjeta,
						"fechaTransmision": fechaTransmision,
						"numeroRastreo": consolidadaPrimero.numeroTrace,
						"tipoMensaje" : consolidadaPrimero.tipoMensaje
				}
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "txnsAutorizacion?accion=buscarDetalle",
					data : data,
					beforeSend : function(xhr) {				
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
					},
					success : function(detalleAutorizacion) {
						if(detalleAutorizacion.length == 0){
							$local.$modalDetalleConsulta.PopupWindow("close");
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaPrimero.numeroTarjeta+" ,fechaTransmisión: "+
							consolidadaPrimero.fechaTransaccion+" ,númeroTrace: "+consolidadaPrimero.numeroTrace+" ,tipoMensaje: "+consolidadaPrimero.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
						}else{
							if(detalleAutorizacion.length == 1){
								$local.$modalDetalleConsulta.PopupWindow("open");
								$local.$modalDetalleConsulta.PopupWindow("maximize");
								$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
								$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
								$local.$detalleAutorizada.removeClass("hidden");
								$local.$detalleCompensacion.addClass("hidden");
								$local.$detalleSwDmpLog.addClass("hidden");
								$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleCliente);
								$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleAutorizacion);
							}else{
								$local.$modalDetalleConsulta.PopupWindow("close");
								$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaPrimero.numeroTarjeta+" ,fechaTransmisión: "+
								consolidadaPrimero.fechaTransaccion+" ,númeroTrace: "+consolidadaPrimero.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
							}		
						}		
					}
				});
					$local.tablaConsolidada.row( currentIndex ).deselect();
		    		$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[0] ).select();
				break;
			case "3" :
				var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaPrimero.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
				var data = {
					"numeroCuenta" : consolidadaPrimero.numeroTarjeta,
					"fechaTransmision" : fechaTransaccion,
					"numeroRastreo" : consolidadaPrimero.numeroTrace,
					"tipoMensaje" : consolidadaPrimero.tipoMensaje
				}
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "txnsSwDmpLog?accion=buscarDetalle",
					data : data,
					beforeSend : function(xhr) {
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
					},
					success : function(detalleSwDmpLog) {
						if(detalleSwDmpLog.length == 0){
							$local.$modalDetalleConsulta.PopupWindow("close");
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaPrimero.numeroTarjeta+" ,fechaTransmisión: "+
							consolidadaPrimero.fechaTransaccion+" ,númeroTrace: "+consolidadaPrimero.numeroTrace+" ,tipoMensaje: "+consolidadaPrimero.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
						}else{
							if(detalleSwDmpLog.length == 1){
								$local.$modalDetalleConsulta.PopupWindow("open");
								$local.$modalDetalleConsulta.PopupWindow("maximize");
								$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
								$funcionUtil.limpiarCamposFormulario($local.$detalleAutorizada);
								$local.$detalleAutorizada.addClass("hidden");
								$local.$detalleCompensacion.addClass("hidden");
								$local.$detalleSwDmpLog.removeClass("hidden");
								$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleSwDmpLog);
								$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleCliente);
							}else{
								$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaPrimero.numeroTarjeta+" ,fechaTransmisión: "+
								consolidadaPrimero.fechaTransaccion+" ,númeroTrace: "+consolidadaPrimero.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
							}
						}						
					}
				});
					$local.tablaConsolidada.row( currentIndex ).deselect();
		    		$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[0] ).select();
				break;
			case "4" :
				var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaPrimero.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
				var data = {
						"numeroTarjeta": consolidadaPrimero.numeroTarjeta,
						"fechaTransaccion": fechaTransaccion,
						"numeroVoucher": consolidadaPrimero.numeroTrace
				}
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "txnsCompensacion?accion=buscarDetalle",
					data : data,
					beforeSend : function(xhr) {				
						xhr.setRequestHeader('Content-Type', 'application/json');
						xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
					},
					success : function(detalleCompensacion) {
						if(detalleCompensacion.length == 0){
							$local.$modalDetalleConsulta.PopupWindow("close");
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaPrimero.numeroTarjeta+" ,fechaTransmisión: "+
							consolidadaPrimero.fechaTransaccion+" ,númeroTrace: "+consolidadaPrimero.numeroTrace+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
						}else{
							if(detalleCompensacion.length == 1){
								$local.$modalDetalleConsulta.PopupWindow("open");
								$local.$modalDetalleConsulta.PopupWindow("maximize");
								$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
								$local.$detalleAutorizada.addClass("hidden");
								$local.$detalleSwDmpLog.addClass("hidden");
								$local.$detalleCompensacion.removeClass("hidden");
								$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCliente);
								$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCompensacion);	
							}else{
								$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaPrimero.numeroTarjeta+" ,fechaTransmisión: "+
								consolidadaPrimero.fechaTransaccion+" ,númeroTrace: "+consolidadaPrimero.numeroTrace+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
							}		
						}							
					}
			});
				$local.tablaConsolidada.row( currentIndex ).deselect();
	    		$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[0] ).select();
				break;
			case "5" :
				$local.$modalDetalleConsulta.PopupWindow("close");
				$funcionUtil.notificarException("Las Transacciones Liberadas no tienen Detalle", "fa-exclamation-circle", "Información", "info");
				break;
		}		
	});
	
	$local.$btnUltimo.on("click",function(){
		$local.$btnSiguiente.addClass("hidden");
		$local.$btnAnterior.removeClass("hidden");
		var indexes = $local.tablaConsolidada.rows().indexes();
		var currentIndex = $local.tablaConsolidada.row($local.$filaSeleccionada).index();
		var consolidadaUltimo = $local.tablaConsolidada.row( indexes[indexes.length-1] ).data();
		var idOrigenArchivo = consolidadaUltimo.idOrigenArchivo;		
		switch(idOrigenArchivo){
		case "2" :
			var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(consolidadaUltimo.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
			var data = {
					"numeroCuenta": consolidadaUltimo.numeroTarjeta,
					"fechaTransmision": fechaTransmision,
					"numeroRastreo": consolidadaUltimo.numeroTrace,
					"tipoMensaje" : consolidadaUltimo.tipoMensaje
			}
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsAutorizacion?accion=buscarDetalle",
				data : data,
				beforeSend : function(xhr) {				
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				},
				success : function(detalleAutorizacion) {
					if(detalleAutorizacion.lentgh == 0){
						$local.$modalDetalleConsulta.PopupWindow("close");
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaUltimo.numeroTarjeta+" ,fechaTransmisión: "+
						consolidadaUltimo.fechaTransaccion+" ,númeroTrace: "+consolidadaUltimo.numeroTrace+" ,tipoMensaje: "+consolidadaUltimo.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
					}else{
						if(detalleAutorizacion.length == 1){
							$local.$modalDetalleConsulta.PopupWindow("open");
							$local.$modalDetalleConsulta.PopupWindow("maximize");
							$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
							$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
							$local.$detalleAutorizada.removeClass("hidden");
							$local.$detalleCompensacion.addClass("hidden");
							$local.$detalleSwDmpLog.addClass("hidden");
							$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleCliente);
							$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleAutorizacion);
						}else{
							$local.$modalDetalleConsulta.PopupWindow("close");
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaUltimo.numeroTarjeta+" ,fechaTransmisión: "+
							consolidadaUltimo.fechaTransaccion+" ,númeroTrace: "+consolidadaUltimo.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
						}		
					}		
				}
			});
				$local.tablaConsolidada.row( currentIndex ).deselect();
				$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ indexes.length-1 ] ).select();
			break;
		case "3" :
			var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaUltimo.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
			var data = {
				"numeroCuenta" : consolidadaUltimo.numeroTarjeta,
				"fechaTransmision" : fechaTransaccion,
				"numeroRastreo" : consolidadaUltimo.numeroTrace,
				"tipoMensaje" : consolidadaUltimo.tipoMensaje
			}
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsSwDmpLog?accion=buscarDetalle",
				data : data,
				beforeSend : function(xhr) {
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				},
				success : function(detalleSwDmpLog) {
					if(detalleSwDmpLog.length == 0){
						$local.$modalDetalleConsulta.PopupWindow("close");
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaUltimo.numeroTarjeta+" ,fechaTransmisión: "+
						consolidadaUltimo.fechaTransaccion+" ,númeroTrace: "+consolidadaUltimo.numeroTrace+" ,tipoMensaje: "+consolidadaUltimo.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
					}else{
						if(detalleSwDmpLog.length == 1){
							$local.$modalDetalleConsulta.PopupWindow("open");
							$local.$modalDetalleConsulta.PopupWindow("maximize");
							$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
							$funcionUtil.limpiarCamposFormulario($local.$detalleAutorizada);
							$local.$detalleAutorizada.addClass("hidden");
							$local.$detalleCompensacion.addClass("hidden");
							$local.$detalleSwDmpLog.removeClass("hidden");
							$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleSwDmpLog);
							$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleCliente);
						}else{
							$local.$modalDetalleConsulta.PopupWindow("close");
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaUltimo.numeroTarjeta+" ,fechaTransmisión: "+
							consolidadaUltimo.fechaTransaccion+" ,númeroTrace: "+consolidadaUltimo.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
						}
					}					
				}
			});
				$local.tablaConsolidada.row( currentIndex ).deselect();
				$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ indexes.length-1 ] ).select();			
			break;
		case "4" :
			var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaUltimo.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
			var data = {
					"numeroTarjeta": consolidadaUltimo.numeroTarjeta,
					"fechaTransaccion": fechaTransaccion,
					"numeroVoucher": consolidadaUltimo.numeroTrace
			}
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsCompensacion?accion=buscarDetalle",
				data : data,
				beforeSend : function(xhr) {				
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				},
				success : function(detalleCompensacion) {
					if(detalleCompensacion.length == 0){
						$local.$modalDetalleConsulta.PopupWindow("close");
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaUltimo.numeroTarjeta+" ,fechaTransmisión: "+
						consolidadaUltimo.fechaTransaccion+" ,númeroTrace: "+consolidadaUltimo.numeroTrace+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
					}else{
						if(detalleCompensacion.length == 1){
							$local.$modalDetalleConsulta.PopupWindow("open");
							$local.$modalDetalleConsulta.PopupWindow("maximize");
							$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
							$local.$detalleAutorizada.addClass("hidden");
							$local.$detalleSwDmpLog.addClass("hidden");
							$local.$detalleCompensacion.removeClass("hidden");
							$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCliente);
							$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCompensacion);	
						}else{
							$local.$modalDetalleConsulta.PopupWindow("close");
							$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaUltimo.numeroTarjeta+" ,fechaTransmisión: "+
							consolidadaUltimo.fechaTransaccion+" ,númeroTrace: "+consolidadaUltimo.numeroTrace+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
						}	
					}								
				}
		});
			$local.tablaConsolidada.row( currentIndex ).deselect();
			$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ indexes.length-1 ] ).select();
			break;
		case "5" :
			$local.$modalDetalleConsulta.PopupWindow("close");
			$funcionUtil.notificarException("Las Transacciones Liberadas no tienen Detalle", "fa-exclamation-circle", "Información", "info");
			break;
		}
	});
	
	$local.$btnAnterior.on("click",function(){
		  $local.$btnSiguiente.removeClass("hidden");
		  var indexes = $local.tablaConsolidada.rows().indexes();
	      var currentIndex = $local.tablaConsolidada.row($local.$filaSeleccionada).index();
	      var currentPosition = indexes.indexOf(currentIndex);
	      	      
	      if ( currentPosition >= 0) {        	 
	    	  var consolidadaAnt = $local.tablaConsolidada.row( indexes[ currentPosition-1 ] ).data();
	    	  var idOrigenArchivo = consolidadaAnt.idOrigenArchivo;
	    	  switch(idOrigenArchivo){
	  			case "2" :
		  			var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(consolidadaAnt.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
		  			var data = {
		  					"numeroCuenta": consolidadaAnt.numeroTarjeta,
		  					"fechaTransmision": fechaTransmision,
		  					"numeroRastreo": consolidadaAnt.numeroTrace,
		  					"tipoMensaje" : consolidadaAnt.tipoMensaje
		  			}
		  			$.ajax({
		  				type : "GET",
		  				url : $variableUtil.root + "txnsAutorizacion?accion=buscarDetalle",
		  				data : data,
		  				beforeSend : function(xhr) {				
		  					xhr.setRequestHeader('Content-Type', 'application/json');
		  					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		  				},
		  				success : function(detalleAutorizacion) {
		  					if(detalleAutorizacion.length == 0){
		  						$local.$modalDetalleConsulta.PopupWindow("close");
		  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaAnt.numeroTarjeta+" ,fechaTransmisión: "+
		  					    consolidadaAnt.fechaTransaccion+" ,númeroTrace: "+consolidadaAnt.numeroTrace+" ,tipoMensaje: "+consolidadaAnt.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
		  					}else{
		  						if(detalleAutorizacion.length == 1){
			  						$local.$modalDetalleConsulta.PopupWindow("open");
			  						$local.$modalDetalleConsulta.PopupWindow("maximize");
			  						$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
			  						$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
			  						$local.$detalleAutorizada.removeClass("hidden");
			  						$local.$detalleCompensacion.addClass("hidden");
			  						$local.$detalleSwDmpLog.addClass("hidden");
			  						$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleCliente);
			  						$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleAutorizacion);
			  					}else{
			  						$local.$modalDetalleConsulta.PopupWindow("close");
			  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaAnt.numeroTarjeta+" ,fechaTransmisión: "+
			  						consolidadaAnt.fechaTransaccion+" ,númeroTrace: "+consolidadaAnt.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
			  					}				
		  					}  						
		  				}
		  			});
			  			$local.tablaConsolidada.row( currentIndex ).deselect();
				    	$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ currentPosition-1 ] ).select();
		  			break;
	  			case "3" :
		  			var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaAnt.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
		  			var data = {
		  				"numeroCuenta" : consolidadaAnt.numeroTarjeta,
		  				"fechaTransmision" : fechaTransaccion,
		  				"numeroRastreo" : consolidadaAnt.numeroTrace,
		  				"tipoMensaje" : consolidadaAnt.tipoMensaje
		  			}
		  			$.ajax({
		  				type : "GET",
		  				url : $variableUtil.root + "txnsSwDmpLog?accion=buscarDetalle",
		  				data : data,
		  				beforeSend : function(xhr) {
		  					xhr.setRequestHeader('Content-Type', 'application/json');
		  					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		  				},
		  				success : function(detalleSwDmpLog) {
		  					if(detalleSwDmpLog.length == 0){
		  						$local.$modalDetalleConsulta.PopupWindow("open");
		  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaAnt.numeroTarjeta+" ,fechaTransmisión: "+
		  						consolidadaAnt.fechaTransaccion+" ,númeroTrace: "+consolidadaAnt.numeroTrace+" ,tipoMensaje: "+consolidadaAnt.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
		  					}else{
		  						if(detalleSwDmpLog.length == 1){
			  						$local.$modalDetalleConsulta.PopupWindow("open");
			  						$local.$modalDetalleConsulta.PopupWindow("maximize");
			  						$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
			  						$funcionUtil.limpiarCamposFormulario($local.$detalleAutorizada);
			  						$local.$detalleAutorizada.addClass("hidden");
			  						$local.$detalleCompensacion.addClass("hidden");
			  						$local.$detalleSwDmpLog.removeClass("hidden");
			  						$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleSwDmpLog);
			  						$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleCliente);
			  					}else{
			  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaAnt.numeroTarjeta+" ,fechaTransmisión: "+
			  						consolidadaAnt.fechaTransaccion+" ,númeroTrace: "+consolidadaAnt.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
			  					}
		  					}		  					
		  				}
		  			});
			  			$local.tablaConsolidada.row( currentIndex ).deselect();
				    	$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ currentPosition-1 ] ).select();			
		  			break;
	  			case "4" :
		  			var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaAnt.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
		  			var data = {
		  					"numeroTarjeta": consolidadaAnt.numeroTarjeta,
		  					"fechaTransaccion": fechaTransaccion,
		  					"numeroVoucher": consolidadaAnt.numeroTrace
		  			}
		  			$.ajax({
		  				type : "GET",
		  				url : $variableUtil.root + "txnsCompensacion?accion=buscarDetalle",
		  				data : data,
		  				beforeSend : function(xhr) {				
		  					xhr.setRequestHeader('Content-Type', 'application/json');
		  					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		  				},
		  				success : function(detalleCompensacion) {
		  					if(detalleCompensacion.lentgh == 0){
		  						$local.$modalDetalleConsulta.PopupWindow("close");
		  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaAnt.numeroTarjeta+" ,fechaTransmisión: "+
		  					    consolidadaAnt.fechaTransaccion+" ,númeroTrace: "+consolidadaAnt.numeroTrace+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
		  					}else{
		  						if(detalleCompensacion.length == 1){
			  						$local.$modalDetalleConsulta.PopupWindow("open");
			  						$local.$modalDetalleConsulta.PopupWindow("maximize");
			  						$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
			  						$local.$detalleAutorizada.addClass("hidden");
			  						$local.$detalleSwDmpLog.addClass("hidden");
			  						$local.$detalleCompensacion.removeClass("hidden");
			  						$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCliente);
			  						$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCompensacion);	
			  					}else{
			  						$local.$modalDetalleConsulta.PopupWindow("close");
			  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaAnt.numeroTarjeta+" ,fechaTransmisión: "+
			  						consolidadaAnt.fechaTransaccion+" ,númeroTrace: "+consolidadaAnt.numeroTrace+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
			  					}	
		  					}								
		  				}
		  		});
		  			$local.tablaConsolidada.row( currentIndex ).deselect();
			    	$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ currentPosition-1 ] ).select();
		  		break;
	  			case "5" :
	  				$local.$modalDetalleConsulta.PopupWindow("close");
					$funcionUtil.notificarException("Las Transacciones Liberadas no tienen Detalle", "fa-exclamation-circle", "Información", "info");
	  				break;
	  		}
	     }
	});
	
	$local.$btnSiguiente.on("click",function(){
		$local.$btnAnterior.removeClass("hidden");
        var indexes = $local.tablaConsolidada.rows().indexes();
        var currentIndex = $local.tablaConsolidada.row($local.$filaSeleccionada).index();
        var currentPosition = indexes.indexOf(currentIndex);
        
        if ( currentPosition < indexes.length-1 ) {        	 
      	 var consolidadaSgte = $local.tablaConsolidada.row( indexes[ currentPosition+1 ] ).data();
      	 var idOrigenArchivo = consolidadaSgte.idOrigenArchivo;
      	 
      	  switch(idOrigenArchivo){
			case "2" :
	  			var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(consolidadaSgte.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
	  			var data = {
	  					"numeroCuenta": consolidadaSgte.numeroTarjeta,
	  					"fechaTransmision": fechaTransmision,
	  					"numeroRastreo": consolidadaSgte.numeroTrace,
	  					"tipoMensaje" : consolidadaSgte.tipoMensaje
	  			}
	  			$.ajax({
	  				type : "GET",
	  				url : $variableUtil.root + "txnsAutorizacion?accion=buscarDetalle",
	  				data : data,
	  				beforeSend : function(xhr) {				
	  					xhr.setRequestHeader('Content-Type', 'application/json');
	  					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	  				},
	  				success : function(detalleAutorizacion) {
	  					if(detalleAutorizacion.length == 0){
	  						$local.$modalDetalleConsulta.PopupWindow("close");
	  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaSgte.numeroTarjeta+" ,fechaTransmisión: "+
	  						consolidadaSgte.fechaTransaccion+" ,númeroTrace: "+consolidadaSgte.numeroTrace+" ,tipoMensaje: "+consolidadaSgte.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
	  					}else{
	  						if(detalleAutorizacion.length == 1){
		  						$local.$modalDetalleConsulta.PopupWindow("open");
		  						$local.$modalDetalleConsulta.PopupWindow("maximize");
		  						$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
		  						$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
		  						$local.$detalleAutorizada.removeClass("hidden");
		  						$local.$detalleCompensacion.addClass("hidden");
		  						$local.$detalleSwDmpLog.addClass("hidden");
		  						$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleCliente);
		  						$funcionUtil.llenarFormulario(detalleAutorizacion[0],$local.$detalleAutorizacion);
		  					}else{
		  						$local.$modalDetalleConsulta.PopupWindow("close");
		  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaSgte.numeroTarjeta+" ,fechaTransmisión: "+
		  						consolidadaSgte.fechaTransaccion+" ,númeroTrace: "+consolidadaSgte.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
		  					}		
	  					}		
	  				}
	  			});
		  			$local.tablaConsolidada.row( currentIndex ).deselect();
		         	$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ currentPosition+1 ] ).select();
	  			break;
			case "3" :
	  			var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaSgte.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
	  			var data = {
	  				"numeroCuenta" : consolidadaSgte.numeroTarjeta,
	  				"fechaTransmision" : fechaTransaccion,
	  				"numeroRastreo" : consolidadaSgte.numeroTrace,
	  				"tipoMensaje" : consolidadaSgte.tipoMensaje
	  			}
	  			$.ajax({
	  				type : "GET",
	  				url : $variableUtil.root + "txnsSwDmpLog?accion=buscarDetalle",
	  				data : data,
	  				beforeSend : function(xhr) {
	  					xhr.setRequestHeader('Content-Type', 'application/json');
	  					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	  				},
	  				success : function(detalleSwDmpLog) {
	  					if(detalleSwDmpLog.length == 0){
	  						$local.$modalDetalleConsulta.PopupWindow("close");
	  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaSgte.numeroTarjeta+" ,fechaTransmisión: "+
	  						consolidadaSgte.fechaTransaccion+" ,númeroTrace: "+consolidadaSgte.numeroTrace+" ,tipoMensaje: "+consolidadaSgte.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
	  					}else{
	  						if(detalleSwDmpLog.length == 1){
		  						$local.$modalDetalleConsulta.PopupWindow("open");
		  						$local.$modalDetalleConsulta.PopupWindow("maximize");
		  						$funcionUtil.limpiarCamposFormulario($local.$detalleCompensacion);
		  						$funcionUtil.limpiarCamposFormulario($local.$detalleAutorizada);
		  						$local.$detalleAutorizada.addClass("hidden");
		  						$local.$detalleCompensacion.addClass("hidden");
		  						$local.$detalleSwDmpLog.removeClass("hidden");
		  						$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleSwDmpLog);
		  						$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleCliente);
		  					}else{
		  						$local.$modalDetalleConsulta.PopupWindow("close");
		  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaSgte.numeroTarjeta+" ,fechaTransmisión: "+
		  						consolidadaSgte.fechaTransaccion+" ,númeroTrace: "+consolidadaSgte.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
		  					}
		  				
	  					}	
	  				}
	  			});
		  			$local.tablaConsolidada.row( currentIndex ).deselect();
		         	$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ currentPosition+1 ] ).select();		
	  			break;
			case "4" :
	  			var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(consolidadaSgte.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
	  			var data = {
	  					"numeroTarjeta": consolidadaSgte.numeroTarjeta,
	  					"fechaTransaccion": fechaTransaccion,
	  					"numeroVoucher": consolidadaSgte.numeroTrace
	  			}
	  			$.ajax({
	  				type : "GET",
	  				url : $variableUtil.root + "txnsCompensacion?accion=buscarDetalle",
	  				data : data,
	  				beforeSend : function(xhr) {				
	  					xhr.setRequestHeader('Content-Type', 'application/json');
	  					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	  				},
	  				success : function(detalleCompensacion) {
	  					if(detalleCompensacion.length == 0){
	  						$local.$modalDetalleConsulta.PopupWindow("close");
	  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaSgte.numeroTarjeta+" ,fechaTransmisión: "+
	  						consolidadaSgte.fechaTransaccion+" ,númeroTrace: "+consolidadaSgte.numeroTrace+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
	  					}else{
	  						if(detalleCompensacion.length == 1){
		  						$local.$modalDetalleConsulta.PopupWindow("open");
		  						$local.$modalDetalleConsulta.PopupWindow("maximize");
		  						$funcionUtil.limpiarCamposFormulario($local.$detalleSwDmpLog);
		  						$local.$detalleAutorizada.addClass("hidden");
		  						$local.$detalleSwDmpLog.addClass("hidden");
		  						$local.$detalleCompensacion.removeClass("hidden");
		  						$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCliente);
		  						$funcionUtil.llenarFormulario(detalleCompensacion,$local.$detalleCompensacion);	
		  					}else{
		  						$local.$modalDetalleConsulta.PopupWindow("close");
		  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+consolidadaSgte.numeroTarjeta+" ,fechaTransmisión: "+
		  						consolidadaSgte.fechaTransaccion+" ,númeroTrace: "+consolidadaSgte.numeroTrace+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
		  					}		
	  					}							
	  				}
	  		});
	  			$local.tablaConsolidada.row( currentIndex ).deselect();
	         	$local.$filaSeleccionada = $local.tablaConsolidada.row( indexes[ currentPosition+1 ] ).select();
	  		break;
			case "5" :
				$local.$modalDetalleConsulta.PopupWindow("close");
				$funcionUtil.notificarException("Las Transacciones Liberadas no tienen Detalle", "fa-exclamation-circle", "Información", "info");
				break;
		}
      }
	});
});