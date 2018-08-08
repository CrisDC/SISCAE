$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {

			idAreaAdministrativo : {
				required : true,
				number : true,
			},

			idAreaEstudio : {
				required : true,
				number : true,
			},

			nombreAreaEstudio : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,45]
			},

			idAdministrativo : {
				required : true,
				number : true,
			},

			nombreAdministrativo : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,45]
			},

			appPatAdministrativo : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,45]
			},

			appMatAdministrativo : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,45]
			},

			cargo : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,30]
			},
			
		},
		messages : {
			idAreaAdministrativo : {
				required : "Ingrese un C&oacute;digo del Administrativo",
				number : "El Id de Area de Estudio debe contener solo números."
			},

			idAreaEstudio : {
				required : "Ingrese un C&oacute;digo de Area de estudio",
				number : "El Id de Area de Estudio debe contener solo números."
			},

			nombreAreaEstudio : {
				required : "Ingrese un nombre del Area de Estudios",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 3 y 45 car&aacute;cteres."
			},

			idAdministrativo  : {
				required : "Ingrese un C&oacute;digo del Administrativo",
				number : "El Id del Administrativo debe contener solo números."
			},

			nombreAreaEstudio : {
				required : "Ingrese un nombre del Area de Estudios",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 3 y 45 car&aacute;cteres."
			},

			appPatAdministrativo : {
				required : "Ingrese un apellido pat. del Administrativo",
				notOnlySpace : "El apellido paterno del Administrativo no puede contener solo espacios en blanco.",
				rangelength : "El apellido paterno debe contener entre 3 y 45 car&aacute;cteres."
			},

			appMatAdministrativo : {
				required : "Ingrese un apellido mat. para el Administrativo",
				notOnlySpace : "El apellido materno del Administrativo no puede contener solo espacios en blanco.",
				rangelength : "El apellido materno debe contener entre 3 y 45 car&aacute;cteres."
			},

			cargo : {
				required : "Ingrese un cargo para el Administrativo",
				notOnlySpace : "El cargo no puede contener solo espacios en blanco.",
				rangelength : "El cargo debe contener entre 3 y 30 car&aacute;cteres."
			},
			
		}
	});
});