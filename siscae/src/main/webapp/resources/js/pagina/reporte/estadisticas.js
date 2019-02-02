$(document).ready(function() {
	
	var $local = {
			//Inputs de la pagina (SELECTS, INPUTS)
			$selectTipoGrafico : $('#selectTipoGrafico'),
			$selectPeriodo : $('#selectPeriodo'),
			$selectEjeX : $('#selectEjeX'),
			$selectSeries: $('#selectSeries'),
			$selectSegmY : $('#selectSegmY'),
			$selectPresentacion : $('#selectPresentacion'),
			$selectAreaEstudio : $('#selectAreaEstudio'),
			$selectEscuela : $('#selectEscuela'),
			$selectRecurso : $('#selectRecurso'),
			$selectSolicitante : $('#selectSolicitante'),
			$fechaPrestamo : $('#fechaPrestamo'),
			$semanaInicio : $('#semanaInicio'),
			$anioInicio : $('#anioInicio'),
			$mesInicio : $('#mesInicio'),
			$semanaFin : $('#semanaFin'),
			$anioFin : $('#anioFin'),
			$mesFin : $('#mesFin'),
			
			//Divs de la pagina
			$divPeriodoDia : $('#divPeriodoDia'),
			$divSemanaInicio : $('#divSemanaInicio'),
			$divSemanaFin : $('#divSemanaFin'),
			$divMesInicio : $('#divMesInicio'),
			$divMesFin : $('#divMesFin'),
			$divAnioInicio : $('#divAnioInicio'),
			$divAnioFin : $('#divAnioFin'),
			$divPresentacion : $('#divPresentacion'),
			$divSerie : $('#divSerie'),
			$divEjeX : $('#divEjeX'),
			$divSegmY : $('#divSegmY'),
			
			$divTablaResumenPrestamo : $('#divTablaResumenPrestamo'),
			$divTablaResumenInfraccion : $('#divTablaResumenInfraccion'),
			$divTablaResumenPrestamoSegmentado : $('#divTablaResumenPrestamoSegmentado'),
			
			//Botones de la pagina
			$buscar : $('#buscar'),
			$exportar : $('#exportar'),
			//Tipo Reporte
			$tipoReporte:'P',
			
			//DataTable
			$tablaResultadosPrestamo : $("#tblReporteResumenPrestamo"),
			tablaResultadosPrestamo : "",
			$tablaResultadosInfraccion : $("#tblReporteResumenInfraccion"),
			tablaResultadosInfraccion : "",
				
			$tablaResultadosPrestamoSegementado : $("#tblReporteResumenPrestamoSegmentado"),
			tablaResultadosPrestamoSegementado : ""
			
			
		};

	$funcionUtil.crearDateRangePickerSimple($local.$fechaPrestamo, "YYYY-MM-DD");
	
	//Creando elementos combobox con estilo chevere (Plugin Select2)
	$funcionUtil.crearSelect2($local.$selectTipoGrafico);
	$funcionUtil.crearSelect2($local.$selectPeriodo);
	$funcionUtil.crearSelect2($local.$selectEjeX);
	$funcionUtil.crearSelect2($local.$selectSegmY);
	$funcionUtil.crearSelect2($local.$selectSeries);
	$funcionUtil.crearSelect2($local.$selectPresentacion);
	$funcionUtil.crearMultipleSelect2($local.$selectAreaEstudio, "TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selectEscuela, "TODOS");	
	$funcionUtil.crearMultipleSelect2($local.$selectRecurso, "TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selectSolicitante, "TODOS");
	
	//Formulario
	$formEstadisticas = $("#formEstadisticas");
	
	//Evento que se dispara cuando el combo Periodo cambie
	$local.$selectPeriodo.on("change", function(){
		var val = $(this).val();
		if(val=="DIA"){
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
		}	
	});
	
	//Evento que se dispara cuando el combo Segmentacion en Y cambie
	$local.$selectSegmY.on("change", function(){
		var val = $(this).val();
		if(val != "NINGUNA" && $local.$selectTipoGrafico.val() == "BARRAS"){
			$local.$divPresentacion.removeClass("hidden");
		}else{
			$local.$divPresentacion.addClass("hidden");
		}
	});

	//Evento que se dispara cuando el combo Eje X cambia
	$local.$selectEjeX.on("change", function(){
		let data;
		let title;
		switch($local.$selectEjeX.val()){
			case "PERIODO":{
				data = "periodoPrestamo",
				title = "Periodo"
				break;
			}
			case "ESCUELA":{
				data = "ejeX",
				title = "Escuela"
				break;
			}
			case "AREA_ESTUDIO":{
				data = "ejeX",
				title = "Area Estudio"
				break;
			}
		}
		cambiarEjeXTabla(data, title);
		
	});
	
	//Evento que se dispara cuando el combo Segmentacion en Y cambie
	$local.$selectTipoGrafico.on("change", function(){
		var val = $(this).val(); 	
		if(val == "BARRAS"){
			$local.$divSegmY.removeClass("hidden");
			$local.$divSerie.addClass("hidden");
			$local.$divEjeX.removeClass("hidden");
			if($local.$selectSegmY.val() != "NINGUNA"){
				$local.$divPresentacion.removeClass("hidden");
			}else{
				$local.$divPresentacion.addClass("hidden");
			}
		}
		if(val == "PIE"){
			$local.$divSerie.removeClass("hidden");
			$local.$divEjeX.addClass("hidden");
			$local.$divSegmY.addClass("hidden");
			$local.$divPresentacion.addClass("hidden");
		}		
		if(val == "LINEAL"){
			$local.$divSerie.addClass("hidden");
			$local.$divEjeX.addClass("hidden");
			$local.$divSegmY.addClass("hidden");
			$local.$divPresentacion.addClass("hidden");
		}
	});
	
	var obtenerCriteriosDeBusqueda = function () {
		var criterioBusqueda = $formEstadisticas.serializeJSON();
		criterioBusqueda.ejeX=$local.$selectEjeX.val();
		criterioBusqueda.serie=$local.$selectSeries.val();
		criterioBusqueda.criterioSegmentacion=$local.$selectSegmY.val();
		console.log(criterioBusqueda);
		//Obtener datos del periodo
		if($local.$selectPeriodo.val() == 'DIA'){
			var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$fechaPrestamo);
			criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
			criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		}
		if($local.$selectPeriodo.val() == 'SEMANA'){
			criterioBusqueda.semanaInicio = $funcionUtil.obtenerSemanaInputWeek($local.$semanaInicio);
			criterioBusqueda.anioInicio = $funcionUtil.obtenerAnioInputWeek($local.$semanaInicio);
			criterioBusqueda.semanaFin = $funcionUtil.obtenerSemanaInputWeek($local.$semanaFin);
			criterioBusqueda.anioFin = $funcionUtil.obtenerAnioInputWeek($local.$semanaFin);
		}
		if($local.$selectPeriodo.val() == 'MES'){
			criterioBusqueda.mesInicio = $funcionUtil.obtenerMesInputMonth($local.$mesInicio);
			criterioBusqueda.anioInicio = $funcionUtil.obtenerAnioInputMonth($local.$mesInicio);
			criterioBusqueda.mesFin = $funcionUtil.obtenerMesInputMonth($local.$mesFin);
			criterioBusqueda.anioFin = $funcionUtil.obtenerAnioInputMonth($local.$mesFin);
		}
		if($local.$selectPeriodo.val() == 'ANIO'){
			criterioBusqueda.anioInicio = $local.$anioInicio.val();
			criterioBusqueda.anioFin = $local.$anioFin.val();
		}
		return criterioBusqueda;
	}

	var cambiarEjeXTabla = function (data, title){
		$local.tablaResultadosPrestamo.destroy();
		$local.tablaResultadosInfraccion.destroy();

		$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable({
			"language" : {
				"emptyTable" : "No hay registros encontrados."
			},
			"pageLength": 10,
			"initComplete" : function() {
				$local.$tablaResultadosPrestamo.wrap("<div class='table-responsive'></div>");
			},
			"columnDefs" : [ {
				"targets" : [ 0],
				"className" : "all dt-center fondo-blanco"
			},{
				"targets" : [ 1, 2, 3],
				"className" : "all dt-right"
			} ],
			"columns" : [ {
				"data" : data,
				"title" : title
			}, {
				"data" : "numeroPrestamos",
				"title" : "Cantidad Prestamos"
			}, {
				"data" : "estadiaTotal",
				"title" : "Tiempo Total Estadia"
			}, {
				"data" : "estadiaPromedio",
				"title" : "Tiempo Medio Estadia"
			}]
		});
	
		
		$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable({
			"language" : {
				"emptyTable" : "No hay registros encontrados."
			},
			"pageLength": 10,
			"initComplete" : function() {
				$local.$tablaResultadosInfraccion.wrap("<div class='table-responsive'></div>");
			},
			"columnDefs" : [ {
				"targets" : [ 0],
				"className" : "all dt-center fondo-blanco"
			},{
				"targets" : [ 1, 2, 3],
				"className" : "all dt-right"
			} ],
			"columns" : [ {
				"data" : data,
				"title" : title
			}, {
				"data" : "numeroInfracciones",
				"title" : "Cantidad Infracciones"
			}, {
				"data" : "numeroSancionados",
				"title" : "Cantidad Sancionados"
			}, {
				"data" : "numeroInfraccionesPromedioPorAlumno",
				"title" : "Infracciones promedio"
			}]
		});
	}
	
	$local.$buscar.on('click', function() {
		console.log("ESTO ES EL DATATBLE");
		console.log($local.tablaResultadosPrestamo);
		if (!$formEstadisticas.valid()) {
			return;
		}
		
		if (!$funcionUtil.validarInputsPeriodo($local.$semanaInicio,$local.$semanaFin,$local.$mesInicio,$local.$mesFin,$local.$anioInicio,$local.$anioFin, $local.$selectPeriodo.val())) {
			$funcionUtil.notificarException("Rango de periodo incorrecto", "fa-exclamation-circle", "Información", "info");
			return;
		}
		var criterioBusqueda = obtenerCriteriosDeBusqueda();
		//Obteniendo parametros de la grafica
		let tipoGrafico = $local.$selectTipoGrafico.val();
		let segmentacionY = $local.$selectSegmY.val();
		let ejeX = $local.$selectEjeX.val();
		let serie= $local.$selectSeries.val();
		
		if($local.$tipoReporte =="P"){
			if(tipoGrafico == "PIE"){
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorCriterio",
						contentType : "application/json",
						data: criterioBusqueda,
						dataType : "json",
						beforeSend : function(xhr) {
							xhr.setRequestHeader('Content-Type', 'application/json');
							//Borrando tabla antes de hacer la consulta
							$local.tablaResultadosPrestamo.clear().draw();
							$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
						},
						success : function(response) {
							if (response.length === 0) {
								$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
								return;
							}
							//Dibujando tabla
							
							$local.tablaResultadosPrestamo.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroPrestamos','Análisis de Préstamos','Número de prestamos', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) <br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] <br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
						},
						error : function(response) {
						},
						complete : function() {
							$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
						}
					});
			}
			if(tipoGrafico == "BARRAS"){
				if(ejeX=="PERIODO"){
					if(segmentacionY=="NINGUNA"){
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSinSegmentar",
							contentType : "application/json",
							data: criterioBusqueda,
							dataType : "json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader('Content-Type', 'application/json');
								//Borrando tabla antes de hacer la consulta
								$local.tablaResultadosPrestamo.clear().draw();
								$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
							},
							success : function(response) {
								if (response.length === 0) {
									$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
									return;
								}
								//Dibujando tabla
								console.log(response);
								$local.tablaResultadosPrestamo.rows.add(response).draw();
								//Dibujando grafico
								var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroPrestamos','Análisis de préstamos por periodo','Número de prestamos','<b>Periodo:</b> [[category]] </br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] </br> <b>Tiempo Prom: </b> [[estadiaPromedio]]'));
							},
							error : function(response) {
							},
							complete : function() {
								$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
							}
						});
					}else{
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSegmentado",
							contentType : "application/json",
							data: criterioBusqueda,
							dataType : "json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader('Content-Type', 'application/json');
								//Borrando tabla antes de hacer la consulta
								$local.tablaResultadosPrestamo.clear().draw();
								$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
							},
							success : function(response) {
								if (response.length === 0) {
									$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
									return;
								}
								console.log(response);
								//Dando formato a respuesta del servidor
								var data = [];
								var aux;
								for (i=0;i<response.length;i++){
									aux= new Object();
									aux['ejeX'] = response[i].ejeX;
									for (j=0;j<response[i].detalle.length;j++){
										aux[response[i].detalle[j].segmento] = response[i].detalle[j].numeroPrestamos;
									}
									data.push(aux);
								}
								//Generando Leyenda
								var resultGraph = [];
								var arrayJSONX = response[0].detalle;
								arrayJSONX.sort();								
								for(i=0;i<arrayJSONX.length;i++){
									var g = new Object();
									g['balloonText'] = "<b style='font-size:12px'>[[title]]</b><br><span><b>Periodo : </b></span> [[category]]<br><span><b>Número Préstamos: </b> [[value]]";
									g['fillAlphas'] = 0.8;
									g['labelText'] = "[[value]]";
									g['labelPosition'] = "middle";
									g['lineAlpha'] = 0.3;
									g['title'] = arrayJSONX[i].segmento;
									g['type'] = "column";
									g['valueField'] = arrayJSONX[i].segmento;
									resultGraph.push(g);
								}
								//obteniendo presentacion
								var presentacion ='';
								if($local.$selectPresentacion.val()=="APILADO"){
									presentacion='regular';
								}
								else if ($local.$selectPresentacion.val()=="PARALELO"){
									presentacion='none';
								}
								//Dibujando tabla
								//$local.tablaResultadosPrestamo.rows.add(response).draw();
								//Dibujando grafico
								var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Préstamos',presentacion,'Prestamos por criterio'));
								data = [];
								resultGraph = [];
								arrayJSONX = [];
							},
							error : function(response) {
							},
							complete : function() {
								$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
							}
						});
					}
				}else{
					if(segmentacionY=="NINGUNA"){
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorEjeXSinSegmentar",
							contentType : "application/json",
							data: criterioBusqueda,
							dataType : "json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader('Content-Type', 'application/json');
								//Borrando tabla antes de hacer la consulta
								$local.tablaResultadosPrestamo.clear().draw();
								$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
							},
							success : function(response) {
								if (response.length === 0) {
									$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
									return;
								}
								console.log("RESPONSE: ");
								console.log(response);
								//Dibujando tabla
								$local.tablaResultadosPrestamo.rows.add(response).draw();
								//Dibujando grafico
								var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroPrestamos','Análisis de préstamos por periodo','Número de prestamos','<b>'+ejeX+':</b> [[category]] </br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] </br> <b>Tiempo Prom: </b> [[estadiaPromedio]]'));
							},
							error : function(response) {
							},
							complete : function() {
								$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
							}
						});
					}else{
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorEjeXSegmentado",
							contentType : "application/json",
							data: criterioBusqueda,
							dataType : "json",
							beforeSend : function(xhr) {
								xhr.setRequestHeader('Content-Type', 'application/json');
								//Borrando tabla antes de hacer la consulta
								$local.tablaResultadosPrestamo.clear().draw();
								$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
							},
							success : function(response) {
								if (response.length === 0) {
									$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
									return;
								}
								console.log(response);
								//Dando formato a respuesta del servidor
								var data = [];
								var aux;
								for (i=0;i<response.length;i++){
									aux= new Object();
									aux['ejeX'] = response[i].ejeX;
									for (j=0;j<response[i].detalle.length;j++){
										aux[response[i].detalle[j].segmento] = response[i].detalle[j].numeroPrestamos;
									}
									data.push(aux);
								}
								//Generando Leyenda
								var resultGraph = [];
								var arrayJSONX = response[0].detalle;
								arrayJSONX.sort();								
								for(i=0;i<arrayJSONX.length;i++){
									var g = new Object();
									g['balloonText'] = "<b style='font-size:12px'>[[title]]</b><br><span><b>"+ejeX+" : </b></span> [[category]]<br><span><b>Número Préstamos: </b> [[value]]";
									g['fillAlphas'] = 0.8;
									g['labelText'] = "[[value]]";
									g['labelPosition'] = "middle";
									g['lineAlpha'] = 0.3;
									g['title'] = arrayJSONX[i].segmento;
									g['type'] = "column";
									g['valueField'] = arrayJSONX[i].segmento;
									resultGraph.push(g);
								}
								//obteniendo presentacion
								var presentacion ='';
								if($local.$selectPresentacion.val()=="APILADO"){
									presentacion='regular';
								}
								else if ($local.$selectPresentacion.val()=="PARALELO"){
									presentacion='none';
								}
								//Dibujando tabla
								//$local.tablaResultadosPrestamo.rows.add(response).draw();
								//Dibujando grafico
								var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Préstamos',presentacion,'Prestamos por criterio'));
								data = [];
								resultGraph = [];
								arrayJSONX = [];
							},
							error : function(response) {
							},
							complete : function() {
								$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
							}
						});
					}
				}
				
			}if(tipoGrafico == "LINEAL"){
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSinSegmentar",
					contentType : "application/json",
					data: criterioBusqueda,
					dataType : "json",
					beforeSend : function(xhr) {
						xhr.setRequestHeader('Content-Type', 'application/json');
						//Borrando tabla antes de hacer la consulta
						//$local.tablaResultadosPrestamo.clear().draw();
						$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
					},
					success : function(response) {
						if (response.length === 0) {
							$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
							return;
						}
						console.log(response);
						//Dibujando tabla
						//$local.tablaResultadosPrestamo.rows.add(response).draw();
						//Dibujando grafico
						var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoLineal(response,'periodoPrestamo','numeroPrestamos',"<b>Periodo:</b> [[category]] </br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] </br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
					},
					error : function(response) {
					},
					complete : function() {
						$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
					}
				});
			}
		}
		else if($local.$tipoReporte =="I"){
			if(tipoGrafico == "PIE"){
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorCriterio",
					contentType : "application/json",
					data: criterioBusqueda,
					dataType : "json",
					beforeSend : function(xhr) {
						xhr.setRequestHeader('Content-Type', 'application/json');
						//Borrando tabla antes de hacer la consulta
						$local.tablaResultadosPrestamo.clear().draw();
						$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
					},
					success : function(response) {
						if (response.length === 0) {
							$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
							return;
						}
						//Dibujando tabla
						$local.tablaResultadosInfraccion.rows.add(response).draw();
						//Dibujando grafico
						var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroInfracciones','Análisis de Infracciones','Número de Infracciones', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) </br>  <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados]] <br> <b>Infracciones Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]"));
					},
					error : function(response) {
					},
					complete : function() {
						$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
					}
				});
		}
		if(tipoGrafico == "BARRAS"){
			if(ejeX=="PERIODO"){
				if(segmentacionY=="NINGUNA"){
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorPeriodoSinSegmentar",
						contentType : "application/json",
						data: criterioBusqueda,
						dataType : "json",
						beforeSend : function(xhr) {
							xhr.setRequestHeader('Content-Type', 'application/json');
							//Borrando tabla antes de hacer la consulta
							$local.tablaResultadosInfraccion.clear().draw();
							$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
						},
						success : function(response) {
							if (response.length === 0) {
								$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
								return;
							}
							//Dibujando tabla
							$local.tablaResultadosInfraccion.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroInfracciones','Análisis de Infracciones por periodo','Número de Infracciones','<b>Periodo:</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Número de sancionados: </b> [[numeroSancionados]] </br> <b>Num Infracc. Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]'));
						},
						error : function(response) {
						},
						complete : function() {
							$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
						}
					});
				}else{
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorPeriodoSegmentado",
						contentType : "application/json",
						data: criterioBusqueda,
						dataType : "json",
						beforeSend : function(xhr) {
							xhr.setRequestHeader('Content-Type', 'application/json');
							//Borrando tabla antes de hacer la consulta
							$local.tablaResultadosInfraccion.clear().draw();
							$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
						},
						success : function(response) {
							if (response.length === 0) {
								$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
								return;
							}
							console.log(response);
							//Dando formato a respuesta del servidor
							var data = [];
							var aux;
							for (i=0;i<response.length;i++){
								aux= new Object();
								aux['ejeX'] = response[i].ejeX;
								for (j=0;j<response[i].detalle.length;j++){
									aux[response[i].detalle[j].segmento] = response[i].detalle[j].numeroInfracciones;
								}
								data.push(aux);
							}
							console.log(data);
							//Generando Leyenda
							var resultGraph = [];
							var arrayJSONX = response[0].detalle;
							arrayJSONX.sort();								
							for(i=0;i<arrayJSONX.length;i++){
								var g = new Object();
								g['balloonText'] = "<b style='font-size:12px'>[[title]]</b><br><span><b>Periodo : </b></span> [[category]]<br><span><b>Número Infracciones: </b> [[value]]";
								g['fillAlphas'] = 0.8;
								g['labelText'] = "[[value]]";
								g['labelPosition'] = "middle";
								g['lineAlpha'] = 0.3;
								g['title'] = arrayJSONX[i].segmento;
								g['type'] = "column";
								g['valueField'] = arrayJSONX[i].segmento;
								resultGraph.push(g);
							}
							//obteniendo presentacion
							var presentacion ='';
							if($local.$selectPresentacion.val()=="APILADO"){
								presentacion='regular';
							}
							else if ($local.$selectPresentacion.val()=="PARALELO"){
								presentacion='none';
							}
							//Dibujando tabla
							//$local.tablaResultadosInfraccion.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
							data = [];
							resultGraph = [];
							arrayJSONX = [];
						},
						error : function(response) {
						},
						complete : function() {
							$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
						}
					});
					
				}
			}else{
				if(segmentacionY=="NINGUNA"){
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorEjeXSinSegementar",
						contentType : "application/json",
						data: criterioBusqueda,
						dataType : "json",
						beforeSend : function(xhr) {
							xhr.setRequestHeader('Content-Type', 'application/json');
							//Borrando tabla antes de hacer la consulta
							$local.tablaResultadosInfraccion.clear().draw();
							$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
						},
						success : function(response) {
							if (response.length === 0) {
								$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
								return;
							}
							console.log("RESPONSE: ");
							console.log(response);
							//Dibujando tabla
							$local.tablaResultadosInfraccion.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroInfracciones','Análisis de Infracciones ' ,'Cantidad de Infracciones','<b>'+ejeX+':</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados] </br> <b>Infracciones Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]'));
						},
						error : function(response) {
						},
						complete : function() {
							$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
						}
					});
				}else{
					
				}
			}

		}if(tipoGrafico == "LINEAL"){
			
		}
	}
		
	});
	
	$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
		"pageLength": 10,
		"initComplete" : function() {
			$local.$tablaResultadosPrestamo.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0],
			"className" : "all dt-center fondo-blanco"
		},{
			"targets" : [ 1, 2, 3],
			"className" : "all dt-right"
		} ],
		"columns" : [ {
			"data" : "ejeX",
			"title" : "Periodo"
		}, {
			"data" : "numeroPrestamos",
			"title" : "Cantidad Prestamos"
		}, {
			"data" : "estadiaTotal",
			"title" : "Tiempo Total Estadia"
		}, {
			"data" : "estadiaPromedio",
			"title" : "Tiempo Medio Estadia"
		}]
	});

	
	$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
		"pageLength": 10,
		"initComplete" : function() {
			$local.$tablaResultadosInfraccion.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0],
			"className" : "all dt-center fondo-blanco"
		},{
			"targets" : [ 1, 2, 3],
			"className" : "all dt-right"
		} ],
		"columns" : [ {
			"data" : "ejeX",
			"title" : "Periodo"
		}, {
			"data" : "numeroInfracciones",
			"title" : "Cantidad Infracciones"
		}, {
			"data" : "numeroSancionados",
			"title" : "Cantidad Sancionados"
		}, {
			"data" : "numeroInfraccionesPromedioPorAlumno",
			"title" : "Infracciones promedio"
		}]
	});
	
	$local.$divTablaResumenPrestamo.removeClass("hidden"); // por defecto
	$local.$divTablaResumenInfraccion.addClass("hidden"); // por defecto
	
	$("#xd").find(".comun").on("click", function(){
		$local.$tipoReporte = $(this).attr("key");
		if($local.$tipoReporte=="P"){
			$local.$divTablaResumenPrestamo.removeClass("hidden");
			$local.$divTablaResumenInfraccion.addClass("hidden");
			//agregar opcion recurso al seleccionar reporte de PRESTAMO
			$('#selectSegmY').append($('<option>', {
			    value: 'RECURSO',
			    text: 'Tipo de Recurso'
			}));
			// quitar opcion Tipo infraccion al seleccionar reporte de PRESTAMO
			$('#selectSegmY').find("option[value='TIPO_INFRACCION']").remove();
			// quitar opcion Tipo infraccion al seleccionar reporte de PRESTAMO
			$('#selectSeries').find("option[value='TIPO_INFRACCION']").remove();
		}
		if($local.$tipoReporte=="I"){
			$local.$divTablaResumenPrestamo.addClass("hidden");
			$local.$divTablaResumenInfraccion.removeClass("hidden"); 
			//agregar opcion Tipo de infraccion al seleccionar reporte de INFRACCION
			$('#selectSegmY').append($('<option>', {
			    value: 'TIPO_INFRACCION',
			    text: 'Tipo de Infraccion'
			}));
			//agregar opcion Tipo de infraccion al seleccionar reporte de INFRACCION
			$('#selectSeries').append($('<option>', {
			    value: 'TIPO_INFRACCION',
			    text: 'Tipo de Infraccion'
			}));
			// quitar opcion Recurso al seleccionar reporte de INFRACCION
			$('#selectSegmY').find("option[value='RECURSO']").remove();  
		}
	});

	$local.$exportar.on('click', function(){
		criterioBusqueda = obtenerCriteriosDeBusqueda();
		if($local.$tipoReporte =="P"){
			window.location.href = $variableUtil.root + "reporteEstadisticaPrestamos?accion=exportar&" + $.param(criterioBusqueda);	
		}
	});

});