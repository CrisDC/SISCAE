$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idPersona : {
				required : true,
			},
			codigoAlumno : {
				required : true,
				number : true,
				rangelength : [ 8, 8 ]
			},
			idEstadoTabla : {
				required : true,
			},
			idTipoAcademico : {
				required : true,
			},
			idEscuela : {
				required : true,
			},
		},
		messages : {
			idPersona : {
				required : "Seleccione una persona."
			},
			codigoAlumno : {
				required : "Ingrese el código de alumno.",
				number : "El código de alumno solo puede contener números.",
				rangelength : "El código de alumno debe contener 8 digitos."
			},
			idEstadoTabla : {
				required : "Seleccione un estado para el alumno.",
			},
			idTipoAcademico : {
				required : "Seleccione un el tipo académico.",
			},
			idEscuela : {
				required : "Seleccione la escuela del alumno.",
			}
		}
	});

});