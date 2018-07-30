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
		$btnVerDetalle : $(".verDetalle"),
		$modalDetalleConsulta : $("#modalDetalleConsulta"),
		$detalleSwDmpLog : $("#detalleSwDmpLog"),
		$detalleCliente : $("#detalleCliente"),
		$btnPrimero : $(".btnPrimero"),
		$btnSiguiente : $(".btnSiguiente"),
		$btnAnterior : $(".btnAnterior"),
		$btnUltimo : $(".btnUltimo")
	};

	$formBusquedaCriterios = $("#formBusquedaCriterios");
	$formBusquedaTipoDocumento = $("#formParamIniciales");
	$funcionUtil.crearSelect2($local.$selectTipoDocumento, "Seleccion un Tipo de Documento");

	$local.$modalDetalleConsulta.PopupWindow({
		title : "Detalle de SwDmpLog",
		autoOpen : false,
		modal : false,
		height : 400,
		width : 600,
	});

	$funcionUtil.crearSelect2($local.$canalFiltroParaTablaConsulta);
	$funcionUtil.crearSelect2($local.$codigoProcesoFiltroParaTablaConsulta);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechasTransaccion);

	$.fn.dataTable.ext.errMode = 'none';

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
			"url" : $variableUtil.root + "txnsSwDmpLog?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se han encontrado Transacciones SwDmpLog con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$membresiasFiltroParaTableMantenimiento.html();
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
			"className" : "all filtrable",
		}, {
			"targets" : 15,
			"className" : "all dt-center",
			"width" : "10%",
			"defaultContent" : $variableUtil.botonVerDetalle
		}
		],
		"columns" : [ {
			"data" : 'numeroCuenta',
			"title" : "N° Tarjeta",
			"type"  : "string"
		}, {
			"data" : 'descripcionRol',
			"title" : "Rol"
		}, {
			"data" : 'descripcionCanal',
			"title" : "Canal"
		}, {
			"data" : 'descripcionProceso',
			"title" : "Proceso"
		}, {
			"data" : 'identificadorCuenta',
			"title" : "Cuenta"
		}, {
			"data" : 'fechaTransmision',
			"title" : "Fecha Txn"
		}, {
			"data" : 'horaTransmision',
			"title" : "Hora Txn"
		}, {
			"data" : 'codigoAutorizacion',
			"title" : "Autorización"
		}, {
			"data" : 'numeroRastreo',
			"title" : "Trace"
		}, {
			"data" : 'descripcionRespuesta',
			"title" : "Respuesta"
		}, {
			"data" : 'transaccionMonetaria',
			"title" : "Moneda"
		}, {
			"data" : 'cantidadTransaccion',
			"title" : "Monto"
		}, {
			"data" : 'ubicacionTarjeta',
			"title" : "Descripcion Adquirente"
		}, {
			"data" : 'numeroDocumentoSwDmpLog',
			"title" : "Número Documento"
		},  {
			"data" : 'estadoTarjeta',
			"title" : "Estado Tarjeta"
		}, {
			"data" : null,
			"title" : 'Ver detalle'
		} ],
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
	
	
	var buttonCommon = {
	        exportOptions: {
	            format: {
	                body: function ( data, row, column, node ) {
	                    // Strip $ from salary column to make it numeric
	                    return column === 0 ?
	                         (data.substring(0,4) + " " +
	                          data.substring(4,8) + " " +
	                          data.substring(8,12) + " " +
	                          data.substring(12,16)):
	                        data;
	                }
	            },
	            columns:  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
	        }
			/*,
			customize:  function (xlsx) {
				var sheet = xlsx.xl.worksheets['styles.xml'];
			 
			}*/
	 };
	
	new $.fn.dataTable.Buttons( $local.tablaMantenimiento, {
	    buttons: [
	    	$.extend( true, {}, buttonCommon, {
                extend: 'excelHtml5'
            } )
	    ]
	} );
	 
	$local.tablaMantenimiento.buttons().container()
	    .appendTo( $('.col-sm-6:eq(0)', $local.tablaMantenimiento.table().container() ) );

	
	$local.$tablaMantenimiento.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	



	$local.$tablaMantenimiento.children("tbody").on("click", ".ver-detalle", function() {
		$local.$btnPrimero.removeClass("hidden");
		$local.$btnSiguiente.removeClass("hidden");
		$local.$btnAnterior.removeClass("hidden");
		$local.$btnUltimo.removeClass("hidden");
		$local.$filaSeleccionada = $(this).parents("tr");
		var swDmpLog = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(swDmpLog.fechaTransmision, "DD/MM/YYYY", "YYYY-MM-DD");
		var data = {
			"numeroCuenta" : swDmpLog.numeroCuenta,
			"fechaTransmision" : fechaTransmision,
			"numeroRastreo" : swDmpLog.numeroRastreo,
			"tipoMensaje" : swDmpLog.tipoMensaje
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLog.numeroCuenta+" ,fechaTransmisión: "+
					swDmpLog.fechaTransmision+" ,númeroTrace: "+swDmpLog.numeroRastreo+" ,tipoMensaje: "+swDmpLog.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
				}else{
					if(detalleSwDmpLog.length == 1){
						$local.$modalDetalleConsulta.PopupWindow("open");
						$local.$modalDetalleConsulta.PopupWindow("maximize");
						$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleSwDmpLog);
						$funcionUtil.llenarFormulario(detalleSwDmpLog[0], $local.$detalleCliente);
						$funcionUtil.descripcionLarga(detalleSwDmpLog[0].descripcionGiroNegocio);
					}else{
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLog.numeroCuenta+" ,fechaTransmisión: "+
						swDmpLog.fechaTransmision+" ,númeroTrace: "+swDmpLog.numeroRastreo+" ,tipoMensaje: "+swDmpLog.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
					}
				}
			}
		});

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
			url : $variableUtil.root + "txnsSwDmpLog?accion=buscarPorDocumento",
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
			success : function(transaccionSwDmpLog) {
				if (transaccionSwDmpLog.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaMantenimiento.rows.add(transaccionSwDmpLog).draw();
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
			var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechasTransaccion);
			criterioBusqueda.fechaInicioTransaccion = rangoFechaBusqueda.fechaInicio;
			criterioBusqueda.fechaFinTransaccion = rangoFechaBusqueda.fechaFin;
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsSwDmpLog?accion=buscarPorFiltro",
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
				success : function(transaccionSwDmpLog) {
					if (transaccionSwDmpLog.length == 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					$local.tablaMantenimiento.rows.add(transaccionSwDmpLog).draw();
				},
				complete : function() {
					$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}		
	});
	
	$local.$btnSiguiente.on("click",function(){
		$local.$btnAnterior.removeClass("hidden");
        var indexes = $local.tablaMantenimiento.rows().indexes();
        var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
        var currentPosition = indexes.indexOf(currentIndex);
        
       if ( currentPosition < indexes.length-1 ) {        	 
      	 var swDmpLogSgte = $local.tablaMantenimiento.row( indexes[ currentPosition+1 ] ).data();
      	 var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(swDmpLogSgte.fechaTransmision, "DD/MM/YYYY", "YYYY-MM-DD");
      	 var data = {
   				"numeroCuenta": swDmpLogSgte.numeroCuenta,
   				"fechaTransmision": fechaTransmision,
   				"numeroRastreo": swDmpLogSgte.numeroRastreo,
   				"tipoMensaje" : swDmpLogSgte.tipoMensaje
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogSgte.numeroCuenta+" ,fechaTransmisión: "+
					swDmpLogSgte.fechaTransmision+" ,númeroTrace: "+swDmpLogSgte.numeroRastreo+" ,tipoMensaje: "+swDmpLogSgte.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
   				}else{
   					if(detalleSwDmpLog.length == 1){
   	   					$local.$modalDetalleConsulta.PopupWindow("open");
   	   	   				$local.$modalDetalleConsulta.PopupWindow("maximize");
   	   	   				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleSwDmpLog);
   	   	   				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleCliente);
   	   	   				$funcionUtil.descripcionLarga(detalleSwDmpLog[0].descripcionGiroNegocio);
   	   				}else{
   	   					$local.$modalDetalleConsulta.PopupWindow("close");
   	   					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogSgte.numeroCuenta+" ,fechaTransmisión: "+
   	   					swDmpLogSgte.fechaTransmision+" ,númeroTrace: "+swDmpLogSgte.numeroRastreo+" ,tipoMensaje: "+swDmpLogSgte.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
   	   				}
   				}
   			}
   		})
   		
   		$local.tablaMantenimiento.row( currentIndex ).deselect();
      	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[ currentPosition+1 ] ).select();
   	}
	});
	
	$local.$btnAnterior.on("click",function(){
	  $local.$btnSiguiente.removeClass("hidden");
	  var indexes = $local.tablaMantenimiento.rows().indexes();
      var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
      var currentPosition = indexes.indexOf(currentIndex);

      if ( currentPosition >= 0) {        	 
    	 var swDmpLogAnt = $local.tablaMantenimiento.row( indexes[ currentPosition-1 ] ).data();
         var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(swDmpLogAnt.fechaTransmision, "DD/MM/YYYY", "YYYY-MM-DD");

    	 var data = {
 				"numeroCuenta": swDmpLogAnt.numeroCuenta,
 				"fechaTransmision": fechaTransmision,
 				"numeroRastreo": swDmpLogAnt.numeroRastreo,
 				"tipoMensaje" : swDmpLogAnt.tipoMensaje
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogAnt.numeroCuenta+" ,fechaTransmisión: "+
					swDmpLogAnt.fechaTransmision+" ,númeroTrace: "+swDmpLogAnt.numeroRastreo+" ,tipoMensaje: "+swDmpLogAnt.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
 				}else{
 					if(detalleSwDmpLog.length == 1){
 	 					$local.$modalDetalleConsulta.PopupWindow("open");
 	 	 				$local.$modalDetalleConsulta.PopupWindow("maximize");
 	 	 				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleSwDmpLog);
 	 	 				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleCliente);
 	 	 				$funcionUtil.descripcionLarga(detalleSwDmpLog[0].descripcionGiroNegocio);
 	 				}else{
 	 					$local.$modalDetalleConsulta.PopupWindow("close");
 	   					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogAnt.numeroCuenta+" ,fechaTransmisión: "+
 	   					swDmpLogAnt.fechaTransmision+" ,númeroTrace: "+swDmpLogAnt.numeroRastreo+" ,tipoMensaje: "+swDmpLogAnt.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
 	 				} 		
 				}		
 			}
 		})   		
 		$local.tablaMantenimiento.row( currentIndex ).deselect();
    	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[ currentPosition-1 ] ).select();
 	}
	});
	
	$local.$btnPrimero.on("click",function(){
		$local.$btnAnterior.addClass("hidden");
		$local.$btnSiguiente.removeClass("hidden");
		var indexes = $local.tablaMantenimiento.rows().indexes();
		var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
		var swDmpLogPrimero = $local.tablaMantenimiento.row( indexes[0] ).data();  
		var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(swDmpLogPrimero.fechaTransmision, "DD/MM/YYYY", "YYYY-MM-DD");
		var data = {
				"numeroCuenta": swDmpLogPrimero.numeroCuenta,
				"fechaTransmision": fechaTransmision,
				"numeroRastreo": swDmpLogPrimero.numeroRastreo,
				"tipoMensaje" : swDmpLogPrimero.tipoMensaje
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogPrimero.numeroCuenta+" ,fechaTransmisión: "+
					swDmpLogPrimero.fechaTransmision+" ,númeroTrace: "+swDmpLogPrimero.numeroRastreo+" ,tipoMensaje: "+swDmpLogPrimero.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
 				}else{
 					if(detalleSwDmpLog.length == 1){
 	 					$local.$modalDetalleConsulta.PopupWindow("open");
 	 	 				$local.$modalDetalleConsulta.PopupWindow("maximize");
 	 	 				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleSwDmpLog);
 	 	 				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleCliente);
 	 	 				$funcionUtil.descripcionLarga(detalleSwDmpLog[0].descripcionGiroNegocio);
 	 				}else{
 	 					$local.$modalDetalleConsulta.PopupWindow("close");
 	   					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogPrimero.numeroCuenta+" ,fechaTransmisión: "+
 	   					swDmpLogPrimero.fechaTransmision+" ,númeroTrace: "+swDmpLogPrimero.numeroRastreo+" ,tipoMensaje: "+swDmpLogPrimero.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
 	 				} 		
 				}		
 			}
 		})
 		
 		$local.tablaMantenimiento.row( currentIndex ).deselect();
    	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[0] ).select();
	});
	
	$local.$btnUltimo.on("click",function(){
		$local.$btnSiguiente.addClass("hidden");
		$local.$btnAnterior.removeClass("hidden");
		var indexes = $local.tablaMantenimiento.rows().indexes();
		var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
		var swDmpLogUltimo = $local.tablaMantenimiento.row( indexes[indexes.length-1] ).data();
		var fechaTransmision = $funcionUtil.convertirDeFormatoAFormato(swDmpLogUltimo.fechaTransmision, "DD/MM/YYYY", "YYYY-MM-DD");
   	var data = {
				"numeroCuenta": swDmpLogUltimo.numeroCuenta,
				"fechaTransmision": fechaTransmision,
				"numeroRastreo": swDmpLogUltimo.numeroRastreo,
				"tipoMensaje" : swDmpLogUltimo.tipoMensaje
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogUltimo.numeroCuenta+" ,fechaTransmisión: "+
					swDmpLogUltimo.fechaTransmision+" ,númeroTrace: "+swDmpLogUltimo.numeroRastreo+" ,tipoMensaje: "+swDmpLogUltimo.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
 				}else{
 					if(detalleSwDmpLog.length == 1){
 	 					$local.$modalDetalleConsulta.PopupWindow("open");
 	 	 				$local.$modalDetalleConsulta.PopupWindow("maximize");
 	 	 				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleSwDmpLog);
 	 	 				$funcionUtil.llenarFormulario(detalleSwDmpLog[0],$local.$detalleCliente);
 	 	 				$funcionUtil.descripcionLarga(detalleSwDmpLog[0].descripcionGiroNegocio);
 	 				}else{
 	 					$local.$modalDetalleConsulta.PopupWindow("close");
 	   					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+swDmpLogUltimo.numeroCuenta+" ,fechaTransmisión: "+
 	   					swDmpLogUltimo.fechaTransmision+" ,númeroTrace: "+swDmpLogUltimo.numeroRastreo+" ,tipoMensaje: "+swDmpLogUltimo.tipoMensaje+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
 	 				}
 				}
 			}
 		})
 		
 		$local.tablaMantenimiento.row( currentIndex ).deselect();
    	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[ indexes.length-1 ] ).select();
	});
});