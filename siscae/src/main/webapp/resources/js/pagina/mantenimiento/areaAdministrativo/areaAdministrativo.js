$(document).ready(function() {
	var $local = {
		$tablaMantenimiento : $("#tablaMantenimiento"),
		tablaMantenimiento : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$aniadirMantenimento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$filaSeleccionada : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		idAreaAdministrativoSeleccionado : ""
	}
	$formMantenimiento = $("#formMantenimiento");

	$.fn.dataTable.ext.errMode = 'none';

	$local.$tablaMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaMantenimiento.clear().draw();
			break;
		}
	});
	$local.tablaMantenimiento = $local.$tablaMantenimiento.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "areaAdministrativo?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
			"emptyTable" : "No hay registros encontrados." // Nuevo
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento);
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}, {
			"targets" : [ 2, 3 ],
			"className" : "filtrable",
		}, {
			"targets" : 8,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizarNuevo + " " + $variableUtil.botonEliminarNuevo
		} ],
		"columns" : [{
			"data" : 'nombreAreaEstudio',
			"title" : "Area Estudio"
		}, {
			"data" : 'codigo',
			"title" : "Codigo Administrativo"
		}, {
			"data" : 'nombreAdministrativo',
			"title" : "Nombre Adm."
		}, {
			"data" : 'appPatAdministrativo',
			"title" : "Apellido Pat. Adm."
		}, {
			"data" : 'appMatAdministrativo',
			"title" : "Apellido Mat. Adm."
		},  {
			"data" : 'cargo',
			"title" : "Cargo"
		}, {
			"data" : 'fechaInicio',
			"title" : "Fecha de inicio"
		}, {
			"data" : 'fechaFin',
			"title" : "Fecha Fin"
		},{
			"data" : null,
			"title" : 'Acción'
		} ]
	});
	$local.$tablaMantenimiento.find("thead").on('keyup', 'input', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

//	$local.$modalMantenimiento.PopupWindow({
//		title : "Mantenimiento de Area-Administrativo",
//		autoOpen : false,
//		modal : false,
//		height : 400,
//		width : 626,
//	});
 
	$local.$aniadirMantenimento.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formMantenimiento);
		$local.$actualizarMantenimiento.addClass("hidden");
		$local.$registrarMantenimiento.removeClass("hidden");
		//$local.$modalMantenimiento.PopupWindow("open");
	});

	$local.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:not([disabled]):first").focus();
	});

	$local.$modalMantenimiento.on("close.popupwindow", function() {
		$local.idAreaAdministrativoSeleccionado = "";
	});
	$formMantenimiento.find("input").keypress(function(event) {
		if (event.which == 13) {
			if (!$local.$registrarMantenimiento.hasClass("hidden")) {
				$local.$registrarMantenimiento.trigger("click");
				return false;
			} else {
				if (!$local.$actualizarMantenimiento.hasClass("hidden")) {
					$local.$actualizarMantenimiento.trigger("click");
				}
				return false;
			}
		}
	});
	$local.$registrarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var areaAdministrativo = $formMantenimiento.serializeJSON();
		console.log(areaAdministrativo);
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "areaAdministrativo",
			data : JSON.stringify(areaAdministrativo),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$local.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(response) {
				
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				//var row = $local.tablaMantenimiento.row.add(areaAdministrativo).draw();
				//row.show().draw(false);
				$local.tablaMantenimiento.ajax.reload();
				//$(row.node()).animateHighlight();
				//$local.$modalMantenimiento.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarMantenimiento.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		
	});
	
	$local.$tablaMantenimiento.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formMantenimiento);
		$local.$filaSeleccionada = $(this).parents("tr");
		var areaAdministrativo = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$local.idAreaAdministrativoSeleccionado = areaAdministrativo.idAreaAdministrativo;
		$funcionUtil.llenarFormulario(areaAdministrativo, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		//$local.$modalMantenimiento.PopupWindow("open");
	});
	
	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var areaAdministrativo = $formMantenimiento.serializeJSON();
		console.log(areaAdministrativo); 
		areaAdministrativo.idAreaAdministrativo = $local.idAreaAdministrativoSeleccionado;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "areaAdministrativo",
			data : JSON.stringify(areaAdministrativo),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$local.$actualizarMantenimiento.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formMantenimiento);
				}
			},
			success : function(response) {
				
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
				console.log(areaAdministrativo);
				var row = $local.tablaMantenimiento.row.add(areaAdministrativo).draw();
				//row.show().draw(false);
				$local.tablaMantenimiento.ajax.reload();
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
	$local.$tablaMantenimiento.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var areaAdministrativo = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la Area Administrativo  <b>'" + areaAdministrativo.idAreaAdministrativo + "'<b/>?",
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
									url : $variableUtil.root + "areaAdministrativo",
									data : JSON.stringify(areaAdministrativo),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("La Area Administrativo <b>" + areaAdministrativo.idAreaAdministrativo + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
										$funcionUtil.notificarException(mensaje, "fa-warning", "Aviso", "warning");
										break;
									}
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


});




