$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idPrestamo : {
				required : true,
				number:true
			},
			horaEntrada : {
				required : true,
				number:true
			},
			horaSalida : {
				required : true,
				number:true
			},
			idRecurso : {
				required : true,
				number:true
			},
			descripcionRecurso : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
			},
			idAdministrativo : {
				required : true,
				number:true
			},
			codAdmin : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 8, 10 ]
			},
			nombreAdmin : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			appPaternoAdmin : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			appMaternoAdmin : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			idPersona : {
				required : true,
				number:true
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
		},
		messages : {
			idPrestamo : {
				required : "Ingrese un Id de Prestamo",
				number:"El Id de Prestamo debe contener solo n&uacute;meros.",
			},
			horaEntrada : {
				required : "Ingrese una hora de entrada",
				number:"La hora de entrada  debe contener solo n&uacute;meros.",
			},
			horaSalida: {
				required : "Ingrese una hora de salida",
				number:"La hora de salida debe contener solo n&uacute;meros.",
			},
			idRecurso : {
				required : "Ingrese un Id de Recurso",
				number:"El Id de Recurso debe contener solo n&uacute;meros.",
			},
			descripcionRecurso : {
				required : "Ingrese una descripcion de Recurso.",
				notOnlySpace : "La descripcion de Recurso no puede contener solo espacios en blanco.",
				rangelength : "La descripcion de Recurso debe contener entre 2 y 45 car&aacute;cteres."
			},
			idAdministrativo : {
				required : "Ingrese un Id de Administrativo",
				number:"El Id de Administrativo debe contener solo n&uacute;meros.",
			},
			codAdmin : {
				required : "Ingrese un C&oacute;digo de Administrativo ",
				soloalfanumericos : "El C&oacute;digo de Administrativo debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La C&oacute;digo de Administrativo debe contener entre 8 y 10 car&aacute;cteres."
			},
			nombreAdmin : {
				required : "Ingrese un Nombre  .",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 2 y 45 car&aacute;cteres."
			},
			appPaternoAdmin : {
				required : "Ingrese un Apellido Paterno .",
				notOnlySpace : "El Apellido Paterno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Paterno debe contener entre 2 y 45 car&aacute;cteres."
			},
			appMaternoAdmin : {
				required : "Ingrese un Apellido Materno .",
				notOnlySpace : "El Apellido Materno no puede contener solo espacios en blanco.",
				rangelength : "El Apellido Materno debe contener entre 2 y 45 car&aacute;cteres."
			},
			numDocumento : {
				required : "Ingrese un Numero de documento  ",
				soloalfanumericos : "El C&oacute;digo debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La C&oacute;digo debe contener entre 7 y 15 car&aacute;cteres."
			},
			idPersona : {
				required : "Ingrese un Id de Persona",
				number:"El Id de Persona debe contener solo n&uacute;meros.",
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
			}
		}
	});

});