$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idAdministrativo : {
				required : true,
				number:true
			},
			codigoAdministrativo : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 0, 20 ]
			}
			 },
		messages : {
			idAdministrativo : {
				required : "Ingrese un Id de Administrativo",
				number:"El Id del Administrativo debe contener solo n&uacute;meros.",
			},
			codigoAdministrativo : {
				required : "Ingrese un C&oacute;digo ",
				soloalfanumericos : "El C&oacute;digo debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La C&oacute;digo debe contener entre 0 y 20 car&aacute;cteres."
			}
		}
		
	});

});