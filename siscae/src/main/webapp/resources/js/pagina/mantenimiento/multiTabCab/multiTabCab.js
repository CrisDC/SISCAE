$(document).ready(function() {
	var $max_tamano_error = 200;
	var $local = {
		$tablaMantenimiento : $("#tablaMantenimiento"),
		tablaMantenimiento : "",
		$modalMantenimiento : $("#modalMantenimiento"),
		$aniadirMantenimento : $("#aniadirMantenimiento"),
		$registrarMantenimiento : $("#registrarMantenimiento"),
		$filaSeleccionada : "",
		$actualizarMantenimiento : $("#actualizarMantenimiento"),
		id_tablaSeleccionado : ""
		};

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
			"url" : $variableUtil.root + "multiTabCab?accion=buscarTodos",
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
			"targets" : 2,
			"className" : "all dt-center",
			"width" : "10%",
			"defaultContent" : $variableUtil.botonActualizarNuevo + " " + $variableUtil.botonEliminarNuevo + " " + $variableUtil.botonAniadirDetalle
		} ],
		"columns" : [ {

			"data" : 'nombre',
			"title" : "Nombre de la tabla"
		},{

			"data" : 'descripcion',
			"title" : "Descripción"
		}, {
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
//		title : "Mantenimiento de Multitabla",
//		autoOpen : false,
//		modal : false,
//		height : 280,
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
		$local.id_tablaSeleccionado = "";
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
		var multiTabCab = $formMantenimiento.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "multiTabCab",
			data : JSON.stringify(multiTabCab),
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
				//var row = $local.tablaMantenimiento.row.add({
				//"idTabla" : multiTabCab.idTabla,
				//	"descripcion" : multiTabCab.descripcion
				//}).draw();
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

	
	
	$local.$tablaMantenimiento.children("tbody").on("click", ".aniadir-detalle", function() {
		if ($local.permisoDetalle == "false") {
			return;
		}
		$local.$filaSeleccionada = $(this).parents("tr");
		var multiTabCab = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$(document).trigger("abrirDetalleMantenimiento", [ multiTabCab.idTabla, $local.tablaMantenimiento ]);
	});

	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var multiTabCab = $formMantenimiento.serializeJSON();
		multiTabCab.idTabla = $local.id_tablaSeleccionado;
		console.log(multiTabCab);
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "multiTabCab",
			data : JSON.stringify(multiTabCab),
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
				//var row = $local.tablaMantenimiento.row.add({
				//	"idTabla" : $local.id_tablaSeleccionado,
				//	"descripcion" : multiTabCab.descripcion
				//}).draw();
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
		var multiTabCab = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la tabla <b>'" + multiTabCab.idTabla + " - " + multiTabCab.descripcion + "'<b/>?",
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
									url : $variableUtil.root + "multiTabCab",
									data : JSON.stringify(multiTabCab),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									},
									statusCode : {
										400 : function(response) {
											confirmar.close();
											response.responseText.length > $max_tamano_error ? 
													swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
													swal("Error", response.responseText, "warning");
										},
										500 : function(response) {
											confirmar.close();
											response.responseText.length > $max_tamano_error ? 
													swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
													swal("Error", response.responseText, "warning");
											
										}
									},
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();

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
	
	$local.$tablaMantenimiento.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formMantenimiento);
		$local.$filaSeleccionada = $(this).parents("tr");
		var recurso = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$local.idRecursoSeleccionado = recurso.idRecurso;
		$funcionUtil.llenarFormulario(recurso, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		console.log(recurso);
		$local.id_tablaSeleccionado = recurso.idTabla;
		//$local.$modalMantenimiento.PopupWindow("open");
	});
	
	
	$local.$tablaMantenimiento.children("tbody").on("click", ".detalle", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var multiTabCab = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		var criterio = {idDetalle   :  multiTabCab.idTabla};
		
		console.log(criterio);
		
		location.href= $variableUtil.root + "multiTabDet?id="+multiTabCab.idTabla;
		/**
		$.ajax({
			type : "GET",
			url : $variableUtil.root + "multiTabDet?accion=detalle",
			data : criterio,
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
			success : function(response) {
				location.href= $variableUtil.root + response;//"multiTabDet/multiTabCab/"+multiTabCab.idTabla;
				console.log("aaaaa");
				//$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarMantenimiento.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
				
				
			}
		});	
		**/
	});
	
	
	
	
	
	
	
	
	
});










