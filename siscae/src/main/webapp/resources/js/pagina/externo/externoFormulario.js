$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idExterno : {
				required : true,
				number:true
			},
			idTipoDocumento : {
				required : true,
				number:true
			},
			descripcionTipoDocumento : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 2, 45 ]
			},
			numDocumento : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 8, 45]
			},
			idEstadoTabla : {
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
			}
		},
		messages : {
			idExterno : {
				required : "Ingrese un Id de Externo",
				number:"El Id del Externo debe contener solo n&uacute;meros.",
			},
			idTipoDocumento : {
				required : "Ingrese un Id de Tipo de documento",
				number:"El Id del Tipo de documento debe contener solo n&uacute;meros.",
			},
			descripcionTipoDocumento : {
				required : "Ingrese un Tipo de documento.",
				notOnlySpace : "El Tipo de documento no puede contener solo espacios en blanco.",
				rangelength : "El Tipo de documento debe contener entre 2 y 45 car&aacute;cteres."
			},
			numDocumento : {
				required : "Ingrese un número de documento ",
				soloalfanumericos : "El número de documento debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La número de documento debe contener entre 8 y 45 car&aacute;cteres."
			},
			idEstadoTabla : {
				required : "Ingrese un estado de Externo",
				number:"El Id del Estado debe contener solo n&uacute;meros."
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