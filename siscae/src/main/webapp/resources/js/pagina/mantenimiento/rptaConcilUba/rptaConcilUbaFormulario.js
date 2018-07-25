$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idRespuestaConcilUba : {
				required : true,
				number : true,
				range : [ 0, 99 ]
			},
			descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 40 ]
			}
		},
		messages : {
			idRespuestaConcilUba : {
				required : "Ingrese un C&oacute;digo de Rpta. Concil. UBA.",
				number : "El C&oacute;digo de Rpta. Concil. UBA debe ser un n&uacute;mero.",
				range : "El C&oacute;digo de Rpta. Concil. UBA debe estar entre 0 y 99."
			},
			descripcion : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n debe contener entre 3 y 40 car&aacute;cteres."
			}
		}
	});

});