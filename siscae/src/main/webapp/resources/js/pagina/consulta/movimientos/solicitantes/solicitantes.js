
$(document).ready(function() {
    $('.js-example-basic-single').select2();
    
    $('#formulario-tipo-academico').css('display', 'none');

    $('#formulario-codigo').css('display', 'none');

    $('#formulario-escuela').css('display', 'none');
    
    $('#enviar').click(function () {
    	
    	let idTipoDocumentoSolicitante = $("#tipoDocumento").val();
    	let numDocumentoSolicitante = $("#numDocumento").val();
    	let appPaterno = $("#appPaterno").val();
    	let appMaterno = $("#appMaterno").val();
    	let nombre = $("#nombre").val();
    	let sexo = $("#sexo").val();
    	let fechaNac =  $("#fechaNac").val();
    	let telefono = $("#telefono").val();
    	let tipoAcademico = $('#tipoAcademico').val();
    	let ocupacion = $('#ocupacion').val();
    	let codigoAlumno = $('#codigo').val();
    	let idEscuela = $('#escuela').val();
    	
    	var registroSolicitanteNuevo ={
	        	"idTipoDocumentoSolicitante": idTipoDocumentoSolicitante,
	        	"numDocumentoSolicitante": numDocumentoSolicitante,
	        	"appPaterno": appPaterno,
	        	"appMaterno": appMaterno,
	        	"nombre": nombre,
	        	"sexo": sexo,
	        	"fechaNac": fechaNac,
	        	"telefono": telefono,
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
				swal("Registro de solicitante", "Realizado con exito", "success");
				location.reload();
			}

		}, function (dismiss) {
		  // dismiss can be 'cancel', 'overlay',
		  // 'close', and 'timer'
		  
		}

		)
    	
    	
    	
    	
    	
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