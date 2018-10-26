$(document).ready(function() {
	
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
    				
    				if(operacion=='INSERT'){
    					
    					var registroSolicitanteNuevo ={
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
            	    	$.ajax({
            	            url :  $variableUtil.root + "registroSolicitanteNuevo",
            	            type : 'POST',
            	            data : JSON.stringify(registroSolicitanteNuevo),
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

            			}, function (dismiss) {
            			  // dismiss can be 'cancel', 'overlay',
            			  // 'close', and 'timer'
            			  
            			});
    					
            	    	console.log(operacion);
    					
    				}else if(operacion=='UPDATE'){
    					
    					console.log(operacion);
    					
    					var actualizarSolicitante ={
            		        	"idPersona" : idPersona,
    							"idTipoDocumento": idTipoDocumentoSolicitante,
            		        	"numDocumento": numDocumentoSolicitante,
            		        	"appPaterno": appPaterno,
            		        	"appMaterno": appMaterno,
            		        	"nombre": nombre
            		    };
            	    	$.ajax({
            	            url :  $variableUtil.root + "persona",
            	            type : 'PUT',
            	            data : JSON.stringify(actualizarSolicitante),
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
            					exito=true;
            				}

            			}, function (dismiss) {
            			  // dismiss can be 'cancel', 'overlay',
            			  // 'close', and 'timer'
            			  
            			});
            	    	
            	    	if(ocupacion=="ALUMNO"){
    						
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
        }else{
        	$('#formulario-tipo-academico').css('display', 'none');
    	    $('#formulario-codigo').css('display', 'none');
    	    $('#formulario-escuela').css('display', 'none');
        }
        $('#tituloModalSolicitantes').text('Modificacion de solicitante');
    	$("#enviar").html('ACTUALIZAR');
    });
    $(document).on('click', '.actualizar-soli', function (event) {
        event.preventDefault();
        let numDocumento = $(this).attr('person');
        idPersona = $(this).attr('key');
        $.ajax({
            url :  $variableUtil.root + "solicitantesDetalles?accion=buscarPorCriterio2&numDocumento="+numDocumento,
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
		    	$('#escuela').val(response[0].escuela).trigger('change.select2');
		    	$("#enviar").html('ACTUALIZAR');
		    	$('#modalNuevoSolicitante').modal('show');
		    	let valor = $("#formulario-ocupacion option:selected").text();
		        if(valor=='ALUMNO'){
		        	$('#formulario-tipo-academico').css('display', 'block');
		        	$('#formulario-codigo').css('display', 'block');
		        	$('#formulario-escuela').css('display', 'block');
		        }else{
		        	$('#formulario-tipo-academico').css('display', 'none');
		    	    $('#formulario-codigo').css('display', 'none');
		    	    $('#formulario-escuela').css('display', 'none');
		        }
		        $('#tituloModalSolicitantes').text('Modificacion de solicitante');
		        
			}

		}, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay',
		  // 'close', and 'timer'
		  
		});        
    });
    $(document).on('click', '.eliminar-soli', function (event) {
    	let numDocumento = $(this).attr('person');
    	let ap = $(this).attr('ap');
    	let am = $(this).attr('am');
    	let nom = $(this).attr('nom');
        idPersona = $(this).attr('key');
        swal({
			  title: "¿Deseas eliminar?",
			  text: "Eliminará al solicitante "+numDocumento+" - "+ap+" "+" "+am+" "+nom,
			  icon: "warning",
			  buttons: true,
			  dangerMode: true,
			})
			.then((willDelete) => {
			  if (willDelete) {
				  
				  
				  alert("jajaja bueno esto aun falta xD")
			    
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
    }else{
    	$('#formulario-tipo-academico').css('display', 'none');
	    $('#formulario-codigo').css('display', 'none');
	    $('#formulario-escuela').css('display', 'none');
    }
});

