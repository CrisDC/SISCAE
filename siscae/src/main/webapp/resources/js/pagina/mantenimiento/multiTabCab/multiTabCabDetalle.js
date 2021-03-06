$(document).ready(function() {
	var $max_tamano_error = 200;
	var $localDetalle = {
		$tablaDetalleMantenimiento : $("#tablaDetalleMantenimiento"),
		tablaDetalleMantenimiento : "",
		tablaMantenimiento : "",
		$modalDetalleMantenimiento : $("#modalDetalleMantenimiento"),
		$aniadirDetalleMantenimiento : $("#aniadirDetalleMantenimiento"),
		$registrarDetalleMantenimiento : $("#registrarDetalleMantenimiento"),
		$filaDetalleSeleccionada : "",
		$actualizarDetalleMantenimiento : $("#actualizarDetalleMantenimiento"),
		
		$filtroParaDetalleTablaMantenimiento : $("#filtroParaDetalleTablaMantenimiento"),
		
		id_tablaSeleccionado : "" ,
		id_itemSeleccionado: ""
	};

	$formDetalleMantenimiento = $("#formDetalleMantenimiento");
	
	$.fn.dataTable.ext.errMode = 'none';

	$localDetalle.$tablaDetalleMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$localDetalle.tablaDetalleMantenimiento.clear().draw();
			break;
		}
	});
	
	$localDetalle.tablaDetalleMantenimiento = $localDetalle.$tablaDetalleMantenimiento.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "multiTabDet?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay tablas registradas."
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localDetalle.$tablaDetalleMantenimiento);
		},
		"columnDefs" : [ {
			"targets" : [0, 1],
			"className" : "filtrable",
			"width" : "5%",
		}, {
			"targets" : [0, 1],
			"className" : "all  filtrable",
		}, {
			"targets" : 2,
			"className" : "all dt-center",
			"width" : "10%",
			"defaultContent" : $variableUtil.botonActualizar + " " + $variableUtil.botonEliminar
		} ],
		"columns" : [ {
			"data" : 'descripcion',
			"title" : "Descripción"
		}, {
			"data" : 'descripcionCorta',
			"title" : "Abreviatura"
		}, {
			"data" : null,
			"title" : 'Acción'
		} ]
	});
	
	$localDetalle.$tablaDetalleMantenimiento.wrap("<div class='table-responsive'></div>");

	$localDetalle.$tablaDetalleMantenimiento.find("thead").on('keyup', 'input', function() {
		$localDetalle.tablaDetalleMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localDetalle.$tablaDetalleMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localDetalle.tablaDetalleMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

	$localDetalle.$modalDetalleMantenimiento.PopupWindow({
		title : "Mantenimiento de Multitabla",
		autoOpen : false,
		modal : false,
		height : 500,
		width : 900,
	});

	$localDetalle.$aniadirDetalleMantenimiento.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formDetalleMantenimiento);
		$localDetalle.$actualizarDetalleMantenimiento.addClass("hidden");
		$localDetalle.$registrarDetalleMantenimiento.removeClass("hidden");
		$localDetalle.$modalDetalleMantenimiento.PopupWindow("open");
	});

	$localDetalle.$modalDetalleMantenimiento.on("open.popupwindow", function() {
		$formDetalleMantenimiento.find("input:first").focus();
	});

	$localDetalle.$modalDetalleMantenimiento.on("close.popupwindow", function() {
		$localDetalle.id_tablaSeleccionado = "";
	});

	$formDetalleMantenimiento.find("input").keypress(function(event) {
		if (event.which == 13) {
			if (!$localDetalle.$registrarDetalleMantenimiento.hasClass("hidden")) {
				$localDetalle.$registrarDetalleMantenimiento.trigger("click");
				return false;
			} else {
				if (!$localDetalle.$actualizarDetalleMantenimiento.hasClass("hidden")) {
					$localDetalle.$actualizarDetalleMantenimiento.trigger("click");
				}
				return false;
			}
		}
	});

	$localDetalle.$registrarDetalleMantenimiento.on("click", function() {
		if (!$formDetalleMantenimiento.valid()) {
			return;
		}
		var multiTabDet = $formDetalleMantenimiento.serializeJSON();
		multiTabDet.idTabla = $localDetalle.id_tablaSeleccionado;
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "multiTabDet",
			data : JSON.stringify(multiTabDet),
			beforeSend : function(xhr) {
				$localDetalle.$registrarDetalleMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formDetalleMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formDetalleMantenimiento);
				}
			},
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				var row = $localDetalle.tablaDetalleMantenimiento.row.add({
					"idItem" : multiTabDet.idItem,
					"descripcion" : multiTabDet.descripcion,
					"descripcionCorta" : multiTabDet.descripcionCorta
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$funcionUtil.prepararFormularioRegistro($formDetalleMantenimiento);
			},
			error : function(response) {
			},
			complete : function(response) {
				$localDetalle.$registrarDetalleMantenimiento.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$localDetalle.$tablaDetalleMantenimiento.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formDetalleMantenimiento);
		$localDetalle.$filaDetalleSeleccionada = $(this).parents("tr");
		var multiTabDet = $localDetalle.tablaDetalleMantenimiento.row($localDetalle.$filaDetalleSeleccionada).data();
		$localDetalle.id_itemSeleccionado = multiTabDet.idItem;
		$funcionUtil.llenarFormulario(multiTabDet, $formDetalleMantenimiento);
		$localDetalle.$actualizarDetalleMantenimiento.removeClass("hidden");
		$localDetalle.$registrarDetalleMantenimiento.addClass("hidden");
		$localDetalle.$modalDetalleMantenimiento.PopupWindow("open");
	});

	$localDetalle.$actualizarDetalleMantenimiento.on("click", function() {
		if (!$formDetalleMantenimiento.valid()) {
			return;
		}
		var multiTabDet = $formDetalleMantenimiento.serializeJSON();

		multiTabDet.idTabla = $localDetalle.id_tablaSeleccionado;
		multiTabDet.idItem = $localDetalle.id_itemSeleccionado;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "multiTabDet",
			data : JSON.stringify(multiTabDet),
			beforeSend : function(xhr) {
				$localDetalle.$actualizarDetalleMantenimiento.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formDetalleMantenimiento);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formDetalleMantenimiento);
				}
			},
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				$localDetalle.tablaDetalleMantenimiento.row($localDetalle.$filaDetalleSeleccionada).remove().draw(false);
				var row = $localDetalle.tablaDetalleMantenimiento.row.add({
					"idTabla": multiTabDet.idTabla,
					"idItem" : multiTabDet.idItem,
					"descripcion" : multiTabDet.descripcion,
					"descripcionCorta" : multiTabDet.descripcionCorta
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
			},
			error : function(response) {
				console.log(response);
			},
			complete : function(response) {
				$localDetalle.$actualizarDetalleMantenimiento.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$localDetalle.$tablaDetalleMantenimiento.children("tbody").on("click", ".eliminar", function() {
		$localDetalle.$filaDetalleSeleccionada = $(this).parents("tr");
		var multiTabDet = $localDetalle.tablaDetalleMantenimiento.row($localDetalle.$filaDetalleSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la tabla <b>'" + multiTabDet.idItem + " - " + multiTabDet.descripcionItem + "'<b/>?",
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
									url : $variableUtil.root + "multiTabDet",
									data : JSON.stringify(multiTabDet),
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
									$localDetalle.tablaDetalleMantenimiento.row($localDetalle.$filaDetalleSeleccionada).remove().draw(false);
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

	$(document).on( "abrirDetalleMantenimiento", function(event, id_tabla, tablaTablas) {
	    $localDetalle.id_tablaSeleccionado = id_tabla;
	    $localDetalle.tablaMantenimiento = tablaTablas;
	    $.ajax({
	    	type : "GET",
	    	url: $variableUtil.root + "multiTabDet/multiTabCab/" +$localDetalle.id_tablaSeleccionado,
	    	beforeSend: function(){
	    		$localDetalle.tablaDetalleMantenimiento.clear().draw();
	    	},
	    	success : function(multiTablaDetalles){
	    		if(multiTablaDetalles.length == 0){
	    			return;
	    		}
	    		$localDetalle.tablaDetalleMantenimiento.rows.add(multiTablaDetalles).draw();
	    	}
	    });
	    $tablaFuncion.trasladarHaciaSelect($localDetalle.$filtroParaDetalleTablaMantenimiento, $localDetalle.tablaMantenimiento.rows().data(), "idTabla", "descripcion");
	    $localDetalle.$filtroParaDetalleTablaMantenimiento.val($localDetalle.id_tablaSeleccionado).trigger('change.select2');
	    $localDetalle.$modalDetalleMantenimiento.removeClass("hidden");
	    $localDetalle.$modalDetalleMantenimiento.PopupWindow("open");
	});

	$localDetalle.$filtroParaDetalleTablaMantenimiento.on("change", function() {
		$localDetalle.id_tablaSeleccionado = $(this).val();
		$.ajax({
	    	type : "GET",
	    	url: $variableUtil.root + "multiTabDet/multiTabCab/" +$localDetalle.id_tablaSeleccionado,
	    	beforeSend: function(){
	    		$localDetalle.tablaDetalleMantenimiento.clear().draw();
	    	},
	    	success : function(multiTablaDetalles){
	    		if(multiTablaDetalles.length == 0){
	    			return;
	    		}
	    		$localDetalle.tablaDetalleMantenimiento.rows.add(multiTablaDetalles).draw();
	    	}
	    });
	})
	
});