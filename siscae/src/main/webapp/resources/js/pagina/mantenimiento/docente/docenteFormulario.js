$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idDocente : {
				required : true,
				number:true
			},
			idTipoDocumento :{
				required:true,
				number:true
			},
			numeroDocumento : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 8, 45]
			},
			idEstadoTabla : {
				required : true,
				number:true
			},
			nombreCompleto:{
				required:true
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
			idTipoDocumento : {
				required : "Elija un Tipo de Documento",
				number:"El Id del estado debe contener solo n&uacute;meros."
			},
			numeroDocumento : {
				required : "Ingrese un número de documento ",
				soloalfanumericos : "El número de documento debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La número de documento debe contener entre 8 y 45 car&aacute;cteres."
			},
			idEstadoTabla : {
				required : "Ingrese un estado de Docente",
				number:"El Id del estado debe contener solo n&uacute;meros."
			},
			nombreCompleto : {
				required: "Debe realizar la b&uacute;squeda de una persona"
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