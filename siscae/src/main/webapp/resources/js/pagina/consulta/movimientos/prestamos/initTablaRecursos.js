$(document).ready(function(){
	/* ---------- Construcción de tabla ---------- */
	console.log("entro a cambio de estado sancionado");
	$.ajax({
         url :  $variableUtil.root + "movimientoInfraccion",
         type : 'POST',
         beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			statusCode : {
				400 : function(response) {
					console.log(response);
					//swal(response.responseJSON);
				},
				500 : function(response) {
					console.log(response);
					//swal("Error", response.responseText, "warning");
				}
			},
			success : function(response) {
				console.log(response);
				//Siempre que pasa por aca, la petición es exitosa, no sirve response
				//Se analiza que imagen ponerle al nuevo html
				
				
			}

	 });
	var $local = {
			$tblConsulta : $("#tblRecursos"),
			tblConsulta  : ""
	}
	var nombreAreaEstudio = $('#idNombreAreaEstudio').text();
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
			"url" : $variableUtil.root + "consultaPrestamosTabla?accion=buscarPorCriterio&areaEstudio="+nombreAreaEstudio,
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
				"targets" : [ 2, 3, 5, 6],
				"className" : "all filtrable",
			} , {
				"targets" : 8,
				"className" : "all dt-center",
				"render" : function(data){
					if(data['horaEntrada'] != null){
						return $variableUtil.botonDesalojar;
					}
				}
			} , {
				"targets" : 4,
				"className" : "all filtrable",
				"render" : function(data){
					if(data['horaEntrada'] != null){
						return (data['appPaterno']+' '+data['appMaterno']);
					}
				}
			} , {
				"targets" : 7,
				"className" : "all filtrable temporizador",
				"render" : function(data){
					if(data['horaEntrada'] != null){
						
						let horaEntrada = data['horaEntrada'];
						let f=new Date();
						let horaActual=f.getHours()+":"+f.getMinutes()+":"+f.getSeconds();
						
						var hora1 = (horaActual).split(":"),
						hora2 = (horaEntrada).split(":"),
						t1 = new Date(),
						t2 = new Date();
						 
						t1.setHours(hora1[0], hora1[1], hora1[2]);
						t2.setHours(hora2[0], hora2[1], hora2[2]);
						 
						//Aquí hago la resta
						t1.setHours(t1.getHours() - t2.getHours(), t1.getMinutes() - t2.getMinutes(), t1.getSeconds() - t2.getSeconds());
						 
						//Imprimo el resultado
						return (t1.getHours() ? t1.getHours() + (t1.getHours() > 1 ? " h" : " h") : "") + (t1.getMinutes() ? " " + t1.getMinutes() + (t1.getMinutes() > 1 ? " m" : " m") : " ") + (t1.getSeconds() ? (t1.getHours() || t1.getMinutes() ? " " : "") + t1.getSeconds() + (t1.getSeconds() > 1 ? " s" : " s") : "");
					}
				}
			} , {
				"targets" : 0,
				"className" : "all filtrable",
				"render" : function(data){
					
					return (data['tipoRecurso']+' '+data['numero']);
					
				}
			}, {
				"targets" : 1,
				"render" :  function(data){
					if(data=='OCUPADO'){
						return '<span class="badge badge-danger">OCUPADO</span>';
					}else{
						if(data=='DISPONIBLE'){
							return '<span class="badge badge-primary">DISPONIBLE</span>';
						}else{
							return '<span class="badge badge-warning">LIBERABLE</span>';
						}
					}
				}
			}],
						
			"columns" : [{
				"data" : null,
				"title" : "Recurso",
				"name": 'grupo'
			}, {
				"data" : 'estado',
				"title" : "Estado"
			}, {
				"data" : 'codigoAlumno',
				"title" : "Codigo"
			}, {
				"data" : 'nombre',
				"title" : "Nombre"
			}, {
				"data" : null,
				"title" : "Apellidos"
			}, {
				"data" : 'numDocumento',
				"title" : "Doc."
			}, {
				"data" : 'horaEntrada',
				"title" : "Entrada"
			}, {
				"data" : null,
				"title" : "T. Transcurrido"
			} ,{
				"data" : null,
				"title" : 'Acción'
			}],
			rowsGroup: [
			      'grupo:name',
			      0,
			      2
			],
	});				
	$local.$tblConsulta.find("thead").on('keyup', 'input', function() {
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(this.value).draw();
	});

	$local.$tblConsulta.find("thead").on('change', 'select', function() {
		var val = $.fn.dataTable.util.escapeRegex($(this).val());
		$local.tblConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
	});
	
	/* ------ fin Construcción de tablas ------------ */
	var tdNumDocumento;
	var tdNombre;
	var tdApellidos;
	
	
	$('#tblRecursos').on('click', 'button', function(){
		 let padre = $(this).parents('td');
		 let hermanos = $(padre[0]).siblings('td');
		 tdNombre = hermanos[3].textContent
		 tdApellidos = hermanos[4].textContent
		 tdNumDocumento = hermanos[5].textContent
	 });
	
	$(document).on('click', '.desocupar-soli', function (event) {
		swal({
			  title: "¿Deseas descoupar?",
			  text: "Desocupará al solicitante "+tdNombre+" "+" "+tdApellidos+" con documento "+tdNumDocumento+' aplicando una infracción',
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
				  
				  var finPrestamo ={
				        	"numDocumentoSolicitante": tdNumDocumento
				    };
				  
				  $.ajax({
					url :  $variableUtil.root + "movimientoFinPrestamo",
		            type : 'POST',
    	            data : JSON.stringify(finPrestamo),
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
    					},
    				},
    				success : function(response) {
    					
    					swal({
    						title: "Registro de salida",
    					  	text: "Desocupó el recurso con éxito",
    					  	icon: "success",
    					  	button: false,
    					  	timer: 1000,
    					}).then((value) => {
    						location.reload();
    					});
    				}
    			});
				  
				  
			  }
		});
	});
});


