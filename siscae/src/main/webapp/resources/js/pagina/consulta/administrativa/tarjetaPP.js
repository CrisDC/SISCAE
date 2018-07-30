$(document).ready(function() {

	var $local = {
		$tablaConsultaAdministrativa : $("#tablaConsultaAdministrativa"),
		tablaConsultaAdministrativa : "",
		$exportarXlsx : $("#exportarXlsx")
	};

	$.fn.dataTable.ext.errMode = "none";

	$local.$tablaConsultaAdministrativa.on("xhr.dt", function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaConsultaAdministrativa.clear().draw();
			$funcionUtil.notificarException(xhr.responseText, "Error Interno", "danger");
			break;
		}
	});

	$local.tablaConsultaAdministrativa = $local.$tablaConsultaAdministrativa.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "consulta/administrativa/tarjetaPP?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Tarjetas registradas."
		},
		"initComplete" : function() {
			$local.$tablaConsultaAdministrativa.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsultaAdministrativa);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7,8, 9, 11,12,13,14,15,16,17,18 ],
			"className" : "all filtrable",
			"defaultContent": "*"
		}, {
			"targets" : 15,
			"className" : "all filtrable",
			"render" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.idBIN, row.descripcionBIN);
			} 
		}, {
			"targets" : 4,
			"className" : "all filtrable",
			"render" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.tipoDocumento, row.descripcionTipoDocumento);
		    }
		 } ],

		"columns" : [ {
			"data" : "idTarjeta",
			"title" : "Id Tarjeta"
		}, {
			"data" : "numeroTarjeta",
			"title" : "Número Tarjeta"
		}, {
			"data" : "codigoSeguimiento",
			"title" : "Código Seguimiento"
		}, {		
			"data" : "idPersona",
			"title" : "Id Persona"
		}, {
			"data" : null,
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
			"data" : "fechaActivacion",
			"title" : "Fecha Activación"
		}, {
			"data" : "fechaBloqueo",
			"title" : "Fecha Bloqueo"
		}, {
			"data" : "estado",
			"title" : "Estado de Tarjeta"
		}, {
			"data" : "idCuenta",
			"title" : "Id Cuenta"
		}, {
			"data" : "titularidad",
			"title" : "Titularidad"
		}, {
			"data" : "idLote",
			"title" : "Id Lote"
		}, {
			"data" : null,
			"title" : "BIN"
		}, {
			"data" : "idSubBIN",
			"title" : "SubBIN"
		}, {
			"data" : "idCliente",
			"title" : "Id Cliente"
		}, {
			"data" : "claveId",
			"title" : "Clave Id"
		} ]
	});

	$local.$tablaConsultaAdministrativa.find("thead").on("keyup", "input.filtrable", function() {
		$local.tablaConsultaAdministrativa.column($(this).parent().index() + ":visible").search(this.value).draw();
	});

	$local.$exportarXlsx.on("click", function() {
	


		window.location.href = $variableUtil.root + "/reporte/prepago/contabilidad/tarjetas?accion=exportar";
	});
});