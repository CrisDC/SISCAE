$(document).ready(function() {
	var $max_tamano_error = 200;
	var tdCodigo
	var tdAppPaterno
	var tdAppMaterno
	var tdNombre
	var tdNumDocumento
	var tdEscuela
	var tdTipo
	/* ---------- Construcción de tabla ---------- */
	var $local = {
			$tblConsulta : $("#tblSolicitantes"),
			tblConsulta  : ""
	}
	
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
			"url" : $variableUtil.root + "solicitantesDetalles?accion=buscarTodos",
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
				"targets" : [ 0, 1, 2, 3, 4, 5, 6],
				"className" : "all filtrable",
			} , {
				"targets" : 7,
				"className" : "all dt-center",
				"defaultContent" : $variableUtil.botonActualizarSolicitante + " " + $variableUtil.botonEliminarSolicitante
			}  ],
						
			"columns" : [{
				"data" : 'codigo',
				"title" : "Código"
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
				"data" : 'numDocumento',
				"title" : "Documento"
			}, {
				"data" : 'escuela',
				"title" : "Escuela"
			}, {
				"data" : 'solicitante',
				"title" : "Tipo"
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
	 $('#tblSolicitantes').on('click', 'button', function(){
		 let padre = $(this).parents('td');
		 let hermanos = $(padre[0]).siblings('td');
		 tdCodigo = hermanos[0].textContent
		 tdAppPaterno = hermanos[1].textContent
		 tdAppMaterno = hermanos[2].textContent
		 tdNombre = hermanos[3].textContent
		 tdNumDocumento = hermanos[4].textContent
		 tdEscuela = hermanos[5].textContent
		 tdTipo = hermanos[6].textContent
	 });
	 
	 
	var operacion;
	var idPersona;
	var exito;
	
	$(".js-example-basic-single").select2({
	    dropdownParent: $("#modalNuevoSolicitante")
	 });
	 $("input").on("keypress", function () {
		  $input=$(this);
		  setTimeout(function () {
		   $input.val($input.val().toUpperCase());
		  },50);
	});
    $('#formulario-tipo-academico').css('display', 'none');
    $('#formulario-codigo').css('display', 'none');
    $('#formulario-escuela').css('display', 'none');
    var validar_formulario = $('#solicitantesFormulario').validate({
		rules : {
			tipoDocumento : {
				required : true,
				notOnlySpace : true,
			},
			numDocumento : {
				required : true,
				notOnlySpace : true,
				soloalfanumericos : true,
				rangelength : [ 7, 15 ]
			},
			appPaterno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			appMaterno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			fechaNac : {
				required : true,
			},
			telefono : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 7, 20 ]
			},
			codigo : {
				notOnlySpace : true,
				number : true,
				rangelength : [ 8, 8 ]
			},
			sexo : {
				required : true,
				notOnlySpace : true,
			},
			escuela : {
				required : true,
				notOnlySpace : true,
			},	
			tipoAcademico : {
				required : true,
				notOnlySpace : true,
			},
			
		},
		messages : {
			tipoDocumento : {
				required : "Ingrese un tipo de documento  ",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco."
			},
			numDocumento : {
				required : "Ingrese un Número de documento  ",
				soloalfanumericos : "El número de documento debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "El número de documento debe contener entre 7 y 15 car&aacute;cteres."
			},
			nombre : {
				required : "Ingrese un Nombre.",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 2 y 45 carácteres."
			},
			appPaterno : {
				required : "Ingrese un Apellido Paterno.",
				notOnlySpace : "El Apellido Paterno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Paterno debe contener entre 2 y 45 carácteres."
			},
			appMaterno : {
				required : "Ingrese un Apellido Materno.",
				notOnlySpace : "El Apellido Materno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Materno debe contener entre 2 y 45 carácteres."
			},
			
			codigo : {
				required : "Ingrese un Código de alumno",
				number : "El Código de alumno solo puede contener números",
				rangelength : "El Código de alumno debe contener 8 digitos"
			},
			
			escuela : {
				required : "Ingrese una escuela",
				notOnlySpace : "La escuela no puede contener solo espacios en blanco."
			},
			tipoAcademico : {
				required : "Ingrese un tipoAcademico",
				notOnlySpace : "El tipo academico no puede contener solo espacios en blanco."
			},		
			
		}
	});
    $('#enviar').click(function () {
    	let idTipoDocumentoSolicitante = $("#tipoDocumento").val();
    	let numDocumentoSolicitante = $("#numDocumento").val();
    	let appPaterno = $("#appPaterno").val();
    	let appMaterno = $("#appMaterno").val();
    	let nombre = $("#nombre").val();
    	let tipoAcademico = $('#tipoAcademico').val();
    	let ocupacion = $('#ocupacion').val();
    	let codigoAlumno = $('#codigo').val();
    	let idEscuela = $('#escuela').val();
    	
    	if(idTipoDocumentoSolicitante == null || numDocumentoSolicitante == null || appPaterno == null || appMaterno == null || ocupacion == null || idTipoDocumentoSolicitante == '' || numDocumentoSolicitante == '' || appPaterno == '' || appMaterno == '' || ocupacion == ''){
    		swal('Faltan llenar datos');
    	}else{
    		if(ocupacion == 'ALUMNO' && (codigoAlumno == null || idEscuela == null || codigoAlumno == '' || idEscuela == '')){
    			swal('Faltan llenar datos');
    		}else{
    			
    			if(validar_formulario.form()){
    				
    				var registroSolicitanteNuevo = {
        		        	"operacion" : operacion,
							"idTipoDocumentoSolicitante": idTipoDocumentoSolicitante,
        		        	"numDocumentoSolicitante": numDocumentoSolicitante,
        		        	"appPaterno": appPaterno,
        		        	"appMaterno": appMaterno,
        		        	"nombre": nombre,
        		        	"tipoAcademico": tipoAcademico,
        		        	"ocupacion": ocupacion,
        		        	"codigoAlumno": codigoAlumno,
        		        	"idEscuela": idEscuela
        		    };
    				
    				if(operacion=="INSERT"){
    					    					
            	    	$.ajax({
            	            url :  $variableUtil.root + "solicitante",
            	            type : 'POST',
            	            data : JSON.stringify(registroSolicitanteNuevo),
            	            beforeSend : function(xhr) {
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
											swal("Error", response.responseText, "warning");            					}
            				},
            				success : function(response) {
            					
            					swal({
            						title: "Registro de solicitante",
            					  	text: "Realizado con exito",
            					  	icon: "success",
            					  	button: false,
            					  	timer: 1000,
            					}).then((value) => {
            						location.reload();
            					});
            				}
            			});
            	    	
            	    	
    				}else{
    					if(operacion=="UPDATE"){
    						
    						$.ajax({
                	            url :  $variableUtil.root + "solicitante",
                	            type : 'PUT',
                	            data : JSON.stringify(registroSolicitanteNuevo),
                	            beforeSend : function(xhr) {
                					xhr.setRequestHeader('Content-Type', 'application/json');
                					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
                				},
                				statusCode : {
                					400 : function(response) {
										response.responseText.length > $max_tamano_error ? 
												swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
												swal("Error", response.responseText, "warning");                					},
                					500 : function(response) {
										response.responseText.length > $max_tamano_error ? 
												swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
												swal("Error", response.responseText, "warning");                					}
                				},
                				success : function(response) {
                					
                					swal({
                						title: "Actualización de solicitante",
                					  	text: "Realizado con éxito",
                					  	icon: "success",
                					  	button: false,
                					  	timer: 1000,
                					}).then((value) => {
                						location.reload();
                					});
                				}
                			});
    					}
    				}
    				
    					
    				
    				
    			}else{
    				swal('Faltan llenar datos');
    			}
    		}
    	}

    }); 
    $('#abrirModalNuevoSolicitante').click(function () {
    	operacion="INSERT";
    	$("#enviar").html('REGISTRAR');
    	$('#tituloModalSolicitantes').text('Registro de solicitantes');
    	$("#tipoDocumento").val(-1).trigger('change.select2');
    	$("#numDocumento").val('');
    	$("#appPaterno").val('');
    	$("#appMaterno").val('');
    	$("#nombre").val('');
    	$('#tipoAcademico').val(-1).trigger('change.select2');
    	$('#ocupacion').val(-1).trigger('change.select2');
    	$('#codigo').val('');
    	$('#escuela').val(-1);
    	let valor = $("#formulario-ocupacion option:selected").text();
    	if(valor=='ALUMNO'){
        	$('#formulario-tipo-academico').css('display', 'block');
        	$('#formulario-codigo').css('display', 'block');
        	$('#formulario-escuela').css('display', 'block');
        	$('#ocupacion-estirado').removeClass("col-md-12");
        	$('#ocupacion-estirado').addClass("col-md-6");
        	
        }else{
        	$('#formulario-tipo-academico').css('display', 'none');
    	    $('#formulario-codigo').css('display', 'none');
    	    $('#formulario-escuela').css('display', 'none');
    	    $('#ocupacion-estirado').removeClass("col-md-6");
        	$('#ocupacion-estirado').addClass("col-md-12");
        }
    });
    $(document).on('click', '.actualizar-soli', function (event) {
        event.preventDefault();
        $.ajax({
            url :  $variableUtil.root + "solicitantesDetalles?accion=buscarPorCriterio2&numDocumento="+tdNumDocumento,
            type : 'GET',
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
				
				operacion="UPDATE";
		    	$("#numDocumento").val(response[0].numDocumento);
		    	$("#appPaterno").val(response[0].appPaterno);
		    	$("#appMaterno").val(response[0].appMaterno);
		    	$("#nombre").val(response[0].nombre);
		    	$('#tipoAcademico').val(response[0].tipoAcademico).trigger('change.select2');
		    	$('#ocupacion').val(response[0].solicitante).trigger('change.select2');
		    	$('#tipoDocumento').val(1).trigger('change.select2');
		    	$('#codigo').val(response[0].codigo);
		    	
		    
		        //Asignando a select2 la el valor que esta en la bd
		        $("#escuela option").each(function() {
		        	let num = $(this).val()
		        	$('#escuela').val(num).trigger('change.select2');
		        	let valor = $('#escuela :selected').text();
		        	if(response[0].escuela==valor){
		        		return false;
		        	}
		        });
		        //Asignando a select2 la el valor que esta en la bd
		        $("#tipoAcademico option").each(function() {
		        	let num = $(this).val()
		        	$('#tipoAcademico').val(num).trigger('change.select2');
		        	let valor = $('#tipoAcademico :selected').text();
		        	if(response[0].tipoAcademico==valor){
		        		return false;
		        	}
		        });
		        //Asignando a select2 la el valor que esta en la bd
		        $("#tipoDocumento option").each(function() {
		        	let num = $(this).val()
		        	$('#tipoDocumento').val(num).trigger('change.select2');
		        	let valor = $('#tipoDocumento :selected').text();
		        	if(response[0].tipoDocumento==valor){
		        		return false;
		        	}
		        });
		        
		        let valorSeleccionado = $("#formulario-ocupacion option:selected").text();
		        
		        if(valorSeleccionado=='ALUMNO'){
		        	$('#formulario-tipo-academico').css('display', 'block');
		        	$('#formulario-codigo').css('display', 'block');
		        	$('#formulario-escuela').css('display', 'block');
		        	$('#ocupacion-estirado').removeClass("col-md-12");
		        	$('#ocupacion-estirado').addClass("col-md-6");
		        	
		        }else{
		        	$('#formulario-tipo-academico').css('display', 'none');
		    	    $('#formulario-codigo').css('display', 'none');
		    	    $('#formulario-escuela').css('display', 'none');
		    	    $('#ocupacion-estirado').removeClass("col-md-6");
		        	$('#ocupacion-estirado').addClass("col-md-12");
		        	$('#tipoAcademico').val(-1).trigger('change.select2');
		        	$('#escuela').val(-1).trigger('change.select2');
		        }
		        $('#tituloModalSolicitantes').text('Modificacion de solicitante');
		        $("#enviar").html('ACTUALIZAR');
		        
		        $('#modalNuevoSolicitante').modal('show');
		    	
			}

		});        
    });
    $(document).on('click', '.eliminar-soli', function (event) {
        swal({
			  title: "¿Deseas eliminar?",
			  text: "Eliminará al solicitante "+tdNombre+" "+" "+tdAppPaterno+" "+tdAppMaterno+" con documento "+tdNumDocumento,
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
				  
				  var borrarSolicitante = {
      		        	"numDocumentoSolicitante": tdNumDocumento,
      		        	"ocupacion" : tdTipo
      		      };
				  
				  $.ajax({
      	            url :  $variableUtil.root + "solicitante",
      	            type : 'DELETE',
      	            data : JSON.stringify(borrarSolicitante),
      	            beforeSend : function(xhr) {
      					xhr.setRequestHeader('Content-Type', 'application/json');
      					xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
      				},
      				statusCode : {
      					400 : function(response) {
							response.responseText.length > $max_tamano_error ? 
									swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
									swal("Error", response.responseText, "warning");      					},
      					500 : function(response) {
							response.responseText.length > $max_tamano_error ? 
									swal("Error", "La operación no pudo realizarse con exito.", "warning") : 
									swal("Error", response.responseText, "warning");      					},
      					409 : function(response) {
      						console.log(response);
      						swal("Error", "No se puede eliminar al solicitante "+tdNombre+" "+" "+tdAppPaterno+" "+tdAppMaterno+" con documento "+tdNumDocumento+" debido a que ha realizado prestamos de recursos, si desea eliminarlo consulte con el administrador", "warning");
      					}
      				},
      				success : function(response) {
      					
      					swal({
      						title: "Eliminación de solicitante",
      					  	text: "Realizado con éxito",
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

$(document).on('change', '#formulario-ocupacion', function(event) {
    let valor = $("#formulario-ocupacion option:selected").text();
    if(valor=='ALUMNO'){
    	$('#formulario-tipo-academico').css('display', 'block');
    	$('#formulario-codigo').css('display', 'block');
    	$('#formulario-escuela').css('display', 'block');
    	$('#ocupacion-estirado').removeClass("col-md-12");
    	$('#ocupacion-estirado').addClass("col-md-6");
    	
    }else{
    	$('#formulario-tipo-academico').css('display', 'none');
	    $('#formulario-codigo').css('display', 'none');
	    $('#formulario-escuela').css('display', 'none');
	    $('#ocupacion-estirado').removeClass("col-md-6");
    	$('#ocupacion-estirado').addClass("col-md-12");
    }
});

