$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 60 ]
			},
			idFacultad : {
				required : true,
			},
		},
		messages : {
			nombre : {
				required : "Ingrese un nombre de Escuela.",
				notOnlySpace : "El nombre de Escuela no puede contener solo espacios en blanco.",
				rangelength : "El nombre de Escuela debe contener entre 3 y 70 car&aacute;cteres."
			},
			idFacultad : {
				required : "Seleccione una facultad.",
			},
		}
	});

});