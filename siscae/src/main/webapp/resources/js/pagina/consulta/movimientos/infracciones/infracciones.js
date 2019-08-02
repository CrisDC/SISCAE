$(document).ready(function() {
	
	var $local = {
		$tblConsulta : $("#tblSancionados"),
		tblConsulta  : ""
	}
	/* ---------- Construcción de tabla ---------- */
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tblConsulta.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
			case 500:
				$local.tblConsulta.clear().draw();
				break;
		}
	});
	
	$local.tblConsulta = $local.$tblConsulta.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "infraccionDetalle?accion=buscarTodos",
			"dataSrc" : ""
		},
			"language" : {
				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			},
			"initComplete" : function() {
				$local.$tblConsulta.wrap("<div class='table-responsive'></div>");
				$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta);
			},
			"columnDefs" : [ {
				"targets" : [ 0, 1, 2, 3, 4, 5, 6, 7 ],
				"className" : "all filtrable",
			} , {
				"targets" : 8,
				"className" : "all dt-center",
				"defaultContent" : $variableUtil.botonActualizarNuevo + " " + $variableUtil.botonEliminarNuevo
			}  ],
			"columns" : [{
				"data" : 'numDocumento',
				"title" : "Num. documento"
			}, {
				"data" : 'appPaterno',
				"title" : "Ap. Paterno"
			}, {
				"data" : 'appMaterno',
				"title" : "Ap. Materno"
			}, {
				"data" : 'nombre',
				"title" : "Nombre"
			}, {
				"data" : 'tipoPersona',
				"title" : "Solicitante"
			}, {
				"data" : 'infraccion',
				"title" : "Detalle"
			}, {
				"data" : 'estado',
				"title" : "Estado"
			}, {
				"data" : 'fecha',
				"title" : "Fecha"
			} ,{
				"data" : null,
				"title" : 'Acción'
			}]
		});
		
	$local.$tblConsulta.find("thead").on('keyup', 'input', function() {
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	/* ------ fin Construcción de tablas ------------ */
	var $local = {
			$tblConsulta2 : $("#tblSancionados"),
			tblConsulta2  : ""
	}
	/* ---------- Construcción de tabla sancionado ---------- */
	$.fn.dataTable.ext.errMode = 'none';

	$local.$tblConsulta2.on('xhr.dt', function(e, settings, json, xhr) {
		switch (xhr.status) {
			case 500:
				$local.tblConsulta2.clear().draw();
				break;
		}
	});
	
	$local.tblConsulta2 = $local.$tblConsulta2.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "consultaSancionados?accion=buscarTodos",
			"dataSrc" : ""
		},
			"language" : {
				"url": "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
			},
			"initComplete" : function() {
				$local.$tblConsulta2.wrap("<div class='table-responsive'></div>");
				$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tblConsulta2);
			},
			"columnDefs" : [ {
				"targets" : [ 0, 1, 2, 3, 4, 5, 6 ],
				"className" : "all filtrable",
			} , {
				"targets" : 6,
				"className" : "all dt-center",
			}  ],
			"columns" : [{
				"data" : 'docIdentificador',
				"title" : "Num. documento"
			}, {
				"data" : 'appPaterno',
				"title" : "Ap. Paterno"
			}, {
				"data" : 'appMaterno',
				"title" : "Ap. Materno"
			}, {
				"data" : 'nombre',
				"title" : "Nombre"
			}, {
				"data" : 'fechaRegistro',
				"title" : "Fecha de Sanción"
			}, {
				"data" : 'tiempoRestante',
				"title" : "Tiempo restante"
			}, {
				"data" : 'tipoSolicitante',
				"title" : "Tipo de Solicitante"
			}]
		});
		
	$local.$tblConsulta2.find("thead").on('keyup', 'input', function() {
		$local.tblConsulta2.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblConsulta2.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblConsulta2.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	/* ------ Construcción de tablas ------------ */	
	$('#infraccionModal').on('show.bs.modal', function (event){
		var button = $(event.relatedTarget)
		var numDoc = button.data('doc')
		var codigo = button.data('codigo')
		var nombre = button.data('nombre')
		var apellidos = button.data('apellidos')
		
		var modal = $(this)
		
		modal.find('#codigoAlumno').text(codigo)
		modal.find('#nombreAlumno').text(nombre)
		modal.find('#apellidosAlumno').text(apellidos)
		modal.find('#numDoc').text(numDoc)
		
		$('#btnRegistrar').on('click', function (event){
			
			var combo = document.getElementById("tipoInfraccion")
			var txtArea = $('#inputDescripcionInfraccion')
			
			var idItem = combo.value
			var descripcion = txtArea.val()
			
			var movimientoInfraccion = {
				"numDocumento" : numDoc,
				"idTipoInfraccion" : idItem,
				"descripcion" : descripcion
			};
			
			
			$.ajax({
				url :  $variableUtil.root + "movimientoInfraccion",
				type : 'POST',
				data : JSON.stringify(movimientoInfraccion),
                beforeSend : function(xhr) {
    				xhr.setRequestHeader('Content-Type', 'application/json');
    				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
    			},
    			statusCode : {
    				400 : function(response) {
    						swal(response.responseJSON);
    					},
      				500 : function(response) {
      					swal("Error", response.responseText, "warning");
      				}
    			},
    			success : function(response) {
    				console.log(response)
	    			swal({
  					  title: "Operacion realizada con exito",
  					  text: "Infraccion aplicada",
  					  icon: "success",
  					  button: false,
  					  timer: 1000,
	  				}).then((value) => {
	  					location.reload();
	  				});
	    				
    			},
    			error : function(response) {
    				swal("Error", "Ha ocurrido un problema con el servidor", "warning"); 
    			},
    			complete : function(response) {
    				
    			}
			});
			
			
		})
		
		$('#btnClose').on('click', function (event){
			location.reload();
		})
		
	})
	
	

});