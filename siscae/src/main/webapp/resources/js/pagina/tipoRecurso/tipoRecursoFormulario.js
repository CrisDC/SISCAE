$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idTipoRecurso : {
				required : true,
				number : true,
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 20 ]
			},
			descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
			},
			uso : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 20 ]
			},
			
		},
		messages : {
			idTipoRecurso : {
				required : "Ingrese un C&oacute;digo del tipo de recurso",
				number : "El tipo de recurso debe contener solo números."
			},
			nombre  : {
				required : "Ingrese un nombre",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 3 y 45 car&aacute;cteres."
			},
			descripcion  : {
				required : "Ingrese una descripcion",
				notOnlySpace : "La descripcion no puede contener solo espacios en blanco.",
				rangelength : "La descripcion debe contener entre 3 y 45 car&aacute;cteres."
			},
			uso  : {
				required : "Ingrese un uso",
				notOnlySpace : "El uso no puede contener solo espacios en blanco.",
				rangelength : "El uso debe contener entre 3 y 45 car&aacute;cteres."
			},
		}
	});
});