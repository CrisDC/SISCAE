$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idAreaEstudio : {
				required : true,
			},
			idAdministrativo : {
				required : true,
			},
			fechaInicio : {
				required : true,
			},
			cargo : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,30]
			},
		},
		messages : {
			idAreaEstudio : {
				required : "Selecciona una área de estudio.",
			},
			idAdministrativo  : {
				required : "Seleccione un administrativo.",
			},
			fechaInicio  : {
				required : "Ingrese la fecha de inicio.",
			},
			cargo : {
				required : "Ingrese un cargo para el Administrativo",
				notOnlySpace : "El cargo no puede contener solo espacios en blanco.",
				rangelength : "El cargo debe contener entre 3 y 30 car&aacute;cteres."
			},
			
		}
	});
});