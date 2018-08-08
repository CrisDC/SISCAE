$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idInfraccion : {
				required : true,
				number:true
			},
			descripcionInfraccion : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 7, 15]
			},
			estadoInfraccion : {
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
			},
			idTipoInfraccion : {
				required : true,
				number:true
			},
			descripcionTipoInfraccion : {
				required : true,
				soloalfanumericos: true,
				rangelength : [ 7, 15]
			}
		},
		messages : {
			idInfraccion : {
				required : "Ingrese un Id de Persona",
				number:"El Id de la Persona debe contener solo n&uacute;meros.",
			},
			descripcionInfraccion : {
				required : "Ingrese una descripcion de Infraccion  ",
				soloalfanumericos : "La descripcion debe contener solo car&aacute;cteres alfanumericos.",
				rangelength : "La descripcion debe contener entre 7 y 15 car&aacute;cteres."
			},
			estadoInfraccion : {
				required : "Ingrese un estado de Infraccion",
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
			},
			idTipoInfraccion : {
				required : "Ingrese un Tipo de Infraccion",
				number:"El Id del Tipo de Infraccion  debe contener solo n&uacute;meros.",
			},
			descripcionTipoInfraccion : {
				required : "Ingrese un Tipo de Infraccion.",
				notOnlySpace : "El Tipo de Infraccion no puede contener solo espacios en blanco.",
				rangelength : "El Tipo de Infraccion debe contener entre 2 y 45 car&aacute;cteres."
			}
		}
	});

});