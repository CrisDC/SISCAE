$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idMaterial : {
				required : true,
				number : true,
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
            },
            tipo : {
				required : true,
				notOnlySpace : true
			},
		},
		messages : {
			idMaterial : {
				required : "Ingrese un C&oacute;digo de Material",
				number : "El Id de Material debe contener solo números."
			},
			nombre : {
				required : "Ingrese un nombre",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 3 y 45 car&aacute;cteres."
            },
			tipo : {
				required : "Ingrese un tipo de material",
				number : "El tipo de material debe contener solo números."
			},
		}
	});
});