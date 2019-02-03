$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idPersona : {
				required : true,
				number:true
			},
			numDocumento : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 7, 15]
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
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
			sexo : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 0, 10 ]
			},
			numTelef : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 7, 20 ]
			},
			idTipoDocumento : {
				required : true,
				number:true
			}
		},
		messages : {
			idAlumno : {
				required : "Ingrese un Id de Persona",
				number:"El Id de la Persona debe contener solo n&uacute;meros.",
			},
			numDocumento : {
				required : "Ingrese un Numero de documento  ",
				soloalfanumericos : "El C&oacute;digo debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La C&oacute;digo debe contener entre 7 y 15 car&aacute;cteres."
			},
			nombre : {
				required : "Ingrese un Nombre.",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 2 y 45 car&aacute;cteres."
			},
			appPaterno : {
				required : "Ingrese un Apellido Paterno.",
				notOnlySpace : "El Apellido Paterno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Paterno debe contener entre 2 y 45 car&aacute;cteres."
			},
			appMaterno : {
				required : "Ingrese un Apellido Materno.",
				notOnlySpace : "El Apellido Materno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Materno debe contener entre 2 y 45 car&aacute;cteres."
			},
			sexo : {
				required : "Ingrese un Sexo.",
				notOnlySpace : "El sexo no puede contener solo espacios en blanco.",
				rangelength : "El sexo debe contener entre 2 y 45 car&aacute;cteres."
			},
			numTelef : {
				required : "Ingrese un número telefónico.",
				notOnlySpace : "El número telefónico no puede contener solo espacios en blanco.",
				rangelength : "El número telefónico debe contener entre 7 y 20 car&aacute;cteres."
			},
			idTipoDocumento : {
				required : "Ingrese un Tipo de documento",
				number:"El Id del Tipo de documento  debe contener solo n&uacute;meros.",
			}
		}
	});

});