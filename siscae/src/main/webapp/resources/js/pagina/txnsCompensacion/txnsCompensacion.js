$(document).ready(function() {

	var $local = {
		$tablaMantenimiento : $("#tablaConsulta"),
		tablaMantenimiento : "",
		$filaSeleccionada : "",
		$membresiasFiltroParaTableMantenimiento : $("#membresias-filtroParaTablaMantenimiento"),
		filtrosSeleccionables : [],
		$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
		$tipoDocumento : $("#tipoDocumento"),
		$criterios : $("#criterios"),
		$btnBuscarPorDocumentoCliente : $("#btnBuscarPorDocumentoCliente"),
		$selectTipoDocumento : $("#selectTipoDocumento"),
		$txtNumDocumentoCliente : $("#txtNumDocumentoCliente"),
		$membresiaFiltroTablaConsulta : $("#membresiaFiltroTablaConsulta"),
		$clasesServicio : $("#servicioFiltroTablaConsulta"),
		$origenFiltroTablaConsulta : $("#origenFiltroTablaConsulta"),
		$claseTransaccionFiltroTablaConsulta : $("#claseTransaccionFiltroTablaConsulta"),
		$codigoTransaccion : $("#codigoTransaccionFiltroTablaConsulta"),
		$canalFiltroTablaConsulta : $("#canalFiltroTablaConsulta"),
		$institucionEmisoraFiltroTablaConsulta : $("#institucionEmisoraFiltroTablaConsulta"),
		$institucionReceptoraFiltroTablaConsulta : $("#institucionReceptoraFiltroTablaConsulta"),
		$binFiltroTablaConsulta : $("#binFiltroTablaConsulta"),
		$subBin : $("#subBinFiltroTablaConsulta"),
		$respuestaSwitch : $("#respuestaSwitchFiltroTablaConsulta"),
		$moneda : $("#monedaFiltroTablaConsulta"),
		$rangoFechasTxns : $("#fechaTxnFiltroTablaConsulta"),
		$rangoFechasProc : $("#fechaProcFiltroTablaConsulta"),
		$buscarCriterios : $("#buscarCriterios"),
		$rangoFechaTxn : $("#fechaTxnFiltroTablaConsulta"),
		$rangoFechaProceso : $("#fechaProcFiltroTablaConsulta"),
		$modalDetalleConsulta : $("#modalDetalleConsulta"),
		$detalleCompensacion : $("#detalleCompensacion"),
		$modalDetalleComision : $("#modalDetalleComision"),
		$tablaDetalleComision : $("#tablaDetalleComision"),
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
		title : "Detalle de Compensacion",
		autoOpen : false,
		modal : false,
		height : 800,
		width : 600,
	});
	
	$local.$modalDetalleComision.PopupWindow({
		title : "Detalle Comisiones",
		autoOpen : false,
		modal : false,
		height : 400,
		width : 1250,
	});

	$formMantenimiento = $("#formMantenimiento");
	$funcionUtil.crearSelect2($local.$membresiaFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$origenFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$claseTransaccionFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$codigoTransaccion);
	$funcionUtil.crearSelect2($local.$clasesServicio);
	$funcionUtil.crearSelect2($local.$canalFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$institucionEmisoraFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$institucionReceptoraFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$binFiltroTablaConsulta);
	$funcionUtil.crearSelect2($local.$subBin);
	$funcionUtil.crearSelect2($local.$respuestaSwitch);
	$funcionUtil.crearSelect2($local.$moneda);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechasTxns);
	$funcionUtil.crearDateRangePickerConsulta($local.$rangoFechasProc);
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
			"url" : $variableUtil.root + "txnsCompensacion?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se han encontrado Transacciones Compensación con los criterios definidos."
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
			"defaultContent" : $variableUtil.botonVerDetalle+ " " +$variableUtil.botonVerComision
		}],
		"columns" : [ {
			"data" : 'numeroTarjeta',
			"title" : "N° Tarjeta"
		}, {
			"data" : 'descripcionRol',
			"title" : "Rol"
		}, {
			"data" : 'descripcionCanal',
			"title" : "Canal"
		}, {
			"data" : 'numeroCuenta',
			"title" : "N° Cuenta"
		}, {
			"data" : 'fechaTransaccion',
			"title" : "Fecha Txn"
		}, {
			"data" : 'horaTransaccion',
			"title" : "Hora Txn"
		}, {
			"data" : 'codigoAutorizacion',
			"title" : "Autorización"
		}, {
			"data" : 'numeroVoucher',
			"title" : "N° Voucher"
		}, {
			"data" : 'claseTransaccion',
			"title" : "Transacción"
		}, {
			"data" : 'descripcionCodigoRespuesta',
			"title" : "Respuesta"
		}, {
			"data" : 'monedaCompensacion',
			"title" : "Moneda"
		}, {
			"data" : 'valorCompensacion',
			"title" : "Compensacion"
		}, {
			"data" : 'nombreAfiliado',
			"title" : "Afiliado"
		}, {
			"data" : 'numeroDocumentoCompensacion',
			"title" : "Número Comprobante"
		}, {
			"data" : 'estadoTarjeta',
			"title" : "Estado Tarjeta"
		}, {
			"data" : null,
			"title" : 'Acción'
		} ],
		"createdRow": function( row, data, dataIndex ) {
            if ( data.estadoTarjeta == "ACTIVA" ) {
                $( row ).css( "background-color", "Green" );
                $( row ).addClass( "success" );
            }else{
            	$( row ).css( "background-color", "Red" );
                $( row ).addClass( "danger" );
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
	            columns:  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ],
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

	
	$local.tablaDetalleComision = $local.$tablaDetalleComision.DataTable({
		"ajax" : {
			"url" : "",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Comisiones registradas"
		},"columns" : [{
				"data" : 'descripcionCuentaCompensacion',
				"title" : 'Institución'
		},{
			"data" : 'descripcionConceptoComision',
			"title" : 'Tipo Comisión'
		},{
			"data" : 'descripcionRegistroContable',
				"title" : 'Registro Contable'
		},{
				"data" : 'valorComision',
				"title" : 'Valor Comisión'
		},{
			"data" : 'valorComisionRec',
			"title" : 'Valor Comisión Rec'
		},{
			"data" : 'valorComisionRec2',
			"title" : 'Valor Comisión Rec2'
		},{
			"data" : 'cuentaCargo',
			"title" : 'Cuenta Cargo'
		},{
			"data" : 'cuentaAbono',
			"title" : 'Cuenta Abono'
		},{
			"data" : 'codigoAnalitico',
			"title" : 'Código Analítico'
		}]
	});
	
	new $.fn.dataTable.Buttons( $local.tablaMantenimiento, {
	    buttons: [
	    	$.extend( true, {}, buttonCommon, {
                extend: 'excelHtml5'
            })
	    ]
	} );

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
		var compensacion = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(compensacion.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
		var data = {
				"numeroTarjeta": compensacion.numeroTarjeta,
				"fechaTransaccion": fechaTransaccion,
				"numeroVoucher": compensacion.numeroVoucher,
				"claseTransaccion": compensacion.claseTransaccion
				
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
					consolidada.fechaTransaccion+" ,númeroTrace: "+consolidada.numeroTrace+" ,tipoMensaje: "+consolidada.tipoMensaje+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
				}else{
					if(detalleCompensacion.length == 1){
						$local.$modalDetalleConsulta.PopupWindow("open");
						$local.$modalDetalleConsulta.PopupWindow("maximize");
						$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCliente);
						$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCompensacion);
						$funcionUtil.descripcionLarga(detalleCompensacion[0].descripcionGiroNegocio);
					}else{
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacion.numeroTarjeta+" ,fechaTransmisión: "+
						compensacion.fechaTransaccion+" ,númeroTrace: "+compensacion.numeroVoucher+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
					}
				}							
			}
		});
	});
	
	$local.$tablaMantenimiento.children("tbody").on("click", ".ver-comisiones", function() {
		$local.$modalDetalleComision.PopupWindow("open");
		$local.$filaSeleccionada = $(this).parents("tr");
		var compensacion = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$local.tablaDetalleComision.ajax.url($variableUtil.root +"txnsCompensacion?accion=buscarComision&secuenciaTransaccion="+compensacion.secuenciaTransaccion).load();
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
		if(!$formBusquedaTipoDocumento.valid()){
			return;
		}
		var criterioBusqueda = $formBusquedaTipoDocumento.serializeJSON();
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "txnsCompensacion?accion=buscarPorDocumento",
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
			success : function(transaccionCompensacion) {
				if (transaccionCompensacion.length == 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				$local.tablaMantenimiento.rows.add(transaccionCompensacion).draw();
			},
			complete : function() {
				$local.$btnBuscarPorDocumentoCliente.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$local.$buscarCriterios.on("click", function() {
		if(!$formBusquedaCriterios.valid()){
			return;
		}
		if($funcionUtil.camposVacios($formBusquedaCriterios)){
			$funcionUtil.notificarException($variableUtil.camposVacios, "fa-exclamation-circle", "Información", "info");
		}else{
			var criterioBusqueda = $formBusquedaCriterios.serializeJSON();
			var rangoFechaTxn = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaTxn);
			var rangoFechaProc = $funcionUtil.obtenerFechasDateRangePicker($local.$rangoFechaProceso);
			criterioBusqueda.fechaInicioTxn = rangoFechaTxn.fechaInicio;    
			criterioBusqueda.fechaFinTxn = rangoFechaTxn.fechaFin;
			criterioBusqueda.fechaInicioProc = rangoFechaProc.fechaInicio;
			criterioBusqueda.fechaFinProc = rangoFechaProc.fechaFin;
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "txnsCompensacion?accion=buscarPorFiltro",
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
				success : function(transaccionCompensacion) {
					if (transaccionCompensacion.length == 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					$local.tablaMantenimiento.rows.add(transaccionCompensacion).draw();
				},
				complete : function() {
					$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
});

	$local.$membresiaFiltroTablaConsulta.on("change", function(event, opcionSeleccionada) {
		var codigoMembresia = $(this).val();
		if (codigoMembresia == null || codigoMembresia == undefined) {
			$local.$clasesServicio.find("option:not(:eq(0))").remove();
			return;
		}
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "claseServicio/membresia/" + codigoMembresia,
			beforeSend : function(xhr) {
				$local.$clasesServicio.find("option:not(:eq(0))").remove();
				$local.$clasesServicio.parent().append("<span class='help-block cargando'><i class='fa fa-spinner fa-pulse fa-fw'></i> Cargando clases de servicio</span>")
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(response) {
				$.each(response, function(i, claseServicio) {
					$local.$clasesServicio.append($("<option />").val(this.codigoClaseServicio).text(this.codigoClaseServicio + " - " + this.descripcion));
				});
				if (opcionSeleccionada != null && opcionSeleccionada != undefined) {
					$local.$clasesServicio.val(opcionSeleccionada).trigger("change.select2");
				}
			},
			complete : function() {
				$local.$clasesServicio.parent().find(".cargando").remove();
			}
		});
	});

	$local.$claseTransaccionFiltroTablaConsulta.on("change", function(event, opcionSeleccionada) {
		var codigo_clase_txn = $(this).val();
		if (codigo_clase_txn == null || codigo_clase_txn == undefined) {
			$local.$codigoTransaccion.find("option:not(:eq(0))").remove();
			return;
		}
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "codigoTransaccion/claseTransaccion/" + codigo_clase_txn,
			beforeSend : function(xhr) {
				$local.$codigoTransaccion.find("option:not(:eq(0))").remove();
				$local.$codigoTransaccion.parent().append("<span class='help-block cargando'><i class='fa fa-spinner fa-pulse fa-fw'></i> Cargando clases de servicio</span>")
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(response) {
				$.each(response, function(i, codigoTransaccion) {
					$local.$codigoTransaccion.append($("<option />").val(this.codigoTransaccion).text($funcionUtil.unirCodigoDescripcion(this.codigoTransaccion, this.descripcion)));
				});
				if (opcionSeleccionada != null && opcionSeleccionada != undefined) {
					$local.$codigoTransaccion.val(opcionSeleccionada).trigger("change.select2");
				}
			},
			complete : function() {
				$local.$codigoTransaccion.parent().find(".cargando").remove();
			}
		});
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
	
	$local.$btnSiguiente.on("click",function(){
		$local.$btnAnterior.removeClass("hidden");
        var indexes = $local.tablaMantenimiento.rows().indexes();
        var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
        var currentPosition = indexes.indexOf(currentIndex);
        
       if ( currentPosition < indexes.length-1 ) {        	 
      	var compensacionSgte = $local.tablaMantenimiento.row( indexes[ currentPosition+1 ] ).data();
      	var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(compensacionSgte.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
      	var data = {
				"numeroTarjeta": compensacionSgte.numeroTarjeta,
				"fechaTransaccion": fechaTransaccion,
				"numeroVoucher": compensacionSgte.numeroVoucher,
				"claseTransaccion": compensacionSgte.claseTransaccion
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionSgte.numeroTarjeta+" ,fechaTransmisión: "+
					compensacionSgte.fechaTransaccion+" ,númeroTrace: "+compensacionSgte.numeroVoucher+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
				}else{
					if(detalleCompensacion.length == 1){
						$local.$modalDetalleConsulta.PopupWindow("open");
						$local.$modalDetalleConsulta.PopupWindow("maximize");
						$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCliente);
						$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCompensacion);
						$funcionUtil.descripcionLarga(detalleCompensacion[0].descripcionGiroNegocio);
					}else{
						$local.$modalDetalleConsulta.PopupWindow("close");
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionSgte.numeroTarjeta+" ,fechaTransmisión: "+
						compensacionSgte.fechaTransaccion+" ,númeroTrace: "+compensacionSgte.numeroVoucher+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
					} 
				}					
			}
		});
   		
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
    	  var compensacionAnt = $local.tablaMantenimiento.row( indexes[ currentPosition-1 ] ).data();
          var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(compensacionAnt.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
          var data = {
  				"numeroTarjeta": compensacionAnt.numeroTarjeta,
  				"fechaTransaccion": fechaTransaccion,
  				"numeroVoucher": compensacionAnt.numeroVoucher,
  				"claseTransaccion": compensacionAnt.claseTransaccion
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionAnt.numeroTarjeta+" ,fechaTransmisión: "+
					compensacionAnt.fechaTransaccion+" ,númeroTrace: "+compensacionAnt.numeroVoucher+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
  				}else{
  					if(detalleCompensacion.length == 1){
  	  					$local.$modalDetalleConsulta.PopupWindow("open");
  	  	  				$local.$modalDetalleConsulta.PopupWindow("maximize");
  	  	  				$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCliente);
  	  	  				$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCompensacion);
  	  	  				$funcionUtil.descripcionLarga(detalleCompensacion[0].descripcionGiroNegocio);
  	  				}else{
  	  					$local.$modalDetalleConsulta.PopupWindow("close");
  						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionAnt.numeroTarjeta+" ,fechaTransmisión: "+
  						compensacionAnt.fechaTransaccion+" ,númeroTrace: "+compensacionAnt.numeroVoucher+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
  	  				}
  				}  					
  			}
  		});	
 		$local.tablaMantenimiento.row( currentIndex ).deselect();
    	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[ currentPosition-1 ] ).select();
 	}
	});
	
	$local.$btnPrimero.on("click",function(){
		$local.$btnAnterior.addClass("hidden");
		$local.$btnSiguiente.removeClass("hidden");
		var indexes = $local.tablaMantenimiento.rows().indexes();
		var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
		var compensacionPrimero = $local.tablaMantenimiento.row( indexes[0] ).data();  
		var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(compensacionPrimero.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
		var data = {
   			"numeroTarjeta": compensacionPrimero.numeroTarjeta,
			"fechaTransaccion": fechaTransaccion,
			"numeroVoucher": compensacionPrimero.numeroVoucher,
			"claseTransaccion": compensacionPrimero.claseTransaccion
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionPrimero.numeroTarjeta+" ,fechaTransmisión: "+
					compensacionPrimero.fechaTransaccion+" ,númeroTrace: "+compensacionPrimero.numeroVoucher+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
				}else{
					
				}
				if(detalleCompensacion.length == 1){
					$local.$modalDetalleConsulta.PopupWindow("open");
					$local.$modalDetalleConsulta.PopupWindow("maximize");
					$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCliente);
					$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCompensacion);
					$funcionUtil.descripcionLarga(detalleCompensacion[0].descripcionGiroNegocio);
				}else{
					$local.$modalDetalleConsulta.PopupWindow("close");
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionPrimero.numeroTarjeta+" ,fechaTransmisión: "+
					compensacionPrimero.fechaTransaccion+" ,númeroTrace: "+compensacionPrimero.numeroVoucher+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
				}			
			}
		});
 		
 		$local.tablaMantenimiento.row( currentIndex ).deselect();
    	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[0] ).select();
	});
	
	$local.$btnUltimo.on("click",function(){
		$local.$btnSiguiente.addClass("hidden");
		$local.$btnAnterior.removeClass("hidden");
		var indexes = $local.tablaMantenimiento.rows().indexes();
		var currentIndex = $local.tablaMantenimiento.row($local.$filaSeleccionada).index();
		var compensacionUltimo = $local.tablaMantenimiento.row( indexes[indexes.length-1] ).data();
		var fechaTransaccion = $funcionUtil.convertirDeFormatoAFormato(compensacionUltimo.fechaTransaccion, "DD/MM/YYYY", "YYYY-MM-DD");
		var data = {
   			"numeroTarjeta": compensacionUltimo.numeroTarjeta,
			"fechaTransaccion": fechaTransaccion,
			"numeroVoucher": compensacionUltimo.numeroVoucher,
			"claseTransaccion": compensacionUltimo.claseTransaccion
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
					$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionUltimo.numeroTarjeta+" ,fechaTransmisión: "+
					compensacionUltimo.fechaTransaccion+" ,númeroTrace: "+compensacionUltimo.numeroVoucher+" no encontró ninguna coincidencia en la Base de Datos.", "fa-exclamation-circle", "Información", "info");
				}else{
					if(detalleCompensacion.length == 1){
						$local.$modalDetalleConsulta.PopupWindow("open");
						$local.$modalDetalleConsulta.PopupWindow("maximize");
						$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCliente);
						$funcionUtil.llenarFormulario(detalleCompensacion[0],$local.$detalleCompensacion);
						$funcionUtil.descripcionLarga(detalleCompensacion[0].descripcionGiroNegocio);
					}else{
						$local.$modalDetalleConsulta.PopupWindow("close");
						$funcionUtil.notificarException("La Búsqueda con los parámetros númeroTarjeta: "+compensacionUltimo.numeroTarjeta+" ,fechaTransmisión: "+
						compensacionUltimo.fechaTransaccion+" ,númeroTrace: "+compensacionUltimo.numeroVoucher+" retornó más de un resultado", "fa-exclamation-circle", "Mensaje", "danger");
					}		
				}						
			}
		});
 		
 		$local.tablaMantenimiento.row( currentIndex ).deselect();
    	$local.$filaSeleccionada = $local.tablaMantenimiento.row( indexes[ indexes.length-1 ] ).select();
	});
});