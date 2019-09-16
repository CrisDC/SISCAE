$(document).ready(function() {
	//var $max_tamaño_error = 200;
	var $local = {
		$tblConsulta : $("#tblSancionados"),
		tblConsulta  : "",
		$tblSancionados : $("#tblSancionadoss"),
		tblSancionados  : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		idPersonaSeleccionada : "",
		fecha :"",
		idInfraccionSeleccionada:"",
		$filaSeleccionada : "",
		$modalMantenimiento : $("#sancionadoModal"),
		
		//div de la pagina
		
		$divPersona: $('#divPersona'),
		$divTipo: $('#divTipo'),
		$divEstado: $('#divEstado'),
		$divPeriodoDia : $('#divPeriodoDia'),
		$divSemanaInicio : $('#divSemanaInicio'),
		$divSemanaFin : $('#divSemanaFin'),
		$divMesInicio : $('#divMesInicio'),
		$divMesFin : $('#divMesFin'),
		$divAnioInicio : $('#divAnioInicio'),
		$divAnioFin : $('#divAnioFin'),
		
		
		
		//inputs de la pagina (select, inputs)
		$tipoPersona : $('#tipoPersona'),
		$numDoc : $('#numeroDocumento'),
		$selectTipoInfraccion : $('#tipoInfraccion'),
		$selectTipoEstado : $('#tipoEstado'),
		$selectTipoInfraccionm : $('#tipoInfraccionm'),
		$selectTipoEstadom : $('#tipoEstadom'),
		
		$selectPeriodo : $('#selectPeriodo'),
		$fechaPrestamo : $('#fechaPrestamo'),
		$semanaInicio : $('#semanaInicio'),
		$anioInicio : $('#anioInicio'),
		$mesInicio : $('#mesInicio'),
		$semanaFin : $('#semanaFin'),
		$anioFin : $('#anioFin'),
		$mesFin : $('#mesFin'),

		
		//Botones de la pagina
		$buscar : $('#buscarI'),
		$limpiar : $('#limpiar')
		
	}
	


	//$funcionUtil.crearDateRangePickerSimple($local.$fechaPrestamo, "YYYY-MM-DD");
	
	//Creando elementos combobox con estilo chevere (Plugin Select2)
    $funcionUtil.crearSelect2($local.$selectTipoEstado);
	$funcionUtil.crearSelect2($local.$selectTipoInfraccion);
	$funcionUtil.crearSelect2($local.$selectTipoEstadom);
	$funcionUtil.crearSelect2($local.$selectTipoInfraccionm);
	$funcionUtil.crearSelect2($local.$selectPeriodo);
	$funcionUtil.crearSelect2($local.$tipoPersona);
	
	//Evento que se dispara cuando el combo Periodo cambie
	$local.$selectPeriodo.on("change", function(){
		var val = $(this).val();

		if(val=="DIA"){
			$funcionUtil.crearDateRangePickerSimple($local.$fechaPrestamo, "YYYY-MM-DD");
			$local.$divPeriodoDia.removeClass("hidden");
			$local.$divSemanaInicio.addClass("hidden");
			$local.$divSemanaFin.addClass("hidden");
			$local.$divMesInicio.addClass("hidden");
			$local.$divMesFin.addClass("hidden");
			$local.$divAnioInicio.addClass("hidden");
			$local.$divAnioFin.addClass("hidden");
		}else if(val == "SEMANA") {
			
			
			$local.$divPeriodoDia.addClass("hidden");
			$local.$divSemanaInicio.removeClass("hidden");
			$local.$divSemanaFin.removeClass("hidden");
			$local.$divMesInicio.addClass("hidden");
			$local.$divMesFin.addClass("hidden");
			$local.$divAnioInicio.addClass("hidden");
			$local.$divAnioFin.addClass("hidden");
		}else if(val == "MES"){
			
			$local.$divPeriodoDia.addClass("hidden");
			$local.$divSemanaInicio.addClass("hidden");
			$local.$divSemanaFin.addClass("hidden");
			$local.$divMesInicio.removeClass("hidden");
			$local.$divMesFin.removeClass("hidden");
			$local.$divAnioInicio.addClass("hidden");
			$local.$divAnioFin.addClass("hidden");
		}else if(val == "ANIO"){
			
			
			$local.$divPeriodoDia.addClass("hidden");
			$local.$divSemanaInicio.addClass("hidden");
			$local.$divSemanaFin.addClass("hidden");
			$local.$divMesInicio.addClass("hidden");
			$local.$divMesFin.addClass("hidden");
			$local.$divAnioInicio.removeClass("hidden");
			$local.$divAnioFin.removeClass("hidden");
		}else{
			$local.$divPeriodoDia.addClass("hidden");
			$local.$divSemanaInicio.addClass("hidden");
			$local.$divSemanaFin.addClass("hidden");
			$local.$divMesInicio.addClass("hidden");
			$local.$divMesFin.addClass("hidden");
			$local.$divAnioInicio.addClass("hidden");
			$local.$divAnioFin.addClass("hidden");
		}
	});
	
	
	/* ---------- Construcción de tabla ---------- */
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tblConsulta.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
			case 500:
				$local.tblConsulta.clear().draw();
				break;
		}
	});
	
	$local.tblConsulta = $local.$tblConsulta.DataTable({
		
			"language" : {
				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
				"emptyTable" : "Ningún dato disponible en esta tabla." // Nuevo
			},
			"initComplete" : function() {
				$local.$tblConsulta.wrap("<div class='table-responsive'></div>");
				//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta);
			},
			"columnDefs" : [ {
				"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7 ],
				"className" : "all filtrable",
			} , {
				"targets" : 8,
				"className" : "all dt-center",
				"defaultContent" : $variableUtil.botonActualizarNuevoi + " " + $variableUtil.botonEliminarNuevoi
			}  ],
			"columns" : [{
				"data" : 'numDocumento',
				"title" : "Num. documento"
			}, {
				"data" : 'appPaterno',
				"title" : "Ap. Paterno"
			}, {
				"data" : 'appMaterno',
				"title" : "Ap. Materno"
			}, {
				"data" : 'nombre',
				"title" : "Nombre"
			}, {
				"data" : 'tipoPersona',
				"title" : "Solicitante"
			}, {
				"data" : 'infraccion',
				"title" : "Detalle"
			}, {
				"data" : 'estado',
				"title" : "Estado"
			}, {
				"data" : 'fecha',
				"title" : "Fecha"
			} ,{
				"data" : null,
				"title" : 'Acci&#243n'
			}]
		});
		
	$local.$tblConsulta.find("thead").on('keyup', 'input', function() {
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	$local.$tblSancionados.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
			case 500:
				$local.tblSancionados.clear().draw();
				break;
		}
	});
	
	
	$local.tblSancionados = $local.$tblSancionados.DataTable({
			"language" : {
				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
				"emptyTable" : "Ningún dato disponible en esta tabla." // Nuevo	
			},
			"initComplete" : function() {
				$local.$tblSancionados.wrap("<div class='table-responsive'></div>");
				//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta);
			},
			"columnDefs" : [ {
				"targets" : [ 0, 1, 2, 3, 4, 5, 6],
				"className" : "all filtrable",
			}],
			"columns" : [{
				"data" : 'doc',
				"title" : "Codigo"
			}, {
				"data" : 'apPat',
				"title" : "Ap. Paterno"
			}, {
				"data" : 'appMat',
				"title" : "Ap. Materno"
			}, {
				"data" : 'nombre',
				"title" : "Nombre"
			}, {
				"data" : 'fechaRe',
				"title" : "Fecha Registro"
			}, {
				"data" : 'fechaLi',
				"title" : "Fecha Libre"
			}, {
				"data" : 'tiempo',
				"title" : "Tiempo"
			}, {
				"data" : 'tipo',
				"title" : "Tipo"
			}]
		});
		
	$local.$tblSancionados.find("thead").on('keyup', 'input', function() {
		$local.tblSancionados.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblSancionados.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblSancionados.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	/* ------ fin Construcción de tablas ------------ */
//	var $local = {
//			$tblConsulta2 : $("#tblSancionados"),
//			tblConsulta2  : ""
//	}
//	/* ---------- Construcción de tabla sancionado ---------- */
//	$.fn.dataTable.ext.errMode = 'none';
//
//	$local.$tblConsulta2.on('xhr.dt', function(e, settings, json, xhr) {
//		switch (xhr.status) {
//			case 500:
//				$local.tblConsulta2.clear().draw();
//				break;
//		}
//	});
//	
//	$local.tblConsulta2 = $local.$tblConsulta2.DataTable({
//		"ajax" : {
//			"url" : $variableUtil.root + "consultaSancionados?accion=buscarTodos",
//			"dataSrc" : ""
//		},
//			"language" : {
//				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
//			},
//			"initComplete" : function() {
//				$local.$tblConsulta2.wrap("<div class='table-responsive'></div>");
//				$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta2);
//			},
//			"columnDefs" : [ {
//				"targets" : [ 0, 1, 2, 3, 4, 5, 6 ],
//				"className" : "all filtrable",
//			} , {
//				"targets" : 6,
//				"className" : "all dt-center",
//			}  ],
//			"columns" : [{
//				"data" : 'docIdentificador',
//				"title" : "Num. documento"
//			}, {
//				"data" : 'appPaterno',
//				"title" : "Ap. Paterno"
//			}, {
//				"data" : 'appMaterno',
//				"title" : "Ap. Materno"
//			}, {
//				"data" : 'nombre',
//				"title" : "Nombre"
//			}, {
//				"data" : 'fechaRegistro',
//				"title" : "Fecha de Sanción"
//			}, {
//				"data" : 'tiempoRestante',
//				"title" : "Tiempo restante"
//			}, {
//				"data" : 'tipoSolicitante',
//				"title" : "Tipo de Solicitante"
//			}]
//		});
//		
//	$local.$tblConsulta2.find("thead").on('keyup', 'input', function() {
//		$local.tblConsulta2.column($(this).parent().index() + ':visible').search(this.value).draw();
//	});
//
//	$local.$tblConsulta2.find("thead").on('change', 'select', function() {
//		var val = $.fn.dataTable.util.escapeRegex($(this).val());
//		$local.tblConsulta2.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
//	});
	
	
	/*---creando datos importantes----*/
	//Creando elementos combobox con estilo chevere (Plugin Select2)
				
			//no se pudo :'v
	
	//Formulario
	$formInfracciones = $("#formInfracciones");
	$formMantenimiento = $("#formMantenimiento");
	
	/*---------CONSTRUCCION DE LAS TABLAS POR FILTROS---------------*/
	/**ACTUALIZAR**/
	$local.$tblConsulta.children("tbody").on("click", ".actualizar", function() {
		//$funcionUtil.prepararFormularioActualizacion($formMantenimiento);
		$local.$filaSeleccionada = $(this).parents("tr");
		var escuela1 = $local.tblConsulta.row($local.$filaSeleccionada).data();
		console.log(escuela1);
		$local.idPersonaSeleccionada = escuela1.idPersona;
		$local.fecha = escuela1.fecha;
		$local.idInfraccionSeleccionada = escuela1.idInfraccion;
		var form = {
				"persona"         : escuela1.nombre.concat(" ",escuela1.appPaterno," ",escuela1.appMaterno),
				"descripcion"     : escuela1.descripcion,
				"tipoInfraccionm" : escuela1.idTipoInfraccion,
				"tipoEstadom"     : escuela1.idEstadoTabla
		}
		$funcionUtil.llenarFormulario(form, $formMantenimiento);

		});
	
	$local.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:not([disabled]):first").focus();
	});

	$local.$modalMantenimiento.on("close.popupwindow", function() {
		$local.idPersonaSeleccionada = "";
	});
	
	$('#san').on("click",function(){
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "Sancionados?accion=buscarPorCriterio",
			//contentType : "application/json",
			//data: criterioB,
			//dataType : "json",
			beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				//Borrando tabla antes de hacer la consulta
				$local.tblSancionados.clear().draw();
			},
			success : function(response) {
				//console.log(response);
				if (response.length === 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				//Dibujando tabla
				
				$local.tblSancionados.rows.add(response).draw();
				//Dibujando grafico
				//var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroPrestamos','Análisis de Préstamos','Número de prestamos', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) <br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] <br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
			},
			error : function(response) {
			}
		});
	});
	
	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var form = $formMantenimiento.serializeJSON();
		
		var infraccion = {
				"idInfraccion" : $local.idInfraccionSeleccionada,
				"descripcion"  : form.descripcion,
				"fecha"        : $local.fecha,
				"idEstadoTabla": form.tipoEstadom,
				"idPersona"    : $local.idPersonaSeleccionada,
				"idTipoInfraccion" : form.tipoInfraccionm
		}
		
		console.log(infraccion);
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "infraccion",
			data : JSON.stringify(infraccion),
			beforeSend : function(xhr) {
				$local.$actualizarMantenimiento.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				$local.tblConsulta.clear().draw();
			},
			statusCode : {
				400 : function(response) {
					//response.responseText.length > $max_tamaño_error ? 
					//		swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
					//		swal("Error", response.responseText, "warning");
				},
				500 : function(response) {
					//response.responseText.length > $max_tamaño_error ? 
							//swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
							//swal("Error", response.responseText, "warning");
				}
			},
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				//$local.tblConsulta.row($local.$filaSeleccionada).remove().draw(false);
				//var row = $local.tablaMantenimiento.row.add(persona).draw();
				//row.show().draw(false);
				/*swal({
					  title: "Operacion realizada con exito",
					  text: "Actualización aplicada",
					  icon: "success",
					  button: false,
					  timer:1000,
	  				});*/
			    $('#buscarI').click();
				$('#cerrm').click();
				//$(row.node()).animateHighlight();
				//$local.$modalMantenimiento.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarMantenimiento.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
	});
	
	/***ELIMINAR***/
	$local.$tblConsulta.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var escuela = $local.tblConsulta.row($local.$filaSeleccionada).data();
		console.log(escuela);
		var infraccion = {"idInfraccion" : escuela.idInfraccion,
				          "descripcion"  : escuela.descripcion,
				          "fecha"        : escuela.fecha,
				          "idEstadoTabla": escuela.idEstadoTabla,
				          "idPersona"    : escuela.idPersona,
				          "idTipoInfraccion" : escuela.idTipoInfraccion,
		                         };
		console.log(infraccion);
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la infracción <b>'" + escuela.infraccion + " - " + escuela.nombre + "'<b/>?",
			buttons : {
				Aceptar : {
					action : function() {
						var confirmar = $.confirm({
							icon : 'fa fa-spinner fa-pulse fa-fw',
							title : "Eliminando...",
							content : function() {
								var self = this;
								self.buttons.close.hide();
								$.ajax({
									type : "DELETE",
									url : $variableUtil.root + "infraccion",
									data : JSON.stringify(infraccion),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									},
									statusCode : {
										400 : function(response) {
											confirmar.close();
//											response.responseText.length > $max_tamaño_error ? 
//													swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
//													swal("Error", response.responseText, "warning");
										},
										500 : function(response) {
											confirmar.close();
//											response.responseText.length > $max_tamaño_error ? 
//													swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
//													swal("Error", response.responseText, "warning");
											
										}
									},
								}).done(function(escuelaResponse) {
									$funcionUtil.notificarException(escuelaResponse, "fa-check", "Aviso", "success");
									$local.tblConsulta.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								});
							},
							buttons : {
								close : {
									text : 'Aceptar'
								}
							}
						});
					},
					keys : [ 'enter' ],
					btnClass : "btn-primary"
				},
				Cancelar : {
					keys : [ 'esc' ]
				},
			}
		});
		
	});
	
	/***dfdf*/
	
	
	var obtenerCriterio = function (){
						
		var criterio = $formInfracciones.serializeJSON();
		criterio.tipoPersona = $local.$tipoPersona.val();
		criterio.numeroDocumento = $local.$numDoc.val();
		criterio.selectTipoInfraccion = $local.$selectTipoInfraccion.val();
		criterio.selectTipoEstado = $local.$selectTipoEstado.val();
		
		console.log(criterio);
		//Obtener datos del periodo
		if($local.$selectPeriodo.val() == 'DIA'){
			var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$fechaPrestamo);
			criterio.fechaInicio = rangoFechaBusqueda.fechaInicio;
			criterio.fechaFin = rangoFechaBusqueda.fechaFin;
		}
		if($local.$selectPeriodo.val() == 'SEMANA'){
			criterio.semanaInicio = $funcionUtil.obtenerSemanaInputWeek($local.$semanaInicio);
			criterio.anioInicio = $funcionUtil.obtenerAnioInputWeek($local.$semanaInicio);
			criterio.semanaFin = $funcionUtil.obtenerSemanaInputWeek($local.$semanaFin);
			criterio.anioFin = $funcionUtil.obtenerAnioInputWeek($local.$semanaFin);
		}
		if($local.$selectPeriodo.val() == 'MES'){
			criterio.mesInicio = $funcionUtil.obtenerMesInputMonth($local.$mesInicio);
			criterio.anioInicio = $funcionUtil.obtenerAnioInputMonth($local.$mesInicio);
			criterio.mesFin = $funcionUtil.obtenerMesInputMonth($local.$mesFin);
			criterio.anioFin = $funcionUtil.obtenerAnioInputMonth($local.$mesFin);
		}
		if($local.$selectPeriodo.val() == 'ANIO'){
			criterio.anioInicio = $local.$anioInicio.val();
			criterio.anioFin = $local.$anioFin.val();
		}
		
		return criterio;
	}
	
	var contador = function(){
		
		var cont = 0;
		
		if($local.$tipoPersona.val()==-1 )	cont++;
		if($local.$numDoc.val()=='' )	cont++;
		if($local.$selectTipoInfraccion.val()==-1 )	cont++;
		if($local.$selectTipoEstado.val()==-1 )	cont++;
		if($local.$selectPeriodo.val()==-1 ){
			cont++;
		}else{
			if($local.$selectPeriodo.val() == 'DIA'){
				console.log($local.$fechaPrestamo.val());
				//if($local.$fechaPrestamo.val() ==null)cont++;
			}
			if($local.$selectPeriodo.val() == 'SEMANA'){
								
				if( $local.$semanaInicio.val() =='' || $local.$semanaFin.val() =='') cont++;
			}
			if($local.$selectPeriodo.val() == 'MES'){
				
				if( $local.$mesInicio.val() =='' || $local.$mesFin.val() =='') cont++;
			}
			if($local.$selectPeriodo.val() == 'ANIO'){
				
				if( $local.$anioInicio.val() =='' || $local.$anioFin.val() =='') cont++;
			}
		}
						
		return cont;
		
		
	}
	
	$local.$buscar.on('click', function() {
		
		var criterioB = obtenerCriterio();
		var c = contador();
		console.log(c);
		if(c ==5){
			swal("No se pudo realizar la búsqueda", "No ingreso ningún valor", "error");
		}else{
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "infraccionDetalle?accion=buscarPorCriterio",
				contentType : "application/json",
				data: criterioB,
				dataType : "json",
				beforeSend : function(xhr) {
					xhr.setRequestHeader('Content-Type', 'application/json');
					//Borrando tabla antes de hacer la consulta
					$local.tblConsulta.clear().draw();
					$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(response) {
					console.log(response);
					if (response.length === 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					//Dibujando tabla
					
					$local.tblConsulta.rows.add(response).draw();
					//Dibujando grafico
					//var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroPrestamos','Análisis de Préstamos','Número de prestamos', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) <br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] <br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
				},
				error : function(response) {
				},
				complete : function() {
					$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
		
		
	});
	
	
$local.$limpiar.on('click', function() {
		
	var f ={
			"numeroDocumento":"",
			"tipoPersona":-1,
			"tipoInfraccion":-1,
			"tipoEstado":-1,
			"tipoPeriodo":-1
			
	}
	$funcionUtil.llenarFormulario(f,$formInfracciones);
	$local.$divPeriodoDia.addClass("hidden");
	$local.$divSemanaInicio.addClass("hidden");
	$local.$divSemanaFin.addClass("hidden");
	$local.$divMesInicio.addClass("hidden");
	$local.$divMesFin.addClass("hidden");
	$local.$divAnioInicio.addClass("hidden");
	$local.$divAnioFin.addClass("hidden");
	$local.tblConsulta.clear().draw();
	});
	

	
	/* ------ Construcción de modal ------------ */	
	$('#infraccionModal').on('show.bs.modal', function (event){
		var button = $(event.relatedTarget)
		var numDoc = button.data('doc')
		var codigo = button.data('codigo')
		var nombre = button.data('nombre')
		var apellidos = button.data('apellidos')
		
		var modal = $(this)
		
		modal.find('#codigoAlumno').text(codigo);
		modal.find('#nombreAlumno').text(nombre);
		modal.find('#apellidosAlumno').text(apellidos);
		modal.find('#numDoc').text(numDoc);
		
		$('#btnRegistrar').on('click', function (event){
			
			var combo = document.getElementById("tipoInfracciona");
			var txtArea = $('#inputDescripcionInfraccion');
			
			var idItem = combo.value;
			var descripcion = txtArea.val();
			
			var movimientoInfraccion = {
				"numDocumento" : numDoc,
				"idTipoInfraccion" : idItem,
				"descripcion" : descripcion
			};
			
			
			$.ajax({
				url :  $variableUtil.root + "movimientoInfraccion",
				type : 'POST',
				data : JSON.stringify(movimientoInfraccion),
                beforeSend : function(xhr) {
    				xhr.setRequestHeader('Content-Type', 'application/json');
    				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
    			},
    			statusCode : {
    				400 : function(response) {
    						swal(response.responseJSON);
    					},
      				500 : function(response) {
      					swal("Error", response.responseText, "warning");
      				}
    			},
    			success : function(response) {
    				console.log(response)
	    			swal({
  					  title: "Operacion realizada con exito",
  					  text: "Infraccion aplicada",
  					  icon: "success",
  					  button: false,
  					  timer: 1000,
	  				}).then((value) => {
	  					$('#btnClose').click();
	  				});
	    				
    			},
    			error : function(response) {
    				swal("Error", "Ha ocurrido un problema con el servidor", "warning"); 
    			},
    			complete : function(response) {
    				
    			}
			});
			
			
		});
		
		
	});
	

});