$(document).ready(function() { 
	
    $.get = function(key)   {  
        key = key.replace(/[\[]/, '\\[');  
        key = key.replace(/[\]]/, '\\]');  
        var pattern = "[\\?&]" + key + "=([^&#]*)";  
        var regex = new RegExp(pattern);  
        var url = unescape(window.location.href);  
        var results = regex.exec(url);  
        if (results === null) {  
            return null;  
        } else {  
            return results[1];  
        }  
    }  
	
	var $localDetalle = {
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

	$localDetalle.$tablaMantenimiento.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
		case 500:
			$localDetalle.tablaMantenimiento.clear().draw();
			break;
		}
	});
	
	
	var id = $.get('id');
	
	console.log($variableUtil.root + "multiTabDet/multiTabCab/"+id);
	$localDetalle.tablaMantenimiento = $localDetalle.$tablaMantenimiento.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "multiTabDet/multiTabCab/"+id,
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay tablas registradas."
		},
		"initComplete" : function() {
			$local.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");
			//$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $localDetalle.$tablaDetalleMantenimiento);
		},
		"columnDefs" : [ {
			"targets" : [0, 1],
			"className" : "all filtrable",
			"width" : "5%",
		}, {
			"targets" : 2,
			"className" : "all dt-center",
			"width" : "10%",
			"defaultContent" : $variableUtil.botonActualizarNuevo + " " + $variableUtil.botonEliminarNuevo
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
	
	console.log($localDetalle.tablaMantenimiento);
	
	//$localDetalle.$tablaMantenimiento.wrap("<div class='table-responsive'></div>");

	$localDetalle.$tablaMantenimiento.find("thead").on('keyup', 'input', function() {
		$localDetalle.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$localDetalle.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$localDetalle.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

//	$localDetalle.$modalMantenimiento.PopupWindow({
//		title : "Mantenimiento de Multitabla",
//		autoOpen : false,
//		modal : false,
//		height : 500,
//		width : 900,
//	});

    $('#aniadirMantenimiento').on("click", function() {
    	$funcionUtil.prepararFormularioRegistro($formMantenimiento);
		$localDetalle.$actualizarMantenimiento.addClass("hidden");
		$localDetalle.$registrarMantenimiento.removeClass("hidden");
		$('#registrarMantenimiento').removeClass("hidden");
    });
    /*
	$localDetalle.$aniadirMantenimiento.on("click", function() {
		$funcionUtil.prepararFormularioRegistro($formMantenimiento);
		console.log("fgfgfg");
		$localDetalle.$actualizarMantenimiento.addClass("hidden");
		$localDetalle.$registrarMantenimiento.removeClass("hidden");
		//$localDetalle.$modalDetalleMantenimiento.PopupWindow("open");
	});
*/
	$localDetalle.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:first").focus();
	});

	$localDetalle.$modalMantenimiento.on("close.popupwindow", function() {
		$localDetalle.id_tablaSeleccionado = "";
	});

	$formMantenimiento.find("input").keypress(function(event) {
		if (event.which == 13) {
			if (!$localDetalle.$registrarMantenimiento.hasClass("hidden")) {
				$localDetalle.$registrarMantenimiento.trigger("click");
				return false;
			} else {
				if (!$localDetalle.$actualizarMantenimiento.hasClass("hidden")) {
					$localDetalle.$actualizarMantenimiento.trigger("click");
				}
				return false;
			}
		}
	});
    
	
	$('#registrarMantenimiento').on("click",function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var multiTabDet = $formMantenimiento.serializeJSON();
		
		multiTabDet.idTabla = id;
		console.log(multiTabDet);
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "multiTabDet",
			data : JSON.stringify(multiTabDet),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$localDetalle.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
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
				/*var row = $localDetalle.tablaMantenimiento.row.add({
					"idItem" : multiTabDet.idItem,
					"descripcion" : multiTabDet.descripcion,
					"descripcionCorta" : multiTabDet.descripcionCorta
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();*/
				//$funcionUtil.prepararFormularioRegistro($formMantenimiento);
				$localDetalle.tablaMantenimiento.ajax.reload();
			},
			error : function(response) {
			},
			complete : function(response) {
				$localDetalle.$registrarMantenimiento.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	$localDetalle.$registrarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var multiTabDet = $formMantenimiento.serializeJSON();
		multiTabDet.idTabla = $localDetalle.id_tablaSeleccionado;
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "multiTabDet",
			data : JSON.stringify(multiTabDet),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$localDetalle.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
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
				/*var row = $localDetalle.tablaMantenimiento.row.add({
					"idItem" : multiTabDet.idItem,
					"descripcion" : multiTabDet.descripcion,
					"descripcionCorta" : multiTabDet.descripcionCorta
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();*/
				//$funcionUtil.prepararFormularioRegistro($formMantenimiento);
				$localDetalle.tablaMantenimiento.ajax.reload();
			},
			error : function(response) {
			},
			complete : function(response) {
				$localDetalle.$registrarMantenimiento.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$localDetalle.$tablaMantenimiento.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formMantenimiento);
		$localDetalle.$filaSeleccionada = $(this).parents("tr");
		var multiTabDet = $localDetalle.tablaMantenimiento.row($localDetalle.$filaSeleccionada).data();
		$localDetalle.id_itemSeleccionado = multiTabDet.idItem;
		$funcionUtil.llenarFormulario(multiTabDet, $formMantenimiento);
		$localDetalle.$actualizarMantenimiento.removeClass("hidden");
		$localDetalle.$registrarMantenimiento.addClass("hidden");
		//$localDetalle.$modalDetalleMantenimiento.PopupWindow("open");
	});

	$localDetalle.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var multiTabDet = $formMantenimiento.serializeJSON();

		multiTabDet.idTabla = id;
		multiTabDet.idItem = $localDetalle.id_itemSeleccionado;
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "multiTabDet",
			data : JSON.stringify(multiTabDet),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$localDetalle.$actualizarMantenimiento.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
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
				/*$localDetalle.tablaMantenimiento.row($localDetalle.$filaSeleccionada).remove().draw(false);
				var row = $localDetalle.tablaMantenimiento.row.add({
					"idTabla": multiTabDet.idTabla,
					"idItem" : multiTabDet.idItem,
					"descripcion" : multiTabDet.descripcion,
					"descripcionCorta" : multiTabDet.descripcionCorta
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();*/
				$localDetalle.tablaMantenimiento.ajax.reload();
			},
			error : function(response) {
				console.log(response);
			},
			complete : function(response) {
				$localDetalle.$actualizarMantenimiento.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});

	$localDetalle.$tablaMantenimiento.children("tbody").on("click", ".eliminar", function() {
		$localDetalle.$filaSeleccionada = $(this).parents("tr");
		var multiTabDet = $localDetalle.tablaMantenimiento.row($localDetalle.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la tabla <b>'" + multiTabDet.idItem + " - " + multiTabDet.descripcion + "'<b/>?",
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
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$localDetalle.tablaMantenimiento.row($localDetalle.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("La tabla <b>" + multiTabDet.idTabla + " - " + multiTabDet.descripcion + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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

	$(document).on( "abrirDetalleMantenimiento", function(event, id_tabla, tablaTablas) {
	    $localDetalle.id_tablaSeleccionado = id_tabla;
	    $localDetalle.tablaMantenimiento = tablaTablas;
	    $.ajax({
	    	type : "GET",
	    	url: $variableUtil.root + "multiTabDet/multiTabCab/" +$localDetalle.id_tablaSeleccionado,
	    	beforeSend: function(){
	    		$localDetalle.tablaMantenimiento.clear().draw();
	    	},
	    	success : function(multiTablaDetalles){
	    		if(multiTablaDetalles.length == 0){
	    			return;
	    		}
	    		$localDetalle.tablaMantenimiento.rows.add(multiTablaDetalles).draw();
	    	}
	    });
	    $tablaFuncion.trasladarHaciaSelect($localDetalle.$filtroParaTablaMantenimiento, $localDetalle.tablaMantenimiento.rows().data(), "idTabla", "descripcion");
	    $localDetalle.$filtroParaTablaMantenimiento.val($localDetalle.id_tablaSeleccionado).trigger('change.select2');
	    $localDetalle.$modalMantenimiento.removeClass("hidden");
	    $localDetalle.$modalMantenimiento.PopupWindow("open");
	});

	$localDetalle.$filtroParaTablaMantenimiento.on("change", function() {
		$localDetalle.id_tablaSeleccionado = $(this).val();
		$.ajax({
	    	type : "GET",
	    	url: $variableUtil.root + "multiTabDet/multiTabCab/" +$localDetalle.id_tablaSeleccionado,
	    	beforeSend: function(){
	    		$localDetalle.tablaMantenimiento.clear().draw();
	    	},
	    	success : function(multiTablaDetalles){
	    		if(multiTablaDetalles.length == 0){
	    			return;
	    		}
	    		$localDetalle.tablaMantenimiento.rows.add(multiTablaDetalles).draw();
	    	}
	    });
	})
	
});