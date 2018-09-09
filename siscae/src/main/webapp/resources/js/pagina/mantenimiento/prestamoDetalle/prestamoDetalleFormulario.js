$(document).ready(function() {
	$formMantenimiento.validate({
		rules : {
			idPrestamo : {
				required : true,
				number : true,
			},
			idMaterial : {
				required : true,
				number : true,
			},
			descripcionMaterial : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 60 ]
			},
			
		},
		messages : {
			idPrestamo : {
				required : "Ingrese un Id de Prestamo",
				number : "El Id de Prestamo debe contener solo números."
			},
			idMaterial : {
				required : "Ingrese un Id de Material",
				number : "El Id de Material debe contener solo números."
			},
			descripcionMaterial : {
				required : "Ingrese un nombre",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "La nombre debe contener entre 3 y 60 car&aacute;cteres."
			}
			
		}
	});
});