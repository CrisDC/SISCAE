$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idRol : {
				required : true,
				number:true
			},
			nombre : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			}
		},
		messages : {
			idRol : {
				required : "Ingrese un Id de Rol",
				number:"El Id del Rol debe contener solo n&uacute;meros.",
			},
			nombre : {
				required : "Ingrese un Nombre.",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco.",
				rangelength : "El nombre debe contener entre 2 y 45 car&aacute;cteres."
			}
		}
	});

});