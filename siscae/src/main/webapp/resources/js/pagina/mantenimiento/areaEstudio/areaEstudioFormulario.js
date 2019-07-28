$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idAreaEstudio : {
				required : true,
				number : true,
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [0,45]
			},
			pabellon: {
				required : true,
				notOnlySpace : true,
				rangelength : [ 0,45]
			},
			nivel: {
				required : true,
				notOnlySpace : true,
				rangelength : [ 0,45]
			},
			aforo: {
				required:true,
				notOnlySpace:true
			}
			
		},
		messages : {
			idAreaEstudio : {
				required : "Ingrese un C&oacute;digo de Area de Estudio",
				number : "El Id de Area de Estudios debe contener solo números."
			},
			nombre  : {
				required : "Ingrese un nombre",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "La nombre debe contener entre 3 y 45 car&aacute;cteres."
			},
			pabellon  : {
				required : "Ingrese un pabellon",
				notOnlySpace : "El pabellon no puede contener solo espacios en blanco.",
				rangelength : "La pabellon debe contener entre 3 y 45 car&aacute;cteres."
			},
			nivel  : {
				required : "Ingrese un nivel",
				notOnlySpace : "El pabellon no puede contener solo espacios en blanco.",
				rangelength : "La pabellon debe contener entre 3 y 45 car&aacute;cteres."
			},
			aforo:{
				required:"Ingrese aforo",
				notOnlySpace:"El aforo no puede contener solo espacios en blanco."
			},
			
			
		}
	});
});