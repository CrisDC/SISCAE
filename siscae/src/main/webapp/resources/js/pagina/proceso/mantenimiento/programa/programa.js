$(document).ready(function() {

	var $local = {
		$tablaMantenimiento : $("#tablaMantenimiento"),
		tablaMantenimiento : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$aniadirMantenimiento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$filaSeleccionada : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		programaSeleccionado : {},
		$grupos : $("#grupos"),
		$subModulos : $("#subModulos"),
		$nombresProcedimientos : $("#nombresProcedimientos"),
		$gruposFiltroParaTablaMantenimiento : $("#grupos-filtroParaTablaMantenimiento"),
		$subModulosFiltroParaTablaMantenimiento : $("#subModulos-filtroParaTablaMantenimiento"),
		arregloSiNo : [ "0", "1" ],
		filtrosSeleccionables : [],

	}

	$formMantenimiento = $("#formMantenimiento");

	$.fn.dataTable.ext.errMode = 'none';

	$funcionUtil.crearSelect2($local.$grupos, "Seleccione un Grupo");
	$funcionUtil.crearSelect2($local.$subModulos, "Seleccione un Sub Módulo");

	$local.$tablaMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$local.tablaMantenimiento.clear().draw();
			break;
		}
	});

	$local.tablaMantenimiento = $local.$tablaMantenimiento.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "proceso/mantenimiento/programa?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Programas registrados"
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$local.filtrosSeleccionables["0"] = $local.$gruposFiltroParaTablaMantenimiento.html();
			$local.filtrosSeleccionables["2"] = $local.$subModulosFiltroParaTablaMantenimiento.html();
			$local.filtrosSeleccionables["7"] = $local.arregloSiNo;
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaMantenimiento, $local.filtrosSeleccionables);

		},
		"ordering": false,
		"order": [[ 0, 'asc' ], [ 5, 'asc' ]],
		"columnDefs" : [ {
			"targets" : [ 1, 3, 4, 5, 6, 8 ],
			"className" : "filtrable",
		}, {
			"targets" : 7,
			"className" : "all seleccionable data-no-definida",
			"render" : function(data, type, row) {
				return $funcionUtil.insertarEtiquetaSiNo(row.procesaSabado);
			}
		}, {
			"targets" : 9,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [ {
			"className" : "all seleccionable select2 insertable-opciones-html",
			"data" : function(row) {
				return row.ordenEjecucionGrupo + " - " + $funcionUtil.unirCodigoDescripcion(row.codigoGrupo, row.descripcionGrupo);
			},
			"title" : "Grupo"
		}, {
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoPrograma, row.descripcion);
			},
			"title" : "Programa"
		}, {
			"className" : "all seleccionable select2 insertable-opciones-html",
			"data" : function(row) {
				return $funcionUtil.unirCodigoDescripcion(row.codigoSubModulo, row.descripcionSubModulo);
			},
			"title" : "Sub Módulo"
		}, {
			"data" : 'procedimiento',
			"title" : "Procedimiento"
		}, {
			"data" : 'archivo',
			"title" : "Archivo"
		}, {
			"data" : 'ordenEjecucion',
			"title" : "Orden de Ejecución"
		}, {
			"data" : 'periodoEjecucion',
			"title" : "Periodo de Ejecución"
		}, {
			"data" : null,
			"title" : "Procesa Sábado"
		}, {
			"data" : 'longitud',
			"title" : "Longitud"
		}, {
			"data" : null,
			"title" : 'Acción'
		} ]
	});
	
	$local.$tablaMantenimiento.find("thead").on('keyup', 'input.filtrable', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$local.$modalMantenimiento.PopupWindow({
		title : "Programa",
		autoOpen : false,
		modal : false,
		height : 600,
		width : 626,
	});

	$local.$aniadirMantenimiento.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formMantenimiento);
		$local.$actualizarMantenimiento.addClass("hidden");
		$local.$registrarMantenimiento.removeClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
	});

	$local.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:not([disabled]):first").focus();
	});

	$local.$modalMantenimiento.on("close.popupwindow", function() {
		$local.programaSeleccionado = {};
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
		var programa = $formMantenimiento.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "proceso/mantenimiento/programa",
			data : JSON.stringify(programa),
			beforeSend : function(xhr) {
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
			success : function(programas) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
				var row = $local.tablaMantenimiento.row.add(programas[0]).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalMantenimiento.PopupWindow("close");
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
		$local.programaSeleccionado = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$funcionUtil.llenarFormulario($local.programaSeleccionado, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		$local.$modalMantenimiento.PopupWindow("open");
	});

	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var programa = $formMantenimiento.serializeJSON();
		programa.codigoGrupo = $local.programaSeleccionado.codigoGrupo;
		programa.codigoPrograma = $local.programaSeleccionado.codigoPrograma;
		programa.codigoSubModulo = $local.programaSeleccionado.codigoSubModulo;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "proceso/mantenimiento/programa",
			data : JSON.stringify(programa),
			beforeSend : function(xhr) {
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
			success : function(programas) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				var programa = programas[0];
				var row = $local.tablaMantenimiento.row($local.$filaSeleccionada).data(programa).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalMantenimiento.PopupWindow("close");
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
		var programa = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar el programa <b>" + programa.codigoPrograma + "-" + programa.descripcion + "</b>? ",
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
									url : $variableUtil.root + "proceso/mantenimiento/programa",
									data : JSON.stringify(programa),
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
										var mensaje = $funcionUtil.obtenerMensajeError("El Programa", xhr.responseJSON, $variableUtil.accionEliminado);
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