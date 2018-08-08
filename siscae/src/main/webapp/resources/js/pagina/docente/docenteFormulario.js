$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idDocente : {
				required : true,
				number:true
			},
			numDocumento : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 8, 45]
			},
			estadoDocente : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
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
			idDocente : {
				required : "Ingrese un Id de Docente",
				number:"El Id del Docente debe contener solo n&uacute;meros.",
			},
			numDocumento : {
				required : "Ingrese un número de documento ",
				soloalfanumericos : "El número de documento debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La número de documento debe contener entre 8 y 45 car&aacute;cteres."
			},
			estadoDocente : {
				required : "Ingrese un estado de Docente",
				notOnlySpace : "El estado no puede contener solo espacios en blanco.",
				rangelength : "El estado debe contener entre 3 y 20 car&aacute;cteres."
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