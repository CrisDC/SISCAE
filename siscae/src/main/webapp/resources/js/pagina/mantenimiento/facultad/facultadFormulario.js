$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idFacultad : {
				required : true,
				number : true,
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 60 ]
			},
			
		},
		messages : {
			idFacultad : {
				required : "Ingrese un Id de Facultad.",
				number : "El Id de Facultad debe contener solo números."
			},
			nombre  : {
				required : "Ingrese un nombre de Facultad",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "La nombre debe contener entre 3 y 60 car&aacute;cteres."
			}
			
		}
	});
});