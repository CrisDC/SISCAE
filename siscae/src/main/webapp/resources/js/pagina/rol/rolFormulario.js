$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idRol : {
				required : true,
				number : true,
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
            },
		},
		messages : {
			idRecurso : {
				required : "Ingrese un C&oacute;digo del Rol",
				number : "El Id del Rol debe contener solo números."
			},
			nombre : {
				required : "Ingrese un nombre",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 3 y 45 car&aacute;cteres."
            },

		}
	});
});