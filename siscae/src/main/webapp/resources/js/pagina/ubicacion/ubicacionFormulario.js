$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idUbicacion : {
				required : true,
				number : true,
			},
			coordenadaX : {
				required : true,
				number : true,
			},
			coordenadaY : {
				required : true,
				number : true,
			},
			
		},
		messages : {
			idUbicacion : {
				required : "Ingrese un C&oacute;digo de Ubicacion",
				number : "El Id de ubicacion debe contener solo números."
			},
			coordenadaX : {
				required : "Ingrese una coordenada X",
				number : "La coordenada X debe contener solo números."
			},
			coordenadaY : {
				required : "Ingrese una coordenada Y",
				number : "La coordenada Y debe contener solo números."
			},
		}
	});
});