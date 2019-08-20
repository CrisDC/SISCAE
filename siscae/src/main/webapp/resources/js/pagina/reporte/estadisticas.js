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
			$selecttipoInfraccion: $('#selecttipoInfraccion'),
			$selecttipoEstado : $('#selecttipoEstado'),
			$fechaPrestamo : $('#fechaPrestamo'),
			$semanaInicio : $('#semanaInicio'),
			$anioInicio : $('#anioInicio'),
			$mesInicio : $('#mesInicio'),
			$semanaFin : $('#semanaFin'),
			$anioFin : $('#anioFin'),
			$mesFin : $('#mesFin'),
			$opAreaEstudio : 'S',
			$opEscuela : 'S',
			
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
	$funcionUtil.crearMultipleSelect2($local.$selecttipoInfraccion,"TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selecttipoEstado,"TODOS");
	
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
		console.log(val);
		console.log($local.$selectEjeX.val());
		console.log($local.$selectSegmY.val());
		switch($local.$selectSegmY.val()){
		case "ESCUELA":{		
			$('#selectEjeX').find("option[value='"+$local.$selectSegmY.val()+"']").remove();
			$local.$opEscuela = 'N';
			if($local.$opAreaEstudio =='N' && ($local.$selectEjeX.val() != "AREA_ESTUDIO")){
				$('#selectEjeX').append('<option  value="AREA_ESTUDIO">Area Estudios</option>');
				$local.$opAreaEstudio = 'S';
			}
			
			break;
		}
		case "AREA_ESTUDIO":{
				$('#selectEjeX').find("option[value='"+$local.$selectSegmY.val()+"']").remove();
			$local.$opAreaEstudio = 'N';
			if($local.$opEscuela == 'N' && ($local.$selectEjeX.val() != "ESCUELA")){
				$('#selectEjeX').append('<option value="ESCUELA">Escuela</option>');
				$local.$opEscuela = 'S';
			}
			break;
		}
		default :{
			if($local.$opAreaEstudio == 'N' && ($local.$selectEjeX.val() != "AREA_ESTUDIO")){
				$('#selectEjeX').append('<option  value="AREA_ESTUDIO">Area Estudio</option>');
				$local.$opAreaEstudio = 'S';
			}
			if($local.$opEscuela == 'N' && ($local.$selectEjeX.val() != "ESCUELA")){
				$('#selectEjeX').append('<option value="ESCUELA">Escuela</option>');
				$local.$opEscuela = 'S';
			}
		}
	}
        
	});

	//Evento que se dispara cuando el combo Eje X cambia
	$local.$selectEjeX.on("change", function(){
		let data;
		let title;
		console.log("entro");
		switch($local.$selectEjeX.val()){
			case "PERIODO":{
				console.log("p");
				data = "ejeX",
				title = "Periodo"
				console.log("funciona mal ");
				if($local.$opAreaEstudio == 'N' && ($local.$selectSegmY.val() != "AREA_ESTUDIO")){
					$('#selectSegmY').append('<option  value="AREA_ESTUDIO">Area Estudios</option>');
					$local.$opAreaEstudio = 'S';
				}
				if($local.$opEscuela == 'N' && ($local.$selectSegmY.val() != "ESCUELA")){
					$('#selectSegmY').append('<option value="ESCUELA">Escuela</option>');
					$local.$opEscuela = 'S';
				}
				break;
			}
			case "ESCUELA":{
				data = "ejeX";
				title = "Escuela",
				console.log("funciona");
				
				$('#selectSegmY').find("option[value='"+$local.$selectEjeX.val()+"']").remove();
				$local.$opEscuela = 'N';
				if($local.$opAreaEstudio =='N' && ($local.$selectSegmY.val() != "AREA_ESTUDIO")){
					$('#selectSegmY').append('<option  value="AREA_ESTUDIO">Area Estudios</option>');
					$local.$opAreaEstudio = 'S';
				}
				
				break;
			}
			case "AREA_ESTUDIO":{
				console.log("ae");
				data = "ejeX",
				title = "Area Estudio"
					$('#selectSegmY').find("option[value='"+$local.$selectEjeX.val()+"']").remove();
				$local.$opAreaEstudio = 'N';
				if($local.$opEscuela == 'N' && ($local.$selectSegmY.val() != "ESCUELA")){
					$('#selectSegmY').append('<option value="ESCUELA">Escuela</option>');
					$local.$opEscuela = 'S';
				}
				break;
			}
		}
		
		cambiarEjeXTabla(data, title);
		
	});
	
	
	
	$local.$selectSeries.on("change", function(){
		let data;
		let title;
		console.log("entro");
		console.log($local.$selectSeries.val());
		switch($local.$selectSeries.val()){
			case "SOLICITANTE":{
				data = "segmento",
				title = "Solicitante"
				break;
			}
			case "ESCUELA":{
				data = "segmento",
				title = "Escuela"
				break;
			}
			case "AREA_ESTUDIO":{
				data = "segmento",
				title = "Area Estudio"
				break;
			}
			case "TIPO_INFRACCION":{
				data ="segmento",
				title="Tipo de Infraccion"
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
		$local.tablaResultadosInfraccion. destroy();

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
	
	function tabla(){
		$local.tablaResultadosPrestamo.destroy();
		$local.tablaResultadosInfraccion. destroy();

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
				"data" : "CABINA",
				"title" : "Cabina"
			}, {
				"data" : "CUBICULO",
				"title" : "Cubiculo"
			}, {
				"data" : "MESA",
				"title" : "Mesa"
			}]
		});
	
		
	/*	$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable({
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
		});*/
	}
	
	$local.$buscar.on('click', function() {
		if (!$formEstadisticas.valid()) {
			return;
		}
		
//		if (!$funcionUtil.validarInputsPeriodo($local.$semanaInicio,$local.$semanaFin,$local.$mesInicio,$local.$mesFin,$local.$anioInicio,$local.$anioFin, $local.$selectPeriodo.val())) {
//			$funcionUtil.notificarException("Rango de periodo incorrecto", "fa-exclamation-circle", "Información", "info");
//			return;
//		}
		var criterioBusqueda = obtenerCriteriosDeBusqueda();
		//Obteniendo parametros de la grafica
		let tipoGrafico = $local.$selectTipoGrafico.val();
		let segmentacionY = $local.$selectSegmY.val();
		let ejeX = $local.$selectEjeX.val();
		let serie= $local.$selectSeries.val();
		var criterio = "&"+reemplazarCadena("%5B%5D","",$.param(criterioBusqueda));
		if($local.$tipoReporte =="P"){
			if(tipoGrafico == "PIE"){
				//arreglado
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorCriterio"+criterio,
						contentType : "application/json",
						//data: criterioBusqueda,
						//dataType : "json",
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
						console.log("caso1,r");
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSinSegmentar"+criterio,
							contentType : "application/json",
							//data: criterioBusqueda,
							//dataType : "json",
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
						console.log("caso2");
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSegmentado"+criterio,
							contentType : "application/json",
							//data: criterioBusqueda,
							//dataType : "json",
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
								var arr;
								var cant;
								switch($local.$selectSegmY.val()){
								case "ESCUELA":{		
									arr = $local.$selectEscuela.val();
									console.log(arr);
									$.ajax({
										type : "GET",
										url : $variableUtil.root + "escuela?accion=buscarTodos",
										//data : JSON.stringify(alumno),
										beforeSend : function(xhr) {
											//$local.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
											xhr.setRequestHeader('Content-Type', 'application/json');
											xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
										},
										
										success : function(tr) {
											console.log(tr);

											//Generando Leyenda
											var resultGraph = [];
											if(arr == "" ){
											    console.log("funciono");
												var arrayJSONX = response[0].detalle;
												arr = arrayJSONX;
												
											}else{
												//eliminarVacios(data);
												console.log($local.$selectEscuela.val());
												var datos=[];
												var j =0;
												
												for(i =0;i<tr.length;i++){
													if(j<arr.length){									
														if(tr[i].idEscuela == arr[j]){
															var e = new Object();
															e['id']=tr[i].idEscuela;
															e['nombre']=tr[i].nombre;
															datos.push(e);
															j++;	
														}
															
													}
													
												}
												console.log(datos);
												var arrayJSONX = [];
												//var n = response[0].detalle;
												console.log(response.length);
												var datanuevo = [];
												for (l=0;l<response.length;l++){
													var n = response[l].detalle;
													var dn = new Object();
													dn['ejeX']=response[l].ejeX;
													var j =0;
													for(i=0;i<n.length;i++){
														   if(j<datos.length){
															   if( n[i].segmento == datos[j].nombre ){
																	var e = new Object();
																	e['segmento'] = n[i].segmento;
																	e['numeroPrestamos'] = n[i].numeroPrestamos;
																	e['ejeX'] = n[i].ejeX;
																	arrayJSONX.push(e);
																	dn[n[i].segmento] = n[i].numeroPrestamos;
																	j++;
																}   
														   }
													}
													datanuevo.push(dn);
												}
											}	
												
											console.log(datanuevo);

											arrayJSONX.sort();								
											for(i=0;i<arr.length;i++){
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
											//console.log(data);
											console.log(arrayJSONX);
											eliminarVacios(data);
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												var d = datanuevo;
											}
											var c = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['title'] = "Periodo";
													ej['data']  = Object.keys(d[0])[i];
												}else{
													ej['title'] = Object.keys(d[0])[i];;
													ej['data']  = Object.keys(d[0])[i];
												}
												c.push(ej);
											};
											
											//console.log(c); eval('[{"columns":' +c+ ',"data":' +data+0 '}]')
											var dataObject = [];
											var ayuda = new Object();
											ayuda['columns'] = c;
											ayuda['data'] = d;
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											$local.tablaResultadosPrestamo.destroy();
											$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
				
											//Dibujando tabla
			                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
											//Dibujando grafico
											var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Préstamos',presentacion,'Prestamos por criterio'));
											data = [];
											resultGraph = [];
											arrayJSONX = [];
											dataObject = [];
											c =[];
										}
									});	
									break;
								}
								case "AREA_ESTUDIO":{
									arr = $local.$selectAreaEstudio.val();
									console.log(arr);
									$.ajax({
										type : "GET",
										url : $variableUtil.root + "areaEstudio?accion=buscarTodos",
										//data : JSON.stringify(alumno),
										beforeSend : function(xhr) {
											//$local.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
											xhr.setRequestHeader('Content-Type', 'application/json');
											xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
										},
										
										success : function(tr) {
											console.log(tr);

											//Generando Leyenda
											var resultGraph = [];
											if(arr == "" ){
											    console.log("funciono");
												var arrayJSONX = response[0].detalle;
												arr = arrayJSONX;
												
											}else{
												var datos=[];
												var j =0;
												
												for(i =0;i<tr.length;i++){
													if(j<arr.length){									
														if(tr[i].idAreaEstudio == arr[j]){
															var e = new Object();
															e['id']=tr[i].idEscuela;
															e['nombre']=tr[i].nombre;
															datos.push(e);
															j++;	
														}
															
													}
													
												}
												console.log(datos);
												var arrayJSONX = [];
												//var n = response[0].detalle;
												console.log(response.length);
												var datanuevo = [];
												for (l=0;l<response.length;l++){
													var n = response[l].detalle;
													var dn = new Object();
													dn['ejeX']=response[l].ejeX;
													var j =0;
													for(i=0;i<n.length;i++){
														   if(j<datos.length){
															   if( n[i].segmento == datos[j].nombre ){
																	var e = new Object();
																	e['segmento'] = n[i].segmento;
																	e['numeroPrestamos'] = n[i].numeroPrestamos;
																	e['ejeX'] = n[i].ejeX;
																	arrayJSONX.push(e);
																	dn[n[i].segmento] = n[i].numeroPrestamos;
																	j++;
																}   
														   }
													}
													datanuevo.push(dn);
												}
											}	
												
											console.log(datanuevo);

											arrayJSONX.sort();								
											for(i=0;i<arr.length;i++){
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
											//console.log(data);
											console.log(arrayJSONX);
											eliminarVacios(data);
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												var d = datanuevo;
											}
											var c = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['title'] = "Periodo";
													ej['data']  = Object.keys(d[0])[i];
												}else{
													ej['title'] = Object.keys(d[0])[i];;
													ej['data']  = Object.keys(d[0])[i];
												}
												c.push(ej);
											};
											
											//console.log(c); eval('[{"columns":' +c+ ',"data":' +data+0 '}]')
											var dataObject = [];
											var ayuda = new Object();
											ayuda['columns'] = c;
											ayuda['data'] = d;
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											$local.tablaResultadosPrestamo.destroy();
											$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
				
											//Dibujando tabla
			                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
											//Dibujando grafico
											var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Préstamos',presentacion,'Prestamos por criterio'));
											data = [];
											resultGraph = [];
											arrayJSONX = [];
											dataObject = [];
											c =[];
										}
									});	
									break;
								}
								case "TIPO_SOLICITANTE":{
									arr = $local.$selectSolicitante.val();
									console.log(arr);
									break;
								}
								case "RECURSO":{
									arr = "";
									console.log(arr);
									break;
								}
								case "NINGUNA" :{
									arr = "";
									break;
								}
								}

								
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
						console.log("caso3,quitar lo q tiene cero?");
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorEjeXSinSegmentar"+criterio,
							contentType : "application/json",
							//data: criterioBusqueda,
							//dataType : "json",
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
						
						console.log("caso4,revisar");
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorEjeXSegmentado"+criterio,
							contentType : "application/json",
							//data: criterioBusqueda,
							//dataType : "json",
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
				console.log(criterioBusqueda);
				console.log("caso5");
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSinSegmentar"+criterio,
					contentType : "application/json",
					//data: criterioBusqueda,
					//dataType : "json",
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
						//Dibujando tabla
						$local.tablaResultadosPrestamo.rows.add(response).draw();
						//Dibujando grafico
						var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoLineal(response,'ejeX','numeroPrestamos',"<b>Periodo:</b> [[category]] </br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] </br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
						//$window.disablescroll();
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
				//arreglado,volver a revisar
				console.log("caso6,r");
				$.ajax({
					type : "GET",
					url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorCriterio"+criterio,
					contentType : "application/json",
					//data: criterioBusqueda,
					//dataType : "json",
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
				console.log("caso7");
				if(segmentacionY=="NINGUNA"){
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorPeriodoSinSegmentar"+criterio,
						contentType : "application/json",
						//data: criterioBusqueda,
						//dataType : "json",
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
					console.log("caso8");
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorPeriodoSegmentado"+criterio,
						contentType : "application/json",
						//data: criterioBusqueda,
						//dataType : "json",
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
					console.log("caso9,r");
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorEjeXSinSegmentar"+criterio,
						contentType : "application/json",
						//data: criterioBusqueda,
						//dataType : "json",
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
							//Dibujando tabla
							$local.tablaResultadosInfraccion.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroInfracciones','Análisis de Infracciones ' ,'Cantidad de Infracciones','<b>'+ejeX+':</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados]] </br> <b>Infracciones Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]'));
						},
						error : function(response) {
						},
						complete : function() {
							$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
						}
					});
				}else{
					console.log("caso10,revisar");
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorEjeXSegmentado"+criterio,
						contentType : "application/json",
						//data: criterioBusqueda,
						//dataType : "json",
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
			}

		}if(tipoGrafico == "LINEAL"){
			console.log("caso11,r");
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "reporteEstadisticaInfracciones?accion=buscarPorPeriodoSinSegmentar"+criterio,
				contentType : "application/json",
				//data: criterioBusqueda,
				//dataType : "json",
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
					//Dibujando tabla
					$local.tablaResultadosInfraccion.rows.add(response).draw();
					//Dibujando grafico
					var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoLineal(response,'ejeX','numeroInfracciones',"<b>Periodo:</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados]] </br> <b>Infracc. Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]"));
				},
				error : function(response) {
				},
				complete : function() {
					$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
			
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
			$('#tipoInfraccion').addClass("hidden");
			$('#tipoEstado').addClass("hidden");
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
			$('#tipoInfraccion').removeClass("hidden");
			$('#tipoEstado').removeClass("hidden");
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
		if (!$formEstadisticas.valid()) {
			return;
		}
		criterioBusqueda = obtenerCriteriosDeBusqueda();
		console.log(criterioBusqueda);
			var criterio = "&"+reemplazarCadena("%5B%5D","",$.param(criterioBusqueda));
			console.log(criterio);
			if($local.$tipoReporte =="P"){
			   			window.location.href = $variableUtil.root + "reporteEstadisticaPrestamos?accion=exportar" + criterio;	
			}
		
	});
	
	function reemplazarCadena(cadenaVieja, cadenaNueva, cadenaCompleta){
		//Reemplaza cadenaVieja por cadenaNueva en cadenaCompleta
		
		for(var i = 0;i< cadenaCompleta.length; i++){
			if(cadenaCompleta.substring(i, i + cadenaVieja.length) == cadenaVieja){
				cadenaCompleta= cadenaCompleta.substring(0,i) + cadenaNueva +cadenaCompleta.substring(i + cadenaVieja.length, cadenaCompleta.length);
			}
		}
		return cadenaCompleta;
	}
	
	function eliminarVacios(jsonx){
		 console.log(jsonx);
	    for (var clave in jsonx) {
	      if(typeof jsonx[clave] == 'number'){
	        if(jsonx[clave] == 0){
	          delete jsonx[clave]
	        }
	      } else if (typeof jsonx[clave] == 'object') {
	        eliminarVacios(jsonx[clave])
	      }
	    }
	  }

});