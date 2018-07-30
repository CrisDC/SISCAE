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
			"url" : $variableUtil.root + "consulta/administrativa/cuentaPP?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No se encontraron cuentas."
		},
		"initComplete" : function() {
			$local.$tablaConsultaAdministrativa.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsultaAdministrativa);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1, 2, 3, 4, 5 ],
			"className" : "all filtrable",
			"defaultContent": "*"
		} ],
		
		"columns" : [ {
			"data" : "idCuenta",
			"title" : "Id. Cuenta"
		}, {
			"data" : "fechaAlta",
			"title" : "Fecha Alta"
		}, {
			"data" : "saldoDisponible",
			"title" : "Saldo Disponible"
		}, {
			"data" : "saldoContable",
			"title" : "Saldo Contable"
		}, {
			"data" : "idBin",
			"title" : "Id BIN"
		}, {
			"data" : "idSubBin",
			"title" : "Id SubBIN"
		} ]
	});

	$local.$tablaConsultaAdministrativa.find("thead").on("keyup", "input", function() {
		$local.tablaConsultaAdministrativa.column($(this).parent().index() + ":visible").search(this.value).draw();
	});

});