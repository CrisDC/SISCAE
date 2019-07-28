$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idRecurso : {
				required : true,
				number : true,
			},
			numeroSerie : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 20 ]
            },
            descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3,20]
			},
			idEstadoTabla : {
				required : true,
				notOnlySpace : true
			},
			idTipoRecurso : {
				required : true,
				number : true,
			},
			nombreTipoRecurso : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 20 ]
			},
			idAreaEstudio : {
				required : true,
				number : true,
			},
			nombreAreaEstudio : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 45 ]
			},
			idUbicacion : {
				required : true,
				number : true,
			},
		},
		messages : {
			idRecurso : {
				required : "Ingrese un C&oacute;digo de Recurso",
				number : "El Id de Recurso debe contener solo números."
			},
			numeroSerie : {
				required : "Ingrese un numero de serie",
				notOnlySpace : "El numero de serie no puede contener solo espacios en blanco.",
				rangelength : "El numero de serie debe contener entre 3 y 20 car&aacute;cteres."
            },
            descripcion : {
				required : "Ingrese una descripcion",
				notOnlySpace : "La descripcion no puede contener solo espacios en blanco.",
				rangelength : "La descripcion debe contener entre 3 y 20 car&aacute;cteres."
			},
			idEstadoTabla : {
				required : "Ingrese un estado",
				number : "El estado debe contener solo números."
			},
			idTipoRecurso : {
				required: "Ingrese tipo de recurso",
				number : "El estado debe contener solo números."
			},
			idRecurso : {
				required : "Ingrese un C&oacute;digo de Tipo de Recurso",
				number : "El Id de Tipo de Recurso debe contener solo números."
			},
			nombreTipoRecurso : {
				required : "Ingrese un nombre de Tipo de Recurso",
				notOnlySpace : "El nombre de Tipo de Recurso no puede contener solo espacios en blanco.",
				rangelength : "El nombre de Tipo de Recurso debe contener entre 3 y 20 car&aacute;cteres."
			},
			idAreaEstudio : {
				required : "Ingrese un C&oacute;digo de Area de estudio",
				number : "El Id de Area de estudio debe contener solo números."
			},
			nombreAreaEstudio : {
				required : "Ingrese un nombre de Area de Estudio",
				notOnlySpace : "El nombre de Area de Estudio no puede contener solo espacios en blanco.",
				rangelength : "El nombre de Area de Estudio debe contener entre 3 y 45 car&aacute;cteres."
			},
			idUbicacion : {
				required : "Ingrese un C&oacute;digo de Ubicacion",
				number : "El Id de Ubicacion debe contener solo números."
			},

		}
	});
});