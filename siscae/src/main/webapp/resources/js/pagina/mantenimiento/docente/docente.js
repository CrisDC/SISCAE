
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
		$selectEstadoTabla: $("#idEstadoTabla"),
		$selectPersona: $("#idPersona"),
	}
	$funcionUtil.crearSelect2($local.$selectEstadoTabla,"Seleccione el estado");

		//Inicializa el selector de persona
	$local.$selectPersona.select2({
	  "width" : "100%",
	  ajax: {
	    url: $variableUtil.root+'persona',
	    dataType: 'json',
	    type: 'GET',
	    data: function (params) {
	    	var query = {
	          search: params.term,
	        }
	    	return query;
	    },
		processResults: function (data,params) {
			return {
	            results: $.map(data, function (item) {
	                return {
	                    text: item.numDocumento + " - " +item.nombre+" "+item.appPaterno+" "+item.appMaterno,
	                    id: item.idPersona
	                }
	            })
	        };
	    },
	    beforeSend : function(xhr) {
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		}
	  },
	  minimumInputLength: 1,
	  placeholder : "Ingrese Documento o Nombres",
	  language : {
		noResults : function() {
			return "No se encontró resultados.";
		},
		searching: function() {
	      return "Buscando..";
	    },
	    inputTooShort: function () {
          return "Por favor ingrese 1 o más carácteres.";
        }
	  },
	  "width" : "100%",
	  "dropdownAutoWidth" : true	  
	});
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
			"url" : $variableUtil.root + "docente?accion=buscarTodos",
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
			"targets" : [ 0, 1, 2, 3, 4],
			"className" : "all filtrable",
		}, {
			"targets" : 5,
			"className" : "all dt-center",
			"defaultContent" : $variableUtil.botonActualizarNuevo + " " + $variableUtil.botonEliminarNuevo
		} ],
		"columns" : [
		{
			"data" : 'nombre',
			"title" : "Nombre"
		},{
			"data" : 'appPaterno',
			"title" : "Apellido Paterno"
		},{
			"data" : 'appMaterno',
			"title" : "Apellido Materno"
		},{
			"data" : 'numDocumento',
			"title" : "Número de documento"
		},{
			"data" : 'estado',
			"title" : "Estado"
		},{
			"data" : null,
			"title" : 'Acción'
		}]
	});
	$local.$tablaMantenimiento.find("thead").on('keyup', 'input', function() {
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tablaMantenimiento.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tablaMantenimiento.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});

//	$local.$modalMantenimiento.PopupWindow({
//		title : "Mantenimiento de Docente",
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
		$local.$selectPersona.html("");
		$local.$selectPersona.prop('disabled', false);
	});

	$local.$modalMantenimiento.on("open.popupwindow", function() {
		$formMantenimiento.find("input:not([disabled]):first").focus();
	});

	$local.$modalMantenimiento.on("close.popupwindow", function() {
		$local.idDocenteSeleccionado = "";
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
		var docente = $formMantenimiento.serializeJSON();
		docente.idDocente = $local.$selectPersona.find('option:selected').val();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "docente",
			data : JSON.stringify(docente),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$local.$registrarMantenimiento.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					response.responseText.length > $max_tamano_error ? 
							swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
							swal("Error", response.responseText, "warning");
				},
				500 : function(response) {
					response.responseText.length > $max_tamano_error ? 
							swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
							swal("Error", response.responseText, "warning");
				}
			},
/*ya esta*/
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				//var row = $local.tablaMantenimiento.row.add(docente).draw();
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
	$local.$actualizarMantenimiento.on("click", function() {
		if (!$formMantenimiento.valid()) {
			return;
		}
		var docente = $formMantenimiento.serializeJSON();
		docente.idDocente =$local.$selectPersona.find('option:selected').val();
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "docente",
			data : JSON.stringify(docente),
			beforeSend : function(xhr) {
				$('#modalMantenimiento').modal('hide');
				$local.$actualizarMantenimiento.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					response.responseText.length > $max_tamano_error ? 
							swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
							swal("Error", response.responseText, "warning");
				},
				500 : function(response) {
					response.responseText.length > $max_tamano_error ? 
							swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
							swal("Error", response.responseText, "warning");
				}
			},
			success : function(response) {
				$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
				$local.tablaMantenimiento.row($local.$filaSeleccionada).remove().draw(false);
				//var row = $local.tablaMantenimiento.row.add(docente).draw();
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
		var docente = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar al docente <b>'" + docente.nombre+ " "+docente.appPaterno+" "+docente.appMaterno +"<b/>?",
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
									url : $variableUtil.root + "docente",
									data : JSON.stringify(docente),
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
		var docente = $local.tablaMantenimiento.row($local.$filaSeleccionada).data();
		$funcionUtil.llenarFormulario(docente, $formMantenimiento);
		$local.$actualizarMantenimiento.removeClass("hidden");
		$local.$registrarMantenimiento.addClass("hidden");
		//$local.$modalMantenimiento.PopupWindow("open");
		$local.$selectPersona.html("");
		var nuevaOpcion = new Option(docente.numDocumento + " - " + docente.nombre+" "+docente.appPaterno+" "+docente.appMaterno, docente.idDocente, false, false);
		$local.$selectPersona.append(nuevaOpcion).trigger('change');
		
		$local.$selectPersona.prop('disabled', true);
		});
	
	
});