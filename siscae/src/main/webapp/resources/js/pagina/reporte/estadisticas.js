$(document).ready(function() {
	
	var $local = {
			//Inputs de la pagina (SELECTS, INPUTS)
			$selectTipoGrafico : $('#selectTipoGrafico'),
			$selectPeriodo : $('#selectPeriodo'),
			$selectEjeX : $('#selectEjeX'),
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
			
			//Botones de la pagina
			$buscar : $('#buscar'),
			$exportar : $('#exportar'),
			
			//DataTable
			$tablaResultados : $("#tblReporteResumen"),
			tablaResultados : ""
		};

	$funcionUtil.crearDateRangePickerSimple($local.$fechaPrestamo, "YYYY-MM-DD");
	
	//Creando elementos combobox con estilo chevere (Plugin Select2)
	$funcionUtil.crearSelect2($local.$selectTipoGrafico);
	$funcionUtil.crearSelect2($local.$selectPeriodo);
	$funcionUtil.crearSelect2($local.$selectEjeX);
	$funcionUtil.crearSelect2($local.$selectSegmY);
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
	
	//Evento que se dispara cuando el combo Segmentacion en Y cambie
	$local.$selectTipoGrafico.on("change", function(){
		var val = $(this).val(); 	
		if(val == "BARRAS" && $local.$selectSegmY.val() != "NINGUNA"){
			$local.$divPresentacion.removeClass("hidden");
		}else{
			$local.$divPresentacion.addClass("hidden");
		}
	});
	
	
	$local.$buscar.on('click', function() {
//		if (!$formEstadisticas.valid()) {
//			return;
//		}
		var criterioBusqueda = $formEstadisticas.serializeJSON();
		//Obtener datos del periodo
		if($local.$selectPeriodo.val() == 'DIA'){
			var rangoFechaBusqueda = $funcionUtil.obtenerFechasDateRangePicker($local.$fechaPrestamo);
			criterioBusqueda.fechaInicio = rangoFechaBusqueda.fechaInicio;
			criterioBusqueda.fechaFin = rangoFechaBusqueda.fechaFin;
		}
		if($local.$selectPeriodo.val() == 'SEMANA'){
			criterioBusqueda.semanaInicio = $funcionUtil.obtenerSemanaInputWeek($local.$semanaInicio);
			criterioBusqueda.anioInicio = $funcionUtil.obtenerAnioInputWeek($local.$semanaFin);
			criterioBusqueda.semanaFin = $funcionUtil.obtenerSemanaInputWeek($local.$semanaFin);
			criterioBusqueda.anioFin = $funcionUtil.obtenerAnioInputWeek($local.$semanaFin);
		}
		if($local.$selectPeriodo.val() == 'MES'){
			criterioBusqueda.mesInicio = $funcionUtil.obtenerMesInputMonth($local.$mesInicio);
			criterioBusqueda.anioInicio = $funcionUtil.obtenerAnioInputMonth($local.$anioInicio);
			criterioBusqueda.mesFin = $funcionUtil.obtenerMesInputMonth($local.$mesFin);
			criterioBusqueda.anioFin = $funcionUtil.obtenerAnioInputMonth($local.$anioFin);
		}
		if($local.$selectPeriodo.val() == 'ANIO'){
			criterioBusqueda.anioInicio = $local.$anioInicio.val();
			criterioBusqueda.anioFin = $local.$anioFin.val();
		}
		//Obteniendo parametros de la grafica
		let tipoGrafico = $local.$selectTipoGrafico.val();
		let segmentacionY = $local.$selectSegmY.val();
		let ejeX = $local.$selectEjeX.val();
		
		console.log(criterioBusqueda);
		if(tipoGrafico == "BARRAS" && segmentacionY == "NINGUNA" && ejeX == "PERIODO"){
			
			$.ajax({
				type : "GET",
				url : $variableUtil.root + "reporteEstadisticaPrestamos?accion=buscarPorPeriodoSinSegmentar",
				contentType : "application/json",
				data: criterioBusqueda,
				dataType : "json",
				beforeSend : function(xhr) {
					xhr.setRequestHeader('Content-Type', 'application/json');
					//Borrando tabla antes de hacer la consulta
					$local.tablaResultados.clear().draw();
					$local.$buscar.attr("disabled", true).find("i").removeClass("fa-search").addClass("fa-spinner fa-pulse fa-fw");
				},
				success : function(response) {
					//Imprimiendo datos
					console.log(response);
					if (response.length === 0) {
						$funcionUtil.notificarException($variableUtil.busquedaSinResultados, "fa-exclamation-circle", "Información", "info");
						return;
					}
					//Dibujando tabla
					$local.tablaResultados.rows.add(response).draw();
					//Dibujando grafico
					var chart = AmCharts.makeChart('chartdiv',$funcionGraficoUtil.crearGraficoBarras(response,'periodoPrestamo','numeroPrestamos','Análisis de préstamos por periodo','Número de prestamos','<b>Periodo:</b> [[category]] </br> <b>Prestamos:</b> [[value]] </br> <b>Tiempo Total: </b> [[estadiaTotal]] </br> <b>Tiempo Prom: </b> [[estadiaPromedio]]'));
				},
				error : function(response) {
				},
				complete : function() {
					$local.$buscar.attr("disabled", false).find("i").addClass("fa-search").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		}
		
	});
	
	$local.tablaResultados = $local.$tablaResultados.DataTable({
		"language" : {
			"emptyTable" : "No hay registros encontrados."
		},
		"pageLength": 10,
		"initComplete" : function() {
			$local.$tablaResultados.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0],
			"className" : "all dt-center fondo-blanco"
		},{
			"targets" : [ 1, 2, 3],
			"className" : "all dt-right"
		} ],
		"columns" : [ {
			"data" : "periodoPrestamo",
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
	
	

});