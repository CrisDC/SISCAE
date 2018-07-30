$(document).ready(function() {
	$formDetalleControlLote.validate({
		rules : {
			tipoDocumento : {
				required : true
			},
			numDocumento : {
				required : true,
				notOnlySpace : true,
				soloNumeroPositivos : true,
				rangelength : [ 8, 12 ]
			},
			nombres : {
				required : true,
				rangelength : [ 3, 50 ]
			},
			apellidos : {
				required : true,
				rangelength : [ 3, 50 ] 
			},
			nombreEnTarjeta :{
				rangelength : [3 , 50 ]
			},
			vigenciaTarjeta : {
				soloNumeroPositivos : true,
				rangelength : [0 ,3]
			},
			montoRecarga : {
				soloNumeroPositivos : true,
			},
			correoElectronico : {
				rangelength : [3 ,150]
			},
			direccion : {
				rangelength : [3 ,200]
			},
			telefonoFijo : {
				numberorempty : true,
				rangelength : [7 ,7]
			}
		},
		messages : {
			tipoDocumento : {
				required : "Seleccione un tipo de documento"
			},
			numDocumento : {
				required : "Ingrese un numero de documento",
				notOnlySpace : "El numero de documento no debe contener espacio en blanco",
				rangelength : "El numero de documento debe tener entre 8 y 12 car&aacute;cteres.",
				soloNumeroPositivos : "El numero de documentos solo debe contener numeros"
			},
			nombres : {
				required : "Ingrese el nombre del dueño de la tarjeta",
				rangelength : "El nombre del tajetahabiente debe contener entre 3 y 50 caracteres"
			},
			apellidos : {
				required : "Ingrese el apellido del dueño de la tarjeta",
				rangelength : "El apellido del tarjetahabiente debe contener entre 3 y 50 caracteres" 
			},
			vigenciaTarjeta : {
				soloNumeroPositivos : "La vigencia de la tarjeta debe ser un numero",
				rangelength : "La vigencia de la tarjeta debe contener entre 0 y 3 digitos"
			},
			nombreEnTarjeta :{
				rangelength : "El nombre de la tarjeta debe contener entre 3 y 50 caracteres"
			},
			montoRecarga : {
				soloNumeroPositivos : "EL monto de la recarga debe ser un monto mayor a cero",
			},
			direccion : {
				rangelength : "La direccion debe contener entre 0 y 200 caracteres"
			},
			telefonoFijo : {
				numberorempty : "El telefono solo debe contener numeros",
				rangelength : "EL telefono debe contener 7 digitos"
			}
		}
	});
	
	$formNuevoPedido.validate({
		rules : {
			bin : {
				required : true
			},
			producto : {
				required : true
			},
			categoria : {
				required : true
				
			}
		},
		messages : {
			bin : {
				required : "Seleccione un tipo de documento",
					
			},
			producto : {
				required : "Seleccione un tipo de documento"
			},
			categoria : {
				required : "Seleccione un tipo de documento"
			}
		}
	});
	
});

