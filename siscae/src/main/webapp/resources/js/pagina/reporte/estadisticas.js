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
			$selectMFacultad :$('#selectMFacultad'),
			$selectMEscuela :$('#selectMEscuela'),
			$selectMAreaEstudio :$('#selectMAreaEstudio'),
			$fechaPrestamo : $('#fechaPrestamo'),
			$semanaInicio : $('#semanaInicio'),
			$anioInicio : $('#anioInicio'),
			$mesInicio : $('#mesInicio'),
			$semanaFin : $('#semanaFin'),
			$anioFin : $('#anioFin'),
			$mesFin : $('#mesFin'),
			$opAreaEstudio : 'S',
			$opEscuela : 'S',
			$cEscuela :0,
			
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
			$divTablaResumenMasFrecuentes : $('#divTablaResumenMasFrecuentes'),
			$divTablaResumenMasFrecuentesFacultad : $('#divTablaResumenMasFrecuentesFacultad'),
			$divTablaResumenMasFrecuentesEscuela : $('#divTablaResumenMasFrecuentesEscuela'),
			$divTablaResumenPrestamoSegmentado : $('#divTablaResumenPrestamoSegmentado'),
			
			//Botones de la pagina
			$buscar : $('#buscar'),
			$mfbuscar :$('#mfbuscar'),
			$exportar : $('#exportar'),
			$limpiar :$('#limpiar'),
			$limpiarmf : $('#limpiarmf'),
			//Tipo Reporte
			$tipoReporte:'P',
			$title:'',
			
			//DataTable
			$tablaResultadosPrestamo : $("#tblReporteResumenPrestamo"),
			tablaResultadosPrestamo : "",
			$tablaResultadosInfraccion : $("#tblReporteResumenInfraccion"),
			tablaResultadosInfraccion : "",
			$tablaResultadosMasFrecuentes : $('#tblReporteResumenMasFrecuentes'),
			tablaResultadosMasFrecuentes : "",
			$tablaResultadosMasFrecuentesFacultad : $('#tblReporteResumenMasFrecuentesFacultad'),
			tablaResultadosMasFrecuentesFacultad : "",
			$tablaResultadosMasFrecuentesEscuela : $('#tblReporteResumenMasFrecuentesEscuela'),
			tablaResultadosMasFrecuentesEscuela : "",
				
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
	$funcionUtil.crearSelect2($local.$selectMFacultad);
	$funcionUtil.crearSelect2($local.$selectMAreaEstudio);
	$funcionUtil.crearMultipleSelect2($local.$selectAreaEstudio, "TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selectEscuela, "TODOS");	
	$funcionUtil.crearMultipleSelect2($local.$selectRecurso, "TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selectSolicitante, "TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selecttipoInfraccion,"TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selecttipoEstado,"TODOS");
	$funcionUtil.crearMultipleSelect2($local.$selectMEscuela, "TODOS");	
	
	//Formulario
	$formEstadisticas = $("#formEstadisticas");
	$formMasFrecuentes = $("#formMasFrecuentes");
	
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
		switch($local.$selectEjeX.val()){
			case "PERIODO":{
				data = "ejeX",
				title = "Periodo"
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
		
		$local.$title = title;
		//cambiarEjeXTabla(data, title);
		
	});
	
	
	
	$local.$selectSeries.on("change", function(){
		let data;
		let title;
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
		$local.$title = title;
		//cambiarEjeXTabla(data, title);
		
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
	
	$local.$selectMFacultad.on("change", function(){
		console.log($local.$selectMFacultad.val());
		if($('#selectMFacultad').val() != -1){
			if($local.$cEscuela != 0){
				$('#selectMEscuela').html("");
			}
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "escuela?accion=buscarTodos",
				contentType : "application/json",
				//data: criterioBusqueda,
				//dataType : "json",
				beforeSend : function(xhr) {
					xhr.setRequestHeader('Content-Type', 'application/json');
					//Borrando tabla antes de hacer la consulta
					//$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(response) {
					if (response.length === 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					$('#mfescuela').removeClass('hidden');
					var escuelas =[];
					for(i=0;i<response.length;i++){
						if(response[i].idFacultad == $local.$selectMFacultad.val()){
							var e = new Object();
							e['id']=response[i].idEscuela;
							e['nombre']=response[i].nombre;
							escuelas.push(e);
						}
					}
					for(i=0;i<escuelas.length;i++){
						$('#selectMEscuela').append($('<option>', {
						    value: escuelas[i].id,
						    text: escuelas[i].nombre
						}));
					}
					
					$local.$cEscuela = escuelas.length;
					
				},
				error : function(response) {
				},
				complete : function() {
					$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});	
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
	$local.$mfbuscar.on('click',function(){
		
		if(!$formMasFrecuentes.valid()){
			return;
		}
		var criterioBusqueda = $formMasFrecuentes.serializeJSON();
		console.log(criterioBusqueda);
		
		var criterio = "&"+reemplazarCadena("%5B%5D","",$.param(criterioBusqueda));
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarRankingAlumno"+criterio,
			contentType : "application/json",
			//data: criterioBusqueda,
			//dataType : "json",
			beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				//Borrando tabla antes de hacer la consulta
				$local.tablaResultadosMasFrecuentes.clear().draw();
				$local.$mfbuscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length === 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				//Dibujando tabla
				console.log(response);
				$local.tablaResultadosMasFrecuentes.rows.add(response).draw();
				var resultGraph = [];
				for(i=0;i<response.length;i++){
					var g = new Object();
					g['balloonText'] = "<b style='font-size:12px'>[[title]]</b><br><span><b>Periodo : </b></span> [[category]]<br><span><b>Número Préstamos: </b> [[value]]";
					g['fillAlphas'] = 0.8;
					g['labelText'] = "[[value]]";
					g['labelPosition'] = "middle";
					g['lineAlpha'] = 0.3;
					g['title'] = response[i].codigo;
					g['type'] = "column";
					g['valueField'] = response[i].codigo;
					resultGraph.push(g);
				}
				//Dibujando grafico
				var datan =[];
				for(i=0;i<response.length;i++){
					var e = new Object();
					e[response[i].codigo]= response[i].cantidad;
					e['codigo']=response[i].codigo;
					datan.push(e);		
				}
				console.log(datan);
				$('#resultadoGraficomf').removeClass("hidden");
				var chart = AmCharts.makeChart('chartdivmf',$funcionGraficoUtil.crearGraficoBarrasSegmentado(datan,resultGraph,'codigo','Cantidad de Préstamos','regular','Prestamos por criterio'));
				//var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroPrestamos','Análisis de Préstamos','Número de prestamos', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) <br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] <br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
				datan = [];
				resultGraph = [];
			},
			error : function(response) {
			},
			complete : function() {
				$local.$mfbuscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarRankingFacultad"+criterio,
			contentType : "application/json",
			//data: criterioBusqueda,
			//dataType : "json",
			beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				//Borrando tabla antes de hacer la consulta
				$local.tablaResultadosMasFrecuentesFacultad.clear().draw();
				$local.$mfbuscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length === 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				//Dibujando tabla
				console.log(response);
				var c;
				if(response.length>10){
					c=10;
				}else{
					c=response.length
				}
				$local.tablaResultadosMasFrecuentesFacultad.rows.add(response).draw();
				var resultGraph = [];
				for(i=0;i<c;i++){
					var g = new Object();
					g['balloonText'] = "<b style='font-size:12px'>[[title]]</b><br><span><b>Facultad : </b></span> [[category]]<br><span><b>Número Préstamos: </b> [[value]]";
					g['fillAlphas'] = 0.8;
					g['labelText'] = "[[value]]";
					g['labelPosition'] = "middle";
					g['lineAlpha'] = 0.3;
					g['title'] = response[i].facultad;
					g['type'] = "column";
					g['valueField'] = response[i].facultad;
					resultGraph.push(g);
				}
				//Dibujando grafico
				var datanf =[];
				for(i=0;i<c;i++){
					var e = new Object();
					e[response[i].facultad]= response[i].cantidad;
					e['facultad']=response[i].facultad;
					datanf.push(e);		
				}
				console.log(datanf);
				//Dibujando grafico
				var chartf = AmCharts.makeChart('chartdivf',$funcionGraficoUtil.crearGraficoBarrasSegmentado(datanf,resultGraph,'facultad','Cantidad de Préstamos','regular','Prestamos por criterio'));
				$('#resultadoGraficof').removeClass("hidden");
				datanf = [];
				resultGraph = [];
			},
			error : function(response) {
			},
			complete : function() {
				$local.$mfbuscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarRankingEscuela"+criterio,
			contentType : "application/json",
			//data: criterioBusqueda,
			//dataType : "json",
			beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				//Borrando tabla antes de hacer la consulta
				$local.tablaResultadosMasFrecuentesEscuela.clear().draw();
				$local.$mfbuscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
			},
			success : function(response) {
				if (response.length === 0) {
					$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
					return;
				}
				//Dibujando tabla
				console.log(response);
				$local.tablaResultadosMasFrecuentesEscuela.rows.add(response).draw();
				var resultGraph = [];
				var c;
				if(response.length>10){
					c=10;
				}else{
					c=response.length
				}
				for(i=0;i<c;i++){
					var g = new Object();
					g['balloonText'] = "<b style='font-size:12px'>[[title]]</b><br><span><b>Escuela : </b></span> [[category]]<br><span><b>Número Préstamos: </b> [[value]]";
					g['fillAlphas'] = 0.8;
					g['labelText'] = "[[value]]";
					g['labelPosition'] = "middle";
					g['lineAlpha'] = 0.3;
					g['title'] = response[i].escuela;
					g['type'] = "column";
					g['valueField'] = response[i].escuela;
					resultGraph.push(g);
				}
				//Dibujando grafico
				var datane =[];
				for(i=0;i<c;i++){
					var e = new Object();
					e[response[i].escuela]= response[i].cantidad;
					e['escuela']=response[i].escuela;
					datane.push(e);		
				}
				console.log(datane);
				//Dibujando grafico
				
				
				var charte = AmCharts.makeChart('chartdive',$funcionGraficoUtil.crearGraficoBarrasSegmentado(datane,resultGraph,'escuela','Cantidad de Préstamos','regular','Prestamos por criterio'));
				$('#resultadoGraficoe').removeClass("hidden");
				
				//Dibujando grafico
				datane = [];
				resultGraph = []; 
				//var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroPrestamos','Análisis de Préstamos','Número de prestamos', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) <br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] <br> <b>Tiempo Prom: </b> [[estadiaPromedio]]"));
			},
			error : function(response) {
			},
			complete : function() {
				$local.$mfbuscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
		
		
	});
	
	$local.$buscar.on('click', function() {
		if (!$formEstadisticas.valid()) {
			return;
		}
		
//		if (!$funcionUtil.validarInputsPeriodo($local.$semanaInicio,$local.$semanaFin,$local.$mesInicio,$local.$mesFin,$local.$anioInicio,$local.$anioFin, $local.$selectPeriodo.val())) {
//			$funcionUtil.notificarException("Rango de periodo incorrecto", "fa-exclamation-circle", "Información", "info");
//			return;
//		}
		var criterioBusqueda = obtenerCriteriosDeBusqueda();
		console.log(criterioBusqueda);
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
							var data =[];
							for(i=0;i<response.length;i++){
								if(response[i].segmento != null){
								var e = new Object();
								e['segmento']=response[i].segmento;
								e['numeroPrestamos']=response[i].numeroPrestamos;
								e['estadiaTotal']=response[i].estadiaTotal;
								e['estadiaPromedio']=response[i].estadiaPromedio;
								data.push(e);}
							}
							console.log(data);
							if($local.tablaResultadosPrestamo) { 
								$local.tablaResultadosPrestamo.destroy(); 
								$local.$tablaResultadosPrestamo.empty(); 
							}
							var cd = [];
							for(i=0;i<Object.keys(data[0]).length;i++){
								var ej = new Object();
								if(i==0){
									ej['targets'] = [i];
									ej['className']  = "all dt-center fondo-blanco";
								}else{
									ej['targets'] = [i]
									ej['className']  = "all dt-right"
								}
								cd.push(ej);
							};
							var c = [];
							for(i=0;i<Object.keys(data[0]).length;i++){
								var ej = new Object();
								if(i==0){
									ej['title'] = $local.$title;
									ej['data']  = Object.keys(data[0])[i];
								}else{
									ej['title'] = Object.keys(data[0])[i];;
									ej['data']  = Object.keys(data[0])[i];
								}
								c.push(ej);
							};
							var dataObject = [];
							var ayuda = new Object();
							ayuda['initComplete'] = function(){
								$("table").wrap("<div class='table-responsive'></div>");
							};
							ayuda['columnDefs']=cd;
							ayuda['columns'] = c;
							ayuda['data'] = data;
							ayuda['dom'] = 'Blfrtip';
							ayuda['buttons'] = {
									"dom":{
										"button":{
											"tag":"button",
											"className":"btn btn-success m-l-3"
										}
									},
									"buttons": [{
										extend: 'excelHtml5',
										text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
							            title:'Historial de Infracciones',
							            autoFilter: true,
									},{
										extend: 'pdfHtml5',
										text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
							            title:'Historial de Infracciones',
							            orientation : 'portrait'
									}]
								};
							dataObject.push(ayuda);
							$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
							//$local.tablaResultadosPrestamo.rows.add(response).draw();
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
								var data =[];
								for(i=0;i<response.length;i++){
									var e = new Object();
									e['ejeX']=response[i].ejeX;
									e['numeroPrestamos']=response[i].numeroPrestamos;
									e['estadiaTotal']=response[i].estadiaTotal;
									e['estadiaPromedio']=response[i].estadiaPromedio;
									data.push(e);
								}
								console.log(data);
								if($local.tablaResultadosPrestamo) { 
									$local.tablaResultadosPrestamo.destroy(); 
									$local.$tablaResultadosPrestamo.empty(); 
								}
								var cd = [];
								for(i=0;i<Object.keys(data[0]).length;i++){
									var ej = new Object();
									if(i==0){
										ej['targets'] = [i];
										ej['className']  = "all dt-center fondo-blanco";
									}else{
										ej['targets'] = [i]
										ej['className']  = "all dt-right"
									}
									cd.push(ej);
								};
								var c = [];
								for(i=0;i<Object.keys(data[0]).length;i++){
									var ej = new Object();
									if(i==0){
										ej['title'] = $local.$title;
										ej['data']  = Object.keys(data[0])[i];
									}else{
										ej['title'] = Object.keys(data[0])[i];;
										ej['data']  = Object.keys(data[0])[i];
									}
									c.push(ej);
								};
								var dataObject = [];
								var ayuda = new Object();
								ayuda['initComplete'] = function(){
									$("table").wrap("<div class='table-responsive'></div>");
								};
								ayuda['columnDefs']=cd;
								ayuda['columns'] = c;
								ayuda['data'] = response;
								ayuda['dom'] = 'Blfrtip';
								ayuda['buttons'] = {
										"dom":{
											"button":{
												"tag":"button",
												"className":"btn btn-success m-l-3"
											}
										},
										"buttons": [{
											extend: 'excelHtml5',
											text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
								            title:'Historial de Infracciones',
								            autoFilter: true,
										},{
											extend: 'pdfHtml5',
											text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
								            title:'Historial de Infracciones',
								            orientation : 'portrait'
										}]
									};
								dataObject.push(ayuda);
								$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
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
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
												var d = data;
											}else{
												eliminarVacios(data);
												var d = datanuevo;
											}
											var cd = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['targets'] = [i];
													ej['className']  = "all dt-center fondo-blanco";
												}else{
													ej['targets'] = [i]
													ej['className']  = "all dt-right"
												}
												cd.push(ej);
											};
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
											
											//ayuda['pageLength'] = 10;
											ayuda['initComplete'] = function(){
												$("table").wrap("<div class='table-responsive'></div>");
											};
											//ayuda['scrollX']= true;
											ayuda['columnDefs'] = cd;
											ayuda['columns'] = c;
											ayuda['data'] = d;
											ayuda['dom'] = 'Blfrtip';
											ayuda['buttons'] = {
													"dom":{
														"button":{
															"tag":"button",
															"className":"btn btn-success m-l-3"
														}
													},
													"buttons": [{
														extend: 'excelHtml5',
														text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
											            title:'Historial de Infracciones',
											            autoFilter: true,
													},{
														extend: 'pdfHtml5',
														text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
											            title:'Historial de Infracciones',
											            orientation : 'portrait'
													}]
												};
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);

											if($local.tablaResultadosPrestamo) { 
												$local.tablaResultadosPrestamo.destroy(); 
												$local.$tablaResultadosPrestamo.empty(); 
											}
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
											
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												eliminarVacios(data);
												var d = datanuevo;
											}
											var cd = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['targets'] = [i];
													ej['className']  = "all dt-center fondo-blanco";
												}else{
													ej['targets'] = [i]
													ej['className']  = "all dt-right"
												}
												cd.push(ej);
											};
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
											ayuda['initComplete'] = function(){
												$("table").wrap("<div class='table-responsive'></div>");
											};
											ayuda['columnDefs']=cd;
											ayuda['columns'] = c;
											ayuda['data'] = d;
											ayuda['dom'] = 'Blfrtip';
											ayuda['buttons'] = {
													"dom":{
														"button":{
															"tag":"button",
															"className":"btn btn-success m-l-3"
														}
													},
													"buttons": [{
														extend: 'excelHtml5',
														text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
											            title:'Historial de Infracciones',
											            autoFilter: true,
													},{
														extend: 'pdfHtml5',
														text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
											            title:'Historial de Infracciones',
											            orientation : 'portrait'
													}]
												};
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											if($local.tablaResultadosPrestamo) { 
												$local.tablaResultadosPrestamo.destroy(); 
												$local.$tablaResultadosPrestamo.empty(); 
											}
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
									//Generando Leyenda
									var resultGraph = [];
									if(arr==""){
										var arrayJSONX = response[0].detalle;
										arr = arrayJSONX;
									}else{
										
										var datos = [];
										var j =0;
										console.log(data[0][arr[0]]);
										
										var arrayJSONX = [];
										var datanuevo = [];
										for(l=0;l<response.length;l++){
											var n = response[l].detalle;
											var dn = new Object();
											dn['ejeX'] = response[l].ejeX;
											var j =0;
											for(i=0;i<n.length;i++){
												if(j<arr.length){
													if(n[i].segmento == arr[j]){
														var e = new Object();
														e['segmento']= n[i].segmento;
														e['numeroInfracciones'] = n[i].numeroPrestamos;
														e['ejeX']= n[i].ejeX;
														arrayJSONX.push(e);
														dn[n[i].segmento]= n[i].numeroPrestamos;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Historial de Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Historial de Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosPrestamo) { 
											$local.tablaResultadosPrestamo.destroy(); 
											$local.$tablaResultadosPrestamo.empty(); 
										}
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

									break;
								}
								case "RECURSO":{
									arr = $local.$selectRecurso.val();
									console.log(arr);
									$.ajax({
										type : "GET",
										url : $variableUtil.root + "tipoRecurso?accion=buscarTodos",
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
														if(tr[i].idTipoRecurso == arr[j]){
															var e = new Object();
															e['id']=tr[i].idTipoRecurso;
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
											
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												eliminarVacios(data);
												var d = datanuevo;
											}
											var cd = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['targets'] = [i];
													ej['className']  = "all dt-center fondo-blanco";
												}else{
													ej['targets'] = [i]
													ej['className']  = "all dt-right"
												}
												cd.push(ej);
											};
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
											ayuda['initComplete'] = function(){
												$("table").wrap("<div class='table-responsive'></div>");
											};
											ayuda['columDefs']=cd;
											ayuda['columns'] = c;
											ayuda['data'] = d;
											ayuda['dom'] = 'Blfrtip';
											ayuda['buttons'] = {
													"dom":{
														"button":{
															"tag":"button",
															"className":"btn btn-success m-l-3"
														}
													},
													"buttons": [{
														extend: 'excelHtml5',
														text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
											            title:'Historial de Infracciones',
											            autoFilter: true,
													},{
														extend: 'pdfHtml5',
														text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
											            title:'Historial de Infracciones',
											            orientation : 'portrait'
													}]
												};
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											if($local.tablaResultadosPrestamo) { 
												$local.tablaResultadosPrestamo.destroy(); 
												$local.$tablaResultadosPrestamo.empty(); 
											}
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
								if($local.tablaResultadosPrestamo) { 
									$local.tablaResultadosPrestamo.destroy(); 
									$local.$tablaResultadosPrestamo.empty(); 
								}
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
									}],
									"dom":'Blfrtip',
									"buttons" : {
											"dom":{
												"button":{
													"tag":"button",
													"className":"btn btn-success m-l-3"
												}
											},
											"buttons": [{
												extend: 'excelHtml5',
												text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
									            title:'Prestamos',
									            autoFilter: true,
											},{
												extend: 'pdfHtml5',
												text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
									            title:'Prestamos',
									            orientation : 'portrait'
											}]
										}
								});
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
											
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												eliminarVacios(data);
												var d = datanuevo;
											}
											var cd = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['targets'] = [i];
													ej['className']  = "all dt-center fondo-blanco";
												}else{
													ej['targets'] = [i]
													ej['className']  = "all dt-right"
												}
												cd.push(ej);
											};
											var c = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['title'] = $local.$title;
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
											ayuda['initComplete'] = function(){
												$("table").wrap("<div class='table-responsive'></div>");
											};
											ayuda['columnDefs']=cd;
											ayuda['columns'] = c;
											ayuda['data'] = d;
											ayuda['dom'] = 'Blfrtip';
											ayuda['buttons'] = {
													"dom":{
														"button":{
															"tag":"button",
															"className":"btn btn-success m-l-3"
														}
													},
													"buttons": [{
														extend: 'excelHtml5',
														text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
											            title:'Historial de Infracciones',
											            autoFilter: true,
													},{
														extend: 'pdfHtml5',
														text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
											            title:'Historial de Infracciones',
											            orientation : 'portrait'
													}]
												};
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											if($local.tablaResultadosPrestamo) { 
												$local.tablaResultadosPrestamo.destroy(); 
												$local.$tablaResultadosPrestamo.empty(); 
											}
											$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
				
											//Dibujando tabla
			                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
											//Dibujando grafico
											var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Prestamos',presentacion,'Prestamos por criterio'));
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
															e['id']=tr[i].idAreaEstudio;
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
											
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												eliminarVacios(data);
												var d = datanuevo;
											}
											var cd = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['targets'] = [i];
													ej['className']  = "all dt-center fondo-blanco";
												}else{
													ej['targets'] = [i]
													ej['className']  = "all dt-right"
												}
												cd.push(ej);
											};
											var c = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['title'] = $local.$title;
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
											ayuda['initComplete'] = function(){
												$("table").wrap("<div class='table-responsive'></div>");
											};
											ayuda['columnDefs']=cd;
											ayuda['columns'] = c;
											ayuda['data'] = d;
											ayuda['dom'] = 'Blfrtip';
											ayuda['buttons'] = {
													"dom":{
														"button":{
															"tag":"button",
															"className":"btn btn-success m-l-3"
														}
													},
													"buttons": [{
														extend: 'excelHtml5',
														text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
											            title:'Historial de Infracciones',
											            autoFilter: true,
													},{
														extend: 'pdfHtml5',
														text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
											            title:'Historial de Infracciones',
											            orientation : 'portrait'
													}]
												};
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											if($local.tablaResultadosPrestamo) { 
												$local.tablaResultadosPrestamo.destroy(); 
												$local.$tablaResultadosPrestamo.empty(); 
											}
											$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
				
											//Dibujando tabla
			                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
											//Dibujando grafico
											var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Prestamos',presentacion,'Prestamos por criterio'));
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
									//Generando Leyenda
									var resultGraph = [];
									if(arr==""){
										var arrayJSONX = response[0].detalle;
										arr = arrayJSONX;
									}else{
										
										var datos = [];
										var j =0;
									
										var arrayJSONX = [];
										var datanuevo = [];
										for(l=0;l<response.length;l++){
											var n = response[l].detalle;
											var dn = new Object();
											dn['ejeX'] = response[l].ejeX;
											var j =0;
											for(i=0;i<n.length;i++){
												if(j<arr.length){
													if(n[i].segmento == arr[j]){
														var e = new Object();
														e['segmento']= n[i].segmento;
														e['numeroPrestamos'] = n[i].numeroPrestamos;
														e['ejeX']= n[i].ejeX;
														arrayJSONX.push(e);
														dn[n[i].segmento]= n[i].numeroPrestamos;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
										var c = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['title'] = $local.$title;
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Historial de Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Historial de Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosPrestamo) { 
											$local.tablaResultadosPrestamo.destroy(); 
											$local.$tablaResultadosPrestamo.empty(); 
										}
										$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Prestamos',presentacion,'Prestamos por criterio'));
										data = [];
										resultGraph = [];
										arrayJSONX = [];
										dataObject = [];
										c =[];

									break;
								}
								case "RECURSO" :{
									arr = $local.$selectRecurso.val();
									console.log(arr);
									$.ajax({
										type : "GET",
										url : $variableUtil.root + "tipoRecurso?accion=buscarTodos",
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
												var datos=[];
												var j =0;
												
												for(i =0;i<tr.length;i++){
													if(j<arr.length){									
														if(tr[i].idTipoRecurso == arr[j]){
															var e = new Object();
															e['id']=tr[i].idTipoRecurso;
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
											
											console.log(data);
											console.log(resultGraph);
											console.log(Object.keys(data[0]));
											if(arr==arrayJSONX){
													var d = data;
											}else{
												eliminarVacios(data);
												var d = datanuevo;
											}
											var cd = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['targets'] = [i];
													ej['className']  = "all dt-center fondo-blanco";
												}else{
													ej['targets'] = [i]
													ej['className']  = "all dt-right"
												}
												cd.push(ej);
											};
											var c = [];
											for(i=0;i<Object.keys(d[0]).length;i++){
												var ej = new Object();
												if(i==0){
													ej['title'] = $local.$title;
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
											ayuda['initComplete'] = function(){
												$("table").wrap("<div class='table-responsive'></div>");
											};
											ayuda['columnDefs']=cd;
											ayuda['columns'] = c;
											ayuda['data'] = d;
											ayuda['dom'] = 'Blfrtip';
											ayuda['buttons'] = {
													"dom":{
														"button":{
															"tag":"button",
															"className":"btn btn-success m-l-3"
														}
													},
													"buttons": [{
														extend: 'excelHtml5',
														text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
											            title:'Historial de Infracciones',
											            autoFilter: true,
													},{
														extend: 'pdfHtml5',
														text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
											            title:'Historial de Infracciones',
											            orientation : 'portrait'
													}]
												};
											dataObject.push(ayuda);
											console.log(ayuda);
											console.log(dataObject);
											if($local.tablaResultadosPrestamo) { 
												$local.tablaResultadosPrestamo.destroy(); 
												$local.$tablaResultadosPrestamo.empty(); 
											}
											$local.tablaResultadosPrestamo = $local.$tablaResultadosPrestamo.DataTable(dataObject[0]);
				
											//Dibujando tabla
			                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
											//Dibujando grafico
											var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Prestamos',presentacion,'Prestamos por criterio'));
											data = [];
											resultGraph = [];
											arrayJSONX = [];
											dataObject = [];
											c =[];
										}
									});	
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
						if($local.tablaResultadosPrestamo) { 
							$local.tablaResultadosPrestamo.destroy(); 
							$local.$tablaResultadosPrestamo.empty(); 
						}
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
							}],
							"dom":'Blfrtip',
							"buttons" : {
									"dom":{
										"button":{
											"tag":"button",
											"className":"btn btn-success m-l-3"
										}
									},
									"buttons": [{
										extend: 'excelHtml5',
										text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
							            title:'Prestamos',
							            autoFilter: true,
									},{
										extend: 'pdfHtml5',
										text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
							            title:'Prestamos',
							            orientation : 'portrait'
									}]
								}
						});
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
						var data =[];
						for(i=0;i<response.length;i++){
							if(response[i].segmento != null){
							var e = new Object();
							e['segmento']=response[i].segmento;
							e['numeroInfracciones']=response[i].numeroInfracciones;
							e['numeroInfraccionesPromedioPorAlumno']=response[i].numeroInfraccionesPromedioPorAlumno;
							e['numeroSancionados']=response[i].numeroSancionados;
							data.push(e);}
						}
						console.log(data);
					
						var cd = [];
						for(i=0;i<Object.keys(data[0]).length;i++){
							var ej = new Object();
							if(i==0){
								ej['targets'] = [i];
								ej['className']  = "all dt-center fondo-blanco";
							}else{
								ej['targets'] = [i]
								ej['className']  = "all dt-right"
							}
							cd.push(ej);
						};
						var c = [];
						for(i=0;i<Object.keys(data[0]).length;i++){
							var ej = new Object();
							if(i==0){
								ej['title'] = $local.$title;
								ej['data']  = Object.keys(data[0])[i];
							}else{
								ej['title'] = Object.keys(data[0])[i];;
								ej['data']  = Object.keys(data[0])[i];
							}
							c.push(ej);
						};
						var dataObject = [];
						var ayuda = new Object();
						ayuda['initComplete'] = function(){
							$("table").wrap("<div class='table-responsive'></div>");
						};
						ayuda['columnDefs']=cd;
						ayuda['columns'] = c;
						ayuda['data'] = data;
						ayuda['dom'] = 'Blfrtip';
						ayuda['buttons'] = {
								"dom":{
									"button":{
										"tag":"button",
										"className":"btn btn-success m-l-3"
									}
								},
								"buttons": [{
									extend: 'excelHtml5',
									text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
						            title:'Historial de Infracciones',
						            autoFilter: true,
								},{
									extend: 'pdfHtml5',
									text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
						            title:'Historial de Infracciones',
						            orientation : 'portrait'
								}]
							};
						dataObject.push(ayuda);
						if($local.tablaResultadosInfraccion) { 
							$local.tablaResultadosInfraccion.destroy(); 
							$local.$tablaResultadosInfraccion.empty(); 
						}
						$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
						//Dibujando tabla
						//$local.tablaResultadosInfraccion.rows.add(response).draw();
						//Dibujando grafico
						var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoPie(response,'segmento','numeroInfracciones','Análisis de Infracciones','Número de Infracciones', "<b style='font-size:12px'>[[title]]</b> ([[percents]]%) </br>  <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados]] <br> <b>Infracciones Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]"));
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
					console.log("caso7");
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
							if($local.tablaResultadosInfraccion) { 
								$local.tablaResultadosInfraccion.destroy(); 
								$local.$tablaResultadosInfraccion.empty(); 
							}
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
								}],
								"buttons" : {
									"dom":{
										"button":{
											"tag":"button",
											"className":"btn btn-success m-l-3"
										}
									},
									"buttons": [{
										extend: 'excelHtml5',
										text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
							            title:'Infracciones',
							            autoFilter: true,
									},{
										extend: 'pdfHtml5',
										text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
							            title:'Infracciones',
							            orientation : 'portrait'
									}]
								}
							});
							//Dibujando tabla
							$local.tablaResultadosInfraccion.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroInfracciones','Análisis de Infracciones por periodo','Número de Infracciones','<b>Periodo:</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Número de sancionados: </b> [[numeroSancionados]] </br> <b>Num Infracc. Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]'));
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
																e['numeroInfracciones'] = n[i].numeroInfracciones;
																e['ejeX'] = n[i].ejeX;
																arrayJSONX.push(e);
																dn[n[i].segmento] = n[i].numeroInfracciones;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosInfraccion) { 
											$local.tablaResultadosInfraccion.destroy(); 
											$local.$tablaResultadosInfraccion.empty(); 
										}
										$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
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
														e['id']=tr[i].idAreaEstudio;
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
																e['numeroPrestamos'] = n[i].numeroInfracciones;
																e['ejeX'] = n[i].ejeX;
																arrayJSONX.push(e);
																dn[n[i].segmento] = n[i].numeroInfracciones;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosInfraccion) { 
											$local.tablaResultadosInfraccion.destroy(); 
											$local.$tablaResultadosInfraccion.empty(); 
										}
										$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
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
								//Generando Leyenda
								var resultGraph = [];
								if(arr==""){
									var arrayJSONX = response[0].detalle;
									arr = arrayJSONX;
								}else{
									
									var datos = [];
									var j =0;
									console.log(data[0][arr[0]]);
									for(i =0;i<arr.length;i++){
										
									}
									
									var arrayJSONX = [];
									var datanuevo = [];
									for(l=0;l<response.length;l++){
										var n = response[l].detalle;
										var dn = new Object();
										dn['ejeX'] = response[l].ejeX;
										var j =0;
										for(i=0;i<n.length;i++){
											if(j<arr.length){
												if(n[i].segmento == arr[j]){
													var e = new Object();
													e['segmento']= n[i].segmento;
													e['numeroInfracciones'] = n[i].numeroInfracciones;
													e['ejeX']= n[i].ejeX;
													arrayJSONX.push(e);
													dn[n[i].segmento]= n[i].numeroInfracciones;
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
									
									console.log(data);
									console.log(resultGraph);
									console.log(Object.keys(data[0]));
									if(arr==arrayJSONX){
											var d = data;
									}else{
										eliminarVacios(data);
										var d = datanuevo;
									}
									var cd = [];
									for(i=0;i<Object.keys(d[0]).length;i++){
										var ej = new Object();
										if(i==0){
											ej['targets'] = [i];
											ej['className']  = "all dt-center fondo-blanco";
										}else{
											ej['targets'] = [i]
											ej['className']  = "all dt-right"
										}
										cd.push(ej);
									};
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
									ayuda['initComplete'] = function(){
										$("table").wrap("<div class='table-responsive'></div>");
									};
									ayuda['columnDefs']=cd;
									ayuda['columns'] = c;
									ayuda['data'] = d;
									ayuda['dom'] = 'Blfrtip';
									ayuda['buttons'] = {
											"dom":{
												"button":{
													"tag":"button",
													"className":"btn btn-success m-l-3"
												}
											},
											"buttons": [{
												extend: 'excelHtml5',
												text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
									            title:'Infracciones',
									            autoFilter: true,
											},{
												extend: 'pdfHtml5',
												text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
									            title:'Infracciones',
									            orientation : 'portrait'
											}]
										};
									dataObject.push(ayuda);
									console.log(ayuda);
									console.log(dataObject);
									if($local.tablaResultadosInfraccion) { 
										$local.tablaResultadosInfraccion.destroy(); 
										$local.$tablaResultadosInfraccion.empty(); 
									}
									$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
		
									//Dibujando tabla
	                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
									//Dibujando grafico
									var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
									data = [];
									resultGraph = [];
									arrayJSONX = [];
									dataObject = [];
									c =[];

								break;
							}
							case "TIPO_INFRACCION":{
								arr = $local.$selecttipoInfraccion.val();
								console.log(arr);
								$.ajax({
									type : "GET",
									url : $variableUtil.root + "multiTabDet/multiTabCab/"+2,
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
													if(tr[i].idItem == arr[j]){
														var e = new Object();
														e['id']=tr[i].idItem;
														e['descripcion']=tr[i].descripcion;
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
														   if( n[i].segmento == datos[j].descripcion ){
																var e = new Object();
																e['segmento'] = n[i].segmento;
																e['numeroPrestamos'] = n[i].numeroInfracciones;
																e['ejeX'] = n[i].ejeX;
																arrayJSONX.push(e);
																dn[n[i].segmento] = n[i].numeroInfracciones;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosInfraccion) { 
											$local.tablaResultadosInfraccion.destroy(); 
											$local.$tablaResultadosInfraccion.empty(); 
										}
										$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
										data = [];
										resultGraph = [];
										arrayJSONX = [];
										dataObject = [];
										c =[];
									}
								});	
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
							var data=[];
							for(i=0;i<response.length;i++){
								var e = new Object();
								e['ejeX']=response[i].segmento;
								e['numeroInfracciones']=response[i].numeroInfracciones;
								e['numeroSancionados']=response[i].numeroSancionados;
								e['numeroInfraccionesPromedioPorAlumno']=response[i].numeroInfraccionesPromedioPorAlumno;
								data.push(e);
							}
							if($local.tablaResultadosInfraccion) { 
								$local.tablaResultadosInfraccion.destroy(); 
								$local.$tablaResultadosInfraccion.empty(); 
							}
							var cd = [];
							for(i=0;i<Object.keys(data[0]).length;i++){
								var ej = new Object();
								if(i==0){
									ej['targets'] = [i];
									ej['className']  = "all dt-center fondo-blanco";
								}else{
									ej['targets'] = [i]
									ej['className']  = "all dt-right"
								}
								cd.push(ej);
							};
							var c = [];
							for(i=0;i<Object.keys(data[0]).length;i++){
								var ej = new Object();
								if(i==0){
									ej['title'] = $local.$title;
									ej['data']  = Object.keys(data[0])[i];
								}else{
									ej['title'] = Object.keys(data[0])[i];;
									ej['data']  = Object.keys(data[0])[i];
								}
								c.push(ej);
							};
							var dataObject = [];
							var ayuda = new Object();
							ayuda['initComplete'] = function(){
								$("table").wrap("<div class='table-responsive'></div>");
							};
							ayuda['columnDefs']=cd;
							ayuda['columns'] = c;
							ayuda['data'] = response;
							ayuda['dom'] = 'Blfrtip';
							ayuda['buttons'] = {
									"dom":{
										"button":{
											"tag":"button",
											"className":"btn btn-success m-l-3"
										}
									},
									"buttons": [{
										extend: 'excelHtml5',
										text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
							            title:'Infracciones',
							            autoFilter: true,
									},{
										extend: 'pdfHtml5',
										text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
							            title:'Infracciones',
							            orientation : 'portrait'
									}]
								};
							dataObject.push(ayuda);
							$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
							//Dibujando tabla
							//$local.tablaResultadosInfraccion.rows.add(response).draw();
							//Dibujando grafico
							var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarras(response,'ejeX','numeroInfracciones','Análisis de Infracciones ' ,'Cantidad de Infracciones','<b>'+ejeX+':</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados]] </br> <b>Infracciones Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]'));
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
																e['numeroInfracciones'] = n[i].numeroInfracciones;
																e['ejeX'] = n[i].ejeX;
																arrayJSONX.push(e);
																dn[n[i].segmento] = n[i].numeroInfracciones;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
										var c = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['title'] = $local.$title;
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosInfraccion) { 
											$local.tablaResultadosInfraccion.destroy(); 
											$local.$tablaResultadosInfraccion.empty(); 
										}
										$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
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
														e['id']=tr[i].idAreaEstudio;
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
																e['numeroPrestamos'] = n[i].numeroInfracciones;
																e['ejeX'] = n[i].ejeX;
																arrayJSONX.push(e);
																dn[n[i].segmento] = n[i].numeroInfracciones;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
										var c = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['title'] = $local.$title;
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosInfraccion) { 
											$local.tablaResultadosInfraccion.destroy(); 
											$local.$tablaResultadosInfraccion.empty(); 
										}
										$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
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
								//Generando Leyenda
								var resultGraph = [];
								if(arr==""){
									var arrayJSONX = response[0].detalle;
									arr = arrayJSONX;
								}else{
									
									var datos = [];
									var j =0;

									var arrayJSONX = [];
									var datanuevo = [];
									for(l=0;l<response.length;l++){
										var n = response[l].detalle;
										var dn = new Object();
										dn['ejeX'] = response[l].ejeX;
										var j =0;
										for(i=0;i<n.length;i++){
											if(j<arr.length){
												if(n[i].segmento == arr[j]){
													var e = new Object();
													e['segmento']= n[i].segmento;
													e['numeroInfracciones'] = n[i].numeroInfracciones;
													e['ejeX']= n[i].ejeX;
													arrayJSONX.push(e);
													dn[n[i].segmento]= n[i].numeroInfracciones;
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
									
									console.log(data);
									console.log(resultGraph);
									console.log(Object.keys(data[0]));
									if(arr==arrayJSONX){
											var d = data;
									}else{
										eliminarVacios(data);
										var d = datanuevo;
									}
									var cd = [];
									for(i=0;i<Object.keys(d[0]).length;i++){
										var ej = new Object();
										if(i==0){
											ej['targets'] = [i];
											ej['className']  = "all dt-center fondo-blanco";
										}else{
											ej['targets'] = [i]
											ej['className']  = "all dt-right"
										}
										cd.push(ej);
									};
									var c = [];
									for(i=0;i<Object.keys(d[0]).length;i++){
										var ej = new Object();
										if(i==0){
											ej['title'] = $local.$title;
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
									ayuda['initComplete'] = function(){
										$("table").wrap("<div class='table-responsive'></div>");
									};
									ayuda['columnDefs']=cd;
									ayuda['columns'] = c;
									ayuda['data'] = d;
									ayuda['dom'] = 'Blfrtip';
									ayuda['buttons'] = {
											"dom":{
												"button":{
													"tag":"button",
													"className":"btn btn-success m-l-3"
												}
											},
											"buttons": [{
												extend: 'excelHtml5',
												text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
									            title:'Infracciones',
									            autoFilter: true,
											},{
												extend: 'pdfHtml5',
												text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
									            title:'Infracciones',
									            orientation : 'portrait'
											}]
										};
									dataObject.push(ayuda);
									console.log(ayuda);
									console.log(dataObject);
									if($local.tablaResultadosInfraccion) { 
										$local.tablaResultadosInfraccion.destroy(); 
										$local.$tablaResultadosInfraccion.empty(); 
									}
									$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
		
									//Dibujando tabla
	                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
									//Dibujando grafico
									var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
									data = [];
									resultGraph = [];
									arrayJSONX = [];
									dataObject = [];
									c =[];

								break;
							}
							case "TIPO_INFRACCION":{
								arr = $local.$selecttipoInfraccion.val();
								console.log(arr);
								$.ajax({
									type : "GET",
									url : $variableUtil.root + "multiTabDet/multiTabCab/"+2,
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
													if(tr[i].idItem == arr[j]){
														var e = new Object();
														e['id']=tr[i].idItem;
														e['descripcion']=tr[i].descripcion;
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
														   if( n[i].segmento == datos[j].descripcion ){
																var e = new Object();
																e['segmento'] = n[i].segmento;
																e['numeroPrestamos'] = n[i].numeroInfracciones;
																e['ejeX'] = n[i].ejeX;
																arrayJSONX.push(e);
																dn[n[i].segmento] = n[i].numeroInfracciones;
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
										
										console.log(data);
										console.log(resultGraph);
										console.log(Object.keys(data[0]));
										if(arr==arrayJSONX){
												var d = data;
										}else{
											eliminarVacios(data);
											var d = datanuevo;
										}
										var cd = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['targets'] = [i];
												ej['className']  = "all dt-center fondo-blanco";
											}else{
												ej['targets'] = [i]
												ej['className']  = "all dt-right"
											}
											cd.push(ej);
										};
										var c = [];
										for(i=0;i<Object.keys(d[0]).length;i++){
											var ej = new Object();
											if(i==0){
												ej['title'] = $local.$title;
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
										ayuda['initComplete'] = function(){
											$("table").wrap("<div class='table-responsive'></div>");
										};
										ayuda['columnDefs']=cd;
										ayuda['columns'] = c;
										ayuda['data'] = d;
										ayuda['dom'] = 'Blfrtip';
										ayuda['buttons'] = {
												"dom":{
													"button":{
														"tag":"button",
														"className":"btn btn-success m-l-3"
													}
												},
												"buttons": [{
													extend: 'excelHtml5',
													text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
										            title:'Infracciones',
										            autoFilter: true,
												},{
													extend: 'pdfHtml5',
													text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
										            title:'Infracciones',
										            orientation : 'portrait'
												}]
											};
										dataObject.push(ayuda);
										console.log(ayuda);
										console.log(dataObject);
										if($local.tablaResultadosInfraccion) { 
											$local.tablaResultadosInfraccion.destroy(); 
											$local.$tablaResultadosInfraccion.empty(); 
										}
										$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable(dataObject[0]);
			
										//Dibujando tabla
		                                //$local.tablaResultadosPrestamo.rows.add(data).draw();
										//Dibujando grafico
										var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoBarrasSegmentado(data,resultGraph,'ejeX','Cantidad de Infracciones',presentacion,'Infracciones por criterio'));
										data = [];
										resultGraph = [];
										arrayJSONX = [];
										dataObject = [];
										c =[];
									}
								});	
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
					var chart = AmCharts.makeChart('chartdivin',$funcionGraficoUtil.crearGraficoLineal(response,'ejeX','numeroInfracciones',"<b>Periodo:</b> [[category]] </br> <b>Infracciones:</b> [[value]] </br> <b>Sancionados: </b> [[numeroSancionados]] </br> <b>Infracc. Prom: </b> [[numeroInfraccionesPromedioPorAlumno]]"));
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
		}],
		"dom":'Blfrtip',
		"buttons" : {
			"dom":{
				"button":{
					"tag":"button",
					"className":"btn btn-success m-l-3"
				}
			},
			"buttons": [{
				extend: 'excelHtml5',
				text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
	            title:'Prestamos',
	            autoFilter: true,
			},{
				extend: 'pdfHtml5',
				text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
	            title:'Prestamos',
	            orientation : 'portrait'
			}]
		}
	});
	
/*	$local.$tablaResultadosPrestamo.DataTable({
		dom : 'Bfrtip',
		buttons : [
			'copyHtml5',
			'excelHtml5',
			'csvHtml5',
			'pdfHtml5'
		]
	  
	});*/

	
	$local.tablaResultadosInfraccion = $local.$tablaResultadosInfraccion.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
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
		}],
		"dom":'Blfrtip',
		"buttons" : {
			"dom":{
				"button":{
					"tag":"button",
					"className":"btn btn-success m-l-3"
				}
			},
			"buttons": [{
				extend: 'excelHtml5',
				text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
	            title:'Infracciones',
	            autoFilter: true,
			},{
				extend: 'pdfHtml5',
				text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
	            title:'Infracciones',
	            orientation : 'portrait'
			}]
		}
	});
	
	$local.tablaResultadosMasFrecuentes = $local.$tablaResultadosMasFrecuentes.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
		"initComplete" : function() {
			$local.$tablaResultadosMasFrecuentes.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0],
			"className" : "all dt-center fondo-blanco"
		},{
			"targets" : [ 1, 2, 3],
			"className" : "all dt-right"
		} ],
		"columns" : [ {
			"data" : "nombres",
			"title" : "Nombres"
		}, {
			"data" : "codigo",
			"title" : "Codigo"
		}, {
			"data" : "cantidad",
			"title" : "Cantidad"
		}, {
			"data" : "escuela",
			"title" : "Escuela"
		}],
		"dom":'Blfrtip',
		"buttons" : {
			"dom":{
				"button":{
					"tag":"button",
					"className":"btn btn-success m-l-3"
				}
			},
			"buttons": [{
				extend: 'excelHtml5',
				text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
	            title:'Alumnos Mas Frecuentes',
	            autoFilter: true,
			},{
				extend: 'pdfHtml5',
				text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
	            title:'Alumnos Mas Frecuentes',
	            orientation : 'portrait'
			}]
		},
		"aoColumnDefs" : [ {
		    "bSortable" : false,
		    "aTargets" : [ "sorting_disabled" ]
		} ],
		 "order": [
	            [2, 'dsc']
	        ]
		
	});
	
	$local.tablaResultadosMasFrecuentesFacultad = $local.$tablaResultadosMasFrecuentesFacultad.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
		"initComplete" : function() {
			$local.$tablaResultadosMasFrecuentesFacultad.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0],
			"className" : "all dt-center fondo-blanco"
		},{
			"targets" : [ 1],
			"className" : "all dt-right"
		} ],
		"columns" : [ {
			"data" : "facultad",
			"title" : "Facultad"
		}, {
			"data" : "cantidad",
			"title" : "Cantidad"
		}],
		"aoColumnDefs" : [ {
		    "bSortable" : false,
		    "aTargets" : [ "sorting_disabled" ]
		} ],
		 "order": [
	            [1, 'dsc']
	        ],
	        "dom":'Blfrtip',
			"buttons" : {
				"dom":{
					"button":{
						"tag":"button",
						"className":"btn btn-success m-l-3"
					}
				},
				"buttons": [{
					extend: 'excelHtml5',
					text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
		            title:'Facultades Mas Frecuentes',
		            autoFilter: true,
				},{
					extend: 'pdfHtml5',
					text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
		            title:'Facultades Mas Frecuentes',
		            orientation : 'portrait'
				}]
			}
		
	});

	$local.tablaResultadosMasFrecuentesEscuela = $local.$tablaResultadosMasFrecuentesEscuela.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
		"initComplete" : function() {
			$local.$tablaResultadosMasFrecuentesEscuela.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0],
			"className" : "all dt-center fondo-blanco"
		},{
			"targets" : [ 1],
			"className" : "all dt-right"
		} ],
		"columns" : [ {
			"data" : "escuela",
			"title" : "Escuela"
		}, {
			"data" : "cantidad",
			"title" : "Cantidad"
		}],
		"aoColumnDefs" : [ {
		    "bSortable" : false,
		    "aTargets" : [ "sorting_disabled" ]
		} ],
		 "order": [
	            [1, 'dsc']
	        ],
	        "dom":'Blfrtip',
			"buttons" : {
				"dom":{
					"button":{
						"tag":"button",
						"className":"btn btn-success m-l-3"
					}
				},
				"buttons": [{
					extend: 'excelHtml5',
					text :'<i class="fa fa-file-excel-o"> Exportar Excel </i>',
		            title:'Escuelas Mas Frecuentes',
		            autoFilter: true,
				},{
					extend: 'pdfHtml5',
					text :'<i class="fa fa-file-pdf-o"> Exportar Pdf</i>',
		            title:'Escuelas Mas Frecuentes',
		            orientation : 'portrait'
				}]
			}
		
	});
	
	$local.$divTablaResumenPrestamo.removeClass("hidden"); // por defecto
	$local.$divTablaResumenInfraccion.addClass("hidden"); // por defecto
	$local.$divTablaResumenMasFrecuentes.addClass("hidden"); // por defecto}
	$local.$divTablaResumenMasFrecuentesFacultad.addClass("hidden"); // por defecto
	$local.$divTablaResumenMasFrecuentesEscuela.addClass("hidden"); // por defecto
	$('#cfacultad').addClass("hidden");//por defecto
	$('#cescuela').addClass("hidden"); // por defecto
	$('#cmf').addClass("hidden");
	$('#resultadoGraficomf').addClass("hidden"); // por defecto
	$('#resultadoGraficoin').addClass("hidden"); // por defecto
	$('#resultadoGraficof').addClass("hidden"); // por defecto
	$('#resultadoGraficoe').addClass("hidden"); // por defecto
	$('#mfescuela').addClass("hidden"); // por defecto
	$('#cinf').addClass("hidden");
	
	$("#xd").find(".comun").on("click", function(){
		$local.$tipoReporte = $(this).attr("key");
		if($local.$tipoReporte=="P"){
			$('#principal').removeClass("hidden");
			$local.$divTablaResumenPrestamo.removeClass("hidden");
			$local.$divTablaResumenMasFrecuentes.addClass("hidden");
			$local.$divTablaResumenMasFrecuentesFacultad.addClass("hidden");
			$local.$divTablaResumenMasFrecuentesEscuela.addClass("hidden");
			$local.$divTablaResumenInfraccion.addClass("hidden");
			$('#cmf').addClass("hidden");
			$('#cfacultad').addClass("hidden");
			$('#cescuela').addClass("hidden"); 
			$('#gr').removeClass("hidden");
			$('#recurso').removeClass("hidden");
			$('#tipoInfraccion').addClass("hidden");
			$('#tipoEstado').addClass("hidden");
			$('#resultadoGraficoin').addClass("hidden"); // por defecto
			$('#resultadoGrafico').removeClass("hidden"); // por defecto
			$('#cinf').addClass("hidden");
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
			$('#principal').addClass("hidden");
			$local.$divTablaResumenPrestamo.addClass("hidden");
			$local.$divTablaResumenMasFrecuentes.addClass("hidden");
			$local.$divTablaResumenMasFrecuentesFacultad.addClass("hidden");
			$local.$divTablaResumenMasFrecuentesEscuela.addClass("hidden");
			$local.$divTablaResumenInfraccion.removeClass("hidden");
			$('#cmf').addClass("hidden");
			$('#cfacultad').addClass("hidden");
			$('#cescuela').addClass("hidden");
			$('#gr').removeClass("hidden");
			$('#tipoInfraccion').removeClass("hidden");
			$('#tipoEstado').removeClass("hidden");
			$('#recurso').addClass("hidden");
			$('#resultadoGraficoin').remove("hidden"); // por defecto
			$('#resultadoGrafico').addClass("hidden"); // por defecto
			$('#cinf').removeClass("hidden");
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
		if($local.$tipoReporte=="M"){
			$('#principal').addClass("hidden");
			$local.$divTablaResumenPrestamo.addClass("hidden");
			$local.$divTablaResumenInfraccion.addClass("hidden");
			$local.$divTablaResumenMasFrecuentes.removeClass("hidden");
			$local.$divTablaResumenMasFrecuentesFacultad.removeClass("hidden");
			$local.$divTablaResumenMasFrecuentesEscuela.removeClass("hidden");
			$('#cmf').removeClass("hidden");//por defecto
			$('#cfacultad').removeClass("hidden");//por defecto
			$('#cescuela').removeClass("hidden"); // por defecto

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
	
	$local.$limpiar.on('click', function() {
		if($local.$tipoReporte=="P"){
			var f ={
					"tipoPeriodo":-1,
					"recurso":-1,
					"tipoGrafica":-1,
					"areaEstudio":-1,
					"valSeries":"",
					"valEjeX":"",
					"valSegY":"NINGUNA",
					"valPresentacion":-1
			}
			$funcionUtil.llenarFormulario(f,$formEstadisticas);
			$local.$divPeriodoDia.addClass("hidden");
			$local.$divSemanaInicio.addClass("hidden");
			$local.$divSemanaFin.addClass("hidden");
			$local.$divMesInicio.addClass("hidden");
			$local.$divMesFin.addClass("hidden");
			$local.$divAnioInicio.addClass("hidden");
			$local.$divAnioFin.addClass("hidden");
			$local.$divSerie.addClass("hidden");
			$local.$divEjeX.addClass("hidden");
			$local.$divSegmY.addClass("hidden");
			$local.$divPresentacion.addClass("hidden");
			
			if($local.tablaResultadosPrestamo){
				$local.tablaResultadosPrestamo.clear().draw();	
			}
			
		}else{
			var f ={
					"tipoPeriodo":-1,
					"recurso":-1,
					"tipoGrafica":-1,
					"areaEstudio":-1,
					"valSeries":"",
					"valEjeX":"",
					"valSegY":"NINGUNA",
					"valPresentacion":-1
			}
			$funcionUtil.llenarFormulario(f,$formEstadisticas);
			$local.$divPeriodoDia.addClass("hidden");
			$local.$divSemanaInicio.addClass("hidden");
			$local.$divSemanaFin.addClass("hidden");
			$local.$divMesInicio.addClass("hidden");
			$local.$divMesFin.addClass("hidden");
			$local.$divAnioInicio.addClass("hidden");
			$local.$divAnioFin.addClass("hidden");
			$local.$divSerie.addClass("hidden");
			$local.$divEjeX.addClass("hidden");
			$local.$divSegmY.addClass("hidden");
			$local.$divPresentacion.addClass("hidden");
			if($local.tablaResultadosInfraccion){
				$local.tablaResultadosInfraccion.clear().draw();	
			}
		   }
	});
	
	
	$local.$limpiarmf.on('click', function() {
			var f ={
					"facultades":-1,
					"areasEstudio":-1
			}
			$funcionUtil.llenarFormulario(f,$formMasFrecuentes);
			$('#mfescuela').addClass("hidden");
			$('#resultadoGraficomf').addClass("hidden");
			$('#resultadoGraficof').addClass("hidden");
			$('#resultadoGraficoe').addClass("hidden");
			if($local.tablaResultadosMasFrecuentes){
				$local.tablaResultadosMasFrecuentes.clear().draw();	
			}
			if($local.tablaResultadosMasFrecuentesEscuela){
				$local.tablaResultadosMasFrecuentesEscuela.clear().draw();	
			}
			if($local.tablaResultadosMasFrecuentesFacultad){
				$local.tablaResultadosMasFrecuentesFacultad.clear().draw();	
			}
		});
	
	function eliminarVacios(jsonx){
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