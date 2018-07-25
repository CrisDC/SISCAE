$(document).ready(function() {

	var $local = {
		$tablaConsultaAdministrativa : $("#tablaConsultaAdministrativa"),
		tablaConsultaAdministrativa : "",
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
			"url" : $variableUtil.root + "consulta/administrativa/personaPP?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Personas registradas."
		},
		"initComplete" : function() {
			$local.$tablaConsultaAdministrativa.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsultaAdministrativa);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
			"className" : "all filtrable",
			"defaultContent": "*"
		} ],
		
		"columns" : [ {
			"data" : "descripcionTipoDocumento",
			"title" : "Tipo Doc."
		}, {
			"data" : "numeroDocumento",
			"title" : "Num. Doc."
		}, {
			"data" : "nombres",
			"title" : "Nombres"
		}, {
			"data" : "apellidoPaterno",
			"title" : "Ap. Paterno"
		}, {
			"data" : "apellidoMaterno",
			"title" : "Ap. Materno"
		},{
			"data" : "alias",
			"title" : "Alias"
		}, {
			"data" : "direccion",
			"title" : "Direccion"
		}, {
			"data" : "telefono",
			"title" : "Teléfono"
		}, {
			"data" : "fechaNacimiento",
			"title" : "Fecha Nacimiento"
		}, {
			"data" : "telefonoFijo",
			"title" : "Teléfono Fijo"
		}, {
			"data" : "telefonoMovil",
			"title" : "Teléfono Móvil"
		}, {
			"data" : "codPulsera",
			"title" : "Código Pulsera"
		}, {
			"data" : "codigoUBA",
			"title" : "Código UBA"
		}, {
			"data" : "correoElectronico",
			"title" : "Correo Electrónico"
		}, {
			"data" : "fechaRegistro",
			"title" : "Fecha Registro"
		} ]
	});
	
	var buttonCommon = {
	        exportOptions: {
	            
	            columns:  [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
	        }
			/*,
			customize:  function (xlsx) {
				var sheet = xlsx.xl.worksheets['styles.xml'];
			 
			}*/
	 };
	
	new $.fn.dataTable.Buttons( $local.tablaConsultaAdministrativa, {
	    buttons: [
	    	$.extend( true, {}, buttonCommon, {
                extend: 'excelHtml5'
            } )
	    ]
	} );
	 
	$local.tablaConsultaAdministrativa.buttons().container()
	    .appendTo( $('.col-sm-6:eq(0)', $local.tablaMantenimiento.table().container() ) );
	

	$local.$tablaConsultaAdministrativa.find("thead").on("keyup", "input", function() {
		$local.tablaConsultaAdministrativa.column($(this).parent().index() + ":visible").search(this.value).draw();
	});

});