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
				rangelength : [ 8, 20 ]
			},
			idEstadoTabla : {
				required : true,
				number:true
			},
			idTipoAcademico : {
				required : true,
				number:true
			},
			descripcionTipoAcademico : {
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
			idAlumno : {
				required : "Ingrese un Id de Alumno",
				number:"El Id del Alumno debe contener solo n&uacute;meros.",
			},
			codigoAlumno : {
				required : "Ingrese un C&oacute;digo ",
				soloalfanumericos : "El C&oacute;digo debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La C&oacute;digo debe contener entre 8 y 10 car&aacute;cteres."
			},
			idEstadoTabla : {
				required : "Ingrese un estado de Alumno",
				number:"El Id del estado debe contener solo n&uacute;meros."
			},
			idTipoAcademico : {
				required : "Ingrese un Id de Tipo Academico",
				number:"El Id del Tipo Academico debe contener solo n&uacute;meros."
			},
			descripcionTipoAcademico : {
				required : "Ingrese un tipo académico.",
				notOnlySpace : "El tipo académico no puede contener solo espacios en blanco.",
				rangelength : "El tipo Academico debe contener entre 3 y 70 car&aacute;cteres."
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