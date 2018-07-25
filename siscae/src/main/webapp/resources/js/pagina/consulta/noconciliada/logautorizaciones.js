$(document).ready(function() {
	
	var $local = {
		$tablaConsulta : $("#tablaConsulta"),
		tablaConsulta : "",
		$tablaConsultaPorDia : $("#tablaConsultaPorDia"),
		tablaConsultaPorDia : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$aniadirMantenimento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$filaSeleccionada : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		codigo_clase_servicioSeleccionado : "",
		codigo_membresiaSeleccionado : "",
		$membresias : $("#membresias"),
		$membresiasFiltroParaTableMantenimiento : $("#membresias-filtroParatablaConsulta"),
		filtrosSeleccionables : [],
		$resultadoBusqueda :  $("#resultadoBusqueda"),
		$transaccionesNoConciliadasPorFechasChart : null,
		$buscarCriterios : $("#buscarCriterios"),
		$formTipoBusqueda : $("#formTipoBusqueda"),
		$fechaCorte : $("#fechaCorte")
	};

	$funcionUtil.crearDatePickerSimple($local.$fechaCorte, "YYYY-MM-DD");
	
	transaccionesNoConciliadasPorFechasPropiedadesChart = {
				"type": "serial",
				"categoryField": "fechaTxn",
				"angle": 30,
				"depth3D": 30,
				"startDuration": 1,
				"color": "#E01D1D",
				"handDrawScatter": 8,
				"handDrawThickness": 21,
				"theme": "default",
				"categoryAxis": {
					"gridPosition": "start"
				},
				"trendLines": [],
				"graphs": [
					{
						"balloonText": "[[title]] - [[category]] : [[value]]",
						"fillAlphas": 1,
						"id": "AmGraph-1",
						"title": "Txn Conciliadas",
						"type": "column",
						"valueField": "numeroTxnConciliadas"
					},
					{
						"balloonText": "[[title]] - [[category]]:[[value]]",
						"fillAlphas": 1,
						"id": "AmGraph-2",
						"title": "Txn No Conciliadas",
						"type": "column",
						"valueField": "numeroTxnNoConciliadas"
					}
				],
				"guides": [],
				"valueAxes": [
					{
						"id": "ValueAxis-1",
						"stackType": "regular",
						"title": "Número de Transacciones"
					}
				],
				"allLabels": [],
				"balloon": {},
				"legend": {
					"enabled": true,
					"useGraphSettings": true
				},
				"titles": [
					{
						"id": "Transacciones",
						"size": 15,
						"text": "Autorizaciones no conciliadas"
					}
				]
	};
	
	var transaccionesNoConciliadasPorFechasChart = AmCharts.makeChart("graficoLogAutorizacionesNoConciliadas", transaccionesNoConciliadasPorFechasPropiedadesChart);
	
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaConsulta.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaConsulta.clear().draw();
			break;
		}
	});
	
	var buttonCommon = {
	        exportOptions: {
	            format: {
	                body: function ( data, row, column, node ) {
	                    // Strip $ from salary column to make it numeric
	                    return column === 1 ?
	                         (data.substring(0,4) + " " +
	                          data.substring(4,8) + " " +
	                          data.substring(8,12) + " " +
	                          data.substring(12,16)):
	                        data;
	                }
	            },
	            columns:  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18,19 ],
	        }
			/*,
			customize:  function (xlsx) {
				var sheet = xlsx.xl.worksheets['styles.xml'];
			 
			}*/
	 };

	$local.tablaConsulta = $local.$tablaConsulta.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "logautorizaciones?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se han encontrado Autorizaciones con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaConsulta.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsulta, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12,13,14,15,16,17,18,19],
			"className" : "all filtrable dt-center",
		}, {
			"targets" :  6 ,
			"className" : "all filtrable dt-right",
		}
		],
		"columns" : [ {
			"data" : 'tipoMensaje',
			"title" : "Tipo Mensaje"
		}, {
			"data" : 'numeroTarjeta',
			"title" : "Nº Tarjeta"
		}, {
			"data" : "tipoDocumento",
			"title" : "Tipo Documento"
		}, {
			"data" : "numeroDocumento",
			"title" : "Número Documento"
		}, {
			"data" : "nombres",
			"title" : "Nombres"
		}, {
			"data" : "apellidoPaterno",
			"title" : "Apellido Paterno"
		}, {
			"data" : "apellidoMaterno",
			"title" : "Apellido Materno"
		}, {
			"data" : 'descripcionCanal',
			"title" : "Canal"
		}, {
			"data" : 'descripcionProceso',
			"title" : "Proceso"
		}, {
			"data" : 'codigoProcesamiento',
			"title" : "Cód Proc"
		}, {
			"data" : 'monedaTransaccion',
			"title" : "Moneda Txn"
		}, {
			"data" : 'valorTransaccion',
			"title" : "Valor Txn"
		}, {
			"data" : 'fechaTransmision',
			"title" : "Fecha Txn"
		}, {
			"data" : 'horaTransmision',
			"title" : "Hora Txn"
		}, {
			"data" : 'trace',
			"title" : "Trace"
		}, {
			"data" : 'codigoAutorizacion',
			"title" : "Código Autorización"
		}, {
			"data" : 'descripcionRespuesta',
			"title" : "Código Respuesta"
		}, {
			"data" : 'idTerminal',
			"title" : "Id Terminal"
		}, {
			"data" : 'adquirente',
			"title" : "Adquirente"
		}, {
			"data" : 'numeroDias',
			"title" : "N° Días"
		}]
	});
	
	
	new $.fn.dataTable.Buttons( $local.tablaConsulta, {
	    buttons: [
	    	$.extend( true, {}, buttonCommon, {
                extend: 'excelHtml5'
            } )
	    ]
	} );
	 
	$local.tablaConsulta.buttons().container()
	    .appendTo( $('.col-sm-6:eq(0)', $local.tablaConsulta.table().container() ) );
	
	
	$local.$tablaConsulta.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaConsulta.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	$local.tablaConsultaPorDia = $local.$tablaConsultaPorDia.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "logautorizaciones?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se han encontrado Autorizaciones con los criterios definidos."
		},
		"initComplete" : function() {
			$local.$tablaConsultaPorDia.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsultaPorDia, $local.filtrosSeleccionables);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5],
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
		}]
	});
	
	$local.$tablaConsultaPorDia.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaConsultaPorDia.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaConsultaPorDia.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});


	$local.$buscarCriterios.on("click",function(){
		var data = $local.$formTipoBusqueda.serialize();
		$local.tablaConsulta.ajax.url($variableUtil.root + "logautorizaciones?accion=buscarPorCriterios&" + data).load();
		$local.tablaConsultaPorDia.ajax.url($variableUtil.root + "logautorizaciones?accion=buscarPorDia&" + data).load();
		$local.$resultadoBusqueda.removeClass("hidden");
		$.ajax({
	        type: "GET",
	        url: $variableUtil.root + "logautorizaciones?accion=buscarPorDia",
	        contentType: "application/json",
	        dataType: "json",
	        data: data,
	        beforeSend : function() {
				$local.tablaConsulta.clear().draw();
				$local.$buscarCriterios.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
	        success: function(response) {
	        	transaccionesNoConciliadasPorFechasChart.dataProvider = response;
	        	transaccionesNoConciliadasPorFechasChart.validateData();
	        },
	        error: function(response) {
	           
	        },
	        complete : function() {
				$local.$buscarCriterios.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
	    });
		
	});
	
});