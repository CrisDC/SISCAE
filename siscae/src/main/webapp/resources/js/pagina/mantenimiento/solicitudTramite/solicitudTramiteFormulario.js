$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idSolicitud : {
				required : true,
				number : true,
				range : [ 1, 99 ]
			},
			descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 50 ]
			}
		},
		messages : {
			descripcion : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no debe contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n debe contener entre 3 y 50 car&aacute;cteres."
			}
		}
	});

});