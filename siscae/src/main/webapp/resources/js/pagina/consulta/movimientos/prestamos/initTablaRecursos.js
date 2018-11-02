$(document).ready(function(){
	/* ---------- Construcción de tabla ---------- */
	var $local = {
			$tblConsulta : $("#tblRecursos"),
			tblConsulta  : ""
	}
	var nombreAreaEstudio = $('#idNombreAreaEstudio').text();
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tblConsulta.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
			case 500:
				$local.tblConsulta.clear().draw();
				break;
			}
	});
	$local.tblConsulta = $local.$tblConsulta.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "consultaPrestamosTabla?accion=buscarPorCriterio&areaEstudio="+nombreAreaEstudio,
				"dataSrc" : ""
			},
			"language" : {
				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			},
			"initComplete" : function() {
				$local.$tblConsulta.wrap("<div class='table-responsive'></div>");
				$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta);
			},
			"columnDefs" : [ {
				"targets" : [ 0, 1, 2, 3, 4, 5, 6],
				"className" : "all filtrable",
			} , {
				"targets" : 8,
				"className" : "all dt-center",
				"defaultContent" : $variableUtil.botonDesalojar
			}  ],
						
			"columns" : [{
				"data" : 'numero',
				"title" : "Recurso"
			}, {
				"data" : 'estado',
				"title" : "Estado"
			}, {
				"data" : 'codigoAlumno',
				"title" : "Codigo"
			}, {
				"data" : 'nombre',
				"title" : "Nombre"
			}, {
				"data" : 'appPaterno',
				"title" : "A. Paterno"
			}, {
				"data" : 'appMaterno',
				"title" : "A. Materno"
			}, {
				"data" : 'horaEntrada',
				"title" : "Hora de entrada"
			}, {
				"data" : 'horaEntrada', //cambiar
				"title" : "Tiempo restante"
			} ,{
				"data" : null,
				"title" : 'Acción'
			}]
	});				
	$local.$tblConsulta.find("thead").on('keyup', 'input', function() {
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	/* ------ fin Construcción de tablas ------------ */ 
});