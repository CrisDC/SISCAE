$(document).ready(function() {
	
	var csrf = $('meta[name=_csrf]').attr("content");
	
	var $local = {
			$modalCategoriaRecurso : $("#modalCategoriaRecurso"),
			$registrarCategoriaRecurso : $("#registrarCategoriaRecurso"),
			$actualizarCategoriaRecursoModal : $("#actualizarCategoriaRecursoModal"),
			$tablaCategoriaRecurso : $("#tablaCategoriaRecurso"),
			tablaCategoriaRecurso : "",
			codigo_perfilSeleccionado : "",
			$filaSeleccionada : "",		
		};
	
//	$(".bootstrap-select").css({'width': 200});
	$formCategoriaRecurso = $("#formCategoriaRecurso");
	$formCategoriaRecursoModal = $("#formCategoriaRecursoModal");
	
	$local.tablaCategoriaRecurso = $local.$tablaCategoriaRecurso.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "categoriaRecurso?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay Categorias de Recursos registrados"
		},
		"initComplete": function(){
			$local.$tablaCategoriaRecurso.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}],
		"columns" : [
				{
					"data" : 'categoria',
					"title" : 'Categoría'
				},
				{
					"data" : 'accionCategoria',
					"title" : 'Permisos'
				}]
	});
	
	$local.$modalCategoriaRecurso.PopupWindow({
		title : "Mantenimiento Categoría de Recurso",
		autoOpen : false,
		modal : false,
		height : 280,
		width : 626,
	});
	
	$('#seleccionar').on('change',function() {
        console.log($(this).val());
        var opc = "";
        opc = opc+$('#seleccionar').val()+",";
        console.log("acumulado : "+opc);
        var cadena = opc.substring(0, opc.length - 1);
        console.log("cadena : "+cadena);
        $("#codigo").val(cadena);
    });
	
	$local.$registrarCategoriaRecurso.on("click", function() {
		if (!$formCategoriaRecurso.valid()) {
			return;
		}
		var categoriaRecurso = $formCategoriaRecurso.serializeJSON();
		$.ajax({
			type : "POST",
			url : $variableUtil.root + "categoriaRecurso",
			data : JSON.stringify(categoriaRecurso),
			beforeSend : function(xhr) {
				$local.$registrarCategoriaRecurso.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formCategoriaRecurso);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formCategoriaRecurso);
				}
			},
			success : function(categoriaRecursos) {
				$funcionUtil.notificarException($variableUtil.registroExitoso, "fa-check", "Aviso", "success");
//				var categoriaRecurso = categoriaRecursos[0];
//				var row = $local.tablaCategoriaRecurso.row.add({
//					"idCategoria" : categoriaRecurso.idCategoria,
//					"categoria" : categoriaRecurso.categoria
//				}).draw();
//				row.show().draw(false);
//				$(row.node()).animateHighlight();

			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$registrarCategoriaRecurso.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
		$formCategoriaRecurso[0].reset();
	});
	
	$local.$tablaCategoriaRecurso.children("tbody").on("click", ".actualizar", function() {
		$funcionUtil.prepararFormularioActualizacion($formCategoriaRecurso);
		$local.$filaSeleccionada = $(this).parents("tr");
		var categoriaRecurso = $local.tablaCategoriaRecurso.row($local.$filaSeleccionada).data();
		$local.codigo_perfilSeleccionado = categoriaRecurso.idCategoriaRecurso;
		$funcionUtil.llenarFormulario(categoriaRecurso, $formCategoriaRecursoModal);
		$local.$actualizarCategoriaRecursoModal.removeClass("hidden");
		$local.$modalCategoriaRecurso.PopupWindow("open");
	});
	
	$local.$actualizarCategoriaRecursoModal.on("click", function() {
		if (!$formCategoriaRecursoModal.valid()) {
			return;
		}
		var categoriaRecurso = $formCategoriaRecursoModal.serializeJSON();
		$.ajax({
			type : "PUT",
			url : $variableUtil.root + "categoriaRecurso",
			data : JSON.stringify(categoriaRecurso),
			beforeSend : function(xhr) {
				$local.$actualizarCategoriaRecursoModal.attr("disabled", true).find("i").removeClass("fa-pencil-square").addClass("fa-spinner fa-pulse fa-fw");
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					$funcionUtil.limpiarMensajesDeError($formCategoriaRecursoModal);
					$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formCategoriaRecursoModal);
				}
			},
			success : function(categoriaRecursos) {
				$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
				$local.tablaCategoriaRecurso.row($local.$filaSeleccionada).remove().draw(false);
				var categoriaRecurso = categoriaRecursos[0];
				var row = $local.tablaCategoriaRecurso.row.add({
					"idCategoria" : categoriaRecurso.idCategoria,
					"categoria" : categoriaRecurso.categoria
				}).draw();
				row.show().draw(false);
				$(row.node()).animateHighlight();
				$local.$modalCategoriaRecurso.PopupWindow("close");
			},
			error : function(response) {
			},
			complete : function(response) {
				$local.$actualizarCategoriaRecursoModal.attr("disabled", false).find("i").addClass("fa-pencil-square").removeClass("fa-spinner fa-pulse fa-fw");
			}
		});
	});
	
	$local.$tablaCategoriaRecurso.children("tbody").on("click", ".eliminar", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var categoriaRecurso = $local.tablaCategoriaRecurso.row($local.$filaSeleccionada).data();
		$.confirm({
			icon : "fa fa-info-circle",
			title : "Aviso",
			content : "¿Desea eliminar la Categoria <b>'" + categoriaRecurso.idCategoria + " - " + categoriaRecurso.categoria + "'<b/>?",
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
									url : $variableUtil.root + "categoriaRecurso",
									data : JSON.stringify(categoriaRecurso),
									autoclose : true,
									beforeSend : function(xhr) {
										xhr.setRequestHeader('Content-Type', 'application/json');
										xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
									}
								}).done(function(response) {
									$funcionUtil.notificarException(response, "fa-check", "Aviso", "success");
									$local.tablaCategoriaRecurso.row($local.$filaSeleccionada).remove().draw(false);
									confirmar.close();
								}).fail(function(xhr) {
									confirmar.close();
									switch (xhr.status) {
									case 400:
										$funcionUtil.notificarException($funcionUtil.obtenerMensajeErrorEnCadena(xhr.responseJSON), "fa-warning", "Aviso", "warning");
										break;
									case 409:
										var mensaje = $funcionUtil.obtenerMensajeError("La Categoria <b>" + categoriaRecurso.idCategoria + " - " + categoriaRecurso.categoria + "</b>", xhr.responseJSON, $variableUtil.accionEliminado);
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