$(document).ready(function() {

	var $local = {
		$tabla : $(".tabla-pasos"),
		tabla : ""
	};

	$local.tabla = $local.$tabla.DataTable({
		"ordering" : false,
		"paging" : false,
		"searching" : false,
		"info" : false,
		"language" : {
			"emptyTable" : "No hay programas registrados en esta etapa."
		}
	});

	$local.$tabla.find("tbody").on("click", ".ejecutar", function() {
		var labelEjecutado = "<label class='label label-success'>Ejecutado</label>";
		var $botonEjecutar = $(this);
		var $tdBoton = $(this).parent();
		var codigoGrupo = $botonEjecutar.attr("data-codigoGrupo");
		var codigoPrograma = $botonEjecutar.attr("data-codigoPrograma");
		var codigoSubModulo = $botonEjecutar.attr("data-codigoSubModulo");
		var procedimiento = $botonEjecutar.attr("data-procedimiento");
		var urlSistema = $botonEjecutar.attr("data-urlSistema");
		var logControlProgramaResumen = {
			"codigoGrupo" : codigoGrupo,
			"codigoPrograma" : codigoPrograma,
			"codigoSubModulo" : codigoSubModulo,
			"procedimiento" : procedimiento,
			"urlSistema" : urlSistema
		};
		if (codigoGrupo == "TAB_CTRL_PROC_RES") {
			$.ajax({
				type : "POST",
				url : $variableUtil.root + "proceso/ejecucion/manual?paso=prepararControlProceso",
				data : JSON.stringify(logControlProgramaResumen),
				beforeSend : function(xhr) {
					$botonEjecutar.attr("disabled", true).find("i").removeClass("fa-cog").addClass("fa-spinner fa-pulse fa-fw");
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				},
				statusCode : {
					400 : function(response) {
						if (response.responseJSON == undefined) {
							$funcionUtil.notificarException("Ocurrió un error no identificado", "fa-warning", "Aviso", "warning");
						} else {
							var mensaje = response.responseJSON[0]
							$funcionUtil.notificarException(mensaje.mensajeError, "fa-warning", "Aviso", "warning");
						}
					},
					403 : function(response) {
						$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
					},
					409 : function(response) {
						$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
					}
				},
				success : function(response) {
					$funcionUtil.notificarException("Ejecutado exitosamente", "fa-success", "Aviso", "success");
					$botonEjecutar.find("span").text("Reprocesar");
				},
				complete : function() {
					$botonEjecutar.attr("disabled", false).find("i").addClass("fa-cog").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		} else if (codigoGrupo == "WS_CARGA_TABLAS") {
			$.ajax({
				type : "POST",
				url : $variableUtil.root + "proceso/ejecucion/manual?paso=servicioWeb",
				data : JSON.stringify(logControlProgramaResumen),
				beforeSend : function(xhr) {
					$botonEjecutar.attr("disabled", true).find("i").removeClass("fa-cog").addClass("fa-spinner fa-pulse fa-fw");
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				},
				statusCode : {
					400 : function(response) {
						if (response.responseJSON == undefined) {
							$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
						} else {
							var mensaje = response.responseJSON[0]
							$funcionUtil.notificarException(mensaje.mensajeError, "fa-warning", "Aviso", "warning");
						}
					},
					403 : function(response) {
						$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
					},
					409 : function(response) {
						$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
					}
				},
				success : function(response) {
					$funcionUtil.notificarException("Se realizaron " + response + " registros.", "fa-success", "Registro Exitoso", "success");
					$botonEjecutar.find("span").text("Reprocesar");
				},
				complete : function() {
					$botonEjecutar.attr("disabled", false).find("i").addClass("fa-cog").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		} else if (codigoGrupo == "COMP" || codigoGrupo == "CONC" || codigoGrupo == "CONT") {
			var paso = "";
			if (codigoGrupo == "COMP") {
				paso = "compensacion";
			} else if (codigoGrupo == "CONC") {
				paso = "conciliacion";
			} else if (codigoGrupo == "CONT") {
				paso = "contabilizacion";
				if(logControlProgramaResumen.codigoPrograma == "AFON" || logControlProgramaResumen.codigoPrograma == "ACOM" ){
					paso = "contabilizacion-archivos";
				}
			}
			
			$.ajax({
				type : "POST",
				url : $variableUtil.root + "proceso/ejecucion/manual?paso=" + paso,
				data : JSON.stringify(logControlProgramaResumen),
				beforeSend : function(xhr) {
					$botonEjecutar.attr("disabled", true).find("i").removeClass("fa-cog").addClass("fa-spinner fa-pulse fa-fw");
					xhr.setRequestHeader('Content-Type', 'application/json');
					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
				},
				statusCode : {
					400 : function(response) {
						if (response.responseJSON == undefined) {
							$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
						} else {
							var mensaje = response.responseJSON[0]
							$funcionUtil.notificarException(mensaje.mensajeError, "fa-warning", "Aviso", "warning");
						}
					},
					403 : function(response) {
						$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
					},
					409 : function(response) {
						$funcionUtil.notificarException(response.responseText, "fa-warning", "Aviso", "warning");
					}
				},
				success : function(response) {
					$funcionUtil.notificarException("Ejecutado Exitosamente", "fa-success", "Aviso", "success");
					$botonEjecutar.find("span").text("Reprocesar");
				},
				complete : function() {
					$botonEjecutar.attr("disabled", false).find("i").addClass("fa-cog").removeClass("fa-spinner fa-pulse fa-fw");
				}
			});
		} 
		
	});

	$("#smartwizard").on("showStep", function(e, anchorObject, stepNumber, stepDirection, stepPosition) {
		if (stepPosition === 'first') {
			$("#prev-btn").addClass('disabled');
		} else if (stepPosition === 'final') {
			$("#next-btn").addClass('disabled');
		} else {
			$("#prev-btn").removeClass('disabled');
			$("#next-btn").removeClass('disabled');
		}
	});

	$('#smartwizard').smartWizard({
		selected : 0,
		theme : 'arrows',
		transitionEffect : 'fade',
		showStepURLhash : true,
		lang : {
			next : 'Siguiente',
			previous : 'Anterior'
		}
	});

	$("#prev-btn").on("click", function() {
		// Navigate previous
		$('#smartwizard').smartWizard("prev");
		return true;
	});

	$("#next-btn").on("click", function() {
		// Navigate next
		$('#smartwizard').smartWizard("next");
		return true;
	});

});