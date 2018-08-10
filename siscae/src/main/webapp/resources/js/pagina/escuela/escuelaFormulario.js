$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idEscuela : {
				required : true,
				number: true
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 60 ]
			},
			idFacultad : {
				required : true,
				number: true
			},
			nombreFacultad : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 60 ]
			}
		},
		messages : {
			idEscuela : {
				required : "Ingrese un Id de Escuela",
				number : "El Id de Escuela debe contener debe contener solo n&uacute;meros.",
			},
			nombre : {
				required : "Ingrese una nombre de Escuela.",
				notOnlySpace : "El nombre de Escuela no puede contener solo espacios en blanco.",
				rangelength : "El nombre de Escuela debe contener entre 3 y 70 car&aacute;cteres."
			},
			idFacultad : {
				required : "Ingrese un Id de Facultad",
				number : "El Id de Facultad debe contener debe contener solo n&uacute;meros.",
			},
			nombreFacultad : {
				required : "Ingrese una nombre de Facultad ",
				notOnlySpace : "El nombre de Facultad no puede contener solo espacios en blanco.",
				rangelength : "El nombre de Facultad debe contener entre 3 y 70 car&aacute;cteres."
			}
		}
	});

});