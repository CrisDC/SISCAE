$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idPersona : {
				required : true
			},
			codigoAdm : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 0, 20 ]
			}
			 },
		messages : {
			idPersona : {
				required : "Selecciona una persona.",
			},
			codigoAdm : {
				required : "Ingrese el código de administrativo.",
				soloalfanumericos : "El C&oacute;digo debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La C&oacute;digo debe contener entre 0 y 20 car&aacute;cteres."
			}
		}
		
	});

});