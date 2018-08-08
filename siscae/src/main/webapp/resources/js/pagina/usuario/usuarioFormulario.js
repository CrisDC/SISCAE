$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idUsuario : {
				required : true,
				number : true,
			},
			username : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
            },
            pass : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,200]
			},
            estado : {
				required : true,
				number : true,
			},
			idRol : {
				required : true,
				number : true,
			},
			nombreRol : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
			},
			idPersona : {
				required : true,
				number : true,
			},
			nombrePersona : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
			},
			appPaterno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
			},
			appMaterno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
			},
		},
		messages : {
			idUsuario : {
				required : "Ingrese un C&oacute;digo de Usuario",
				number : "El Id de Usuario debe contener solo números."
			},
			username : {
				required : "Ingrese un usario",
				notOnlySpace : "El usuario no puede contener solo espacios en blanco.",
				rangelength : "El numero de serie debe contener entre 3 y 45 car&aacute;cteres."
            },
            pass : {
				required : "Ingrese una contraseña",
				notOnlySpace : "La contraseña no puede contener solo espacios en blanco.",
				rangelength : "La constraseña debe contener entre 3 y 200 car&aacute;cteres."
			},
			estado : {
				required : "Ingrese un estado",
				number : "El estado debe contener solo números."
			},
			idRol : {
				required : "Ingrese un Rol",
				number : "El Id de rol debe contener solo números."
			},
			nombreRol : {
				required : "Ingrese un nombre de Rol",
				notOnlySpace : "El nombre de Rol no puede contener solo espacios en blanco.",
				rangelength : "El nombre Rol debe contener entre 3 y 45 car&aacute;cteres."
			},
			idPersona : {
				required : "Ingrese un C&oacute;digo de Persona",
				number : "El Id de Persona de estudio debe contener solo números."
			},
			nombrePersona : {
				required : "Ingrese un nombre de persona",
				notOnlySpace : "El nombre de persona no puede contener solo espacios en blanco.",
				rangelength : "El nombre de persona debe contener entre 3 y 45 car&aacute;cteres."
			},
			appMaterno : {
				required : "Ingrese apellido paterno",
				notOnlySpace : "El apellido paterno no puede contener solo espacios en blanco.",
				rangelength : "El apellido paterno debe contener entre 3 y 45 car&aacute;cteres."
			},
			appPaterno : {
				required : "Ingrese un apellido materno",
				notOnlySpace : "El apellido materno no puede contener solo espacios en blanco.",
				rangelength : "El apellido materno debe contener entre 3 y 45 car&aacute;cteres."
			},

		}
	});
});