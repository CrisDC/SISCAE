$(document).ready(function() {
	$('#solicitantesFormulario').validate({
		rules : {
			tipoDocumento : {
				required : true,
				notOnlySpace : true,
			},
			numDocumento : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 7, 15 ]
			},
			appPaterno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			appMaterno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			fechaNac : {
				required : true,
			},
			telefono : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 7, 20 ]
			},
			codigo : {
				notOnlySpace : true,
				number : true,
				rangelength : [ 8, 8 ]
			},
			sexo : {
				required : true,
				notOnlySpace : true,
			},
			escuela : {
				required : true,
				notOnlySpace : true,
			},	
			tipoAcademico : {
				required : true,
				notOnlySpace : true,
			},
			
		},
		messages : {
			tipoDocumento : {
				required : "Ingrese un tipo de documento  ",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco."
			},
			numDocumento : {
				required : "Ingrese un Número de documento  ",
				rangelength : "El número de documento debe contener entre 7 y 15 car&aacute;cteres."
			},
			nombre : {
				required : "Ingrese un Nombre.",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 2 y 45 carácteres."
			},
			appPaterno : {
				required : "Ingrese un Apellido Paterno.",
				notOnlySpace : "El Apellido Paterno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Paterno debe contener entre 2 y 45 carácteres."
			},
			appMaterno : {
				required : "Ingrese un Apellido Materno.",
				notOnlySpace : "El Apellido Materno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Materno debe contener entre 2 y 45 carácteres."
			},
			
			codigo : {
				required : "Ingrese un Código de alumno",
				number : "El Código de alumno solo puede contener números",
				rangelength : "El Código de alumno debe contener 8 digitos"
			},
			
			escuela : {
				required : "Ingrese una escuela",
				notOnlySpace : "La escuela no puede contener solo espacios en blanco."
			},
			tipoAcademico : {
				required : "Ingrese un tipoAcademico",
				notOnlySpace : "El tipo academico no puede contener solo espacios en blanco."
			},
			
			
			
		}
	});
});