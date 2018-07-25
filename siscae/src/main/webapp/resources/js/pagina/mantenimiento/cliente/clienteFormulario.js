$(document).ready(function() {

	$formMantenimiento.validate({
		focusCleanup : true,
		rules : {
			idCliente : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 1, 4 ]
			},
			descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 40 ]
			},
			idEmpresa : {
				required : true,
				notOnlySpace : true,
				selectlength : [ 1, 4 ]
			}
		},
		messages : {
			idCliente : {
				required : "Ingrese un C&oacute;digo de Cliente.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				rangelength : "El C&oacute;digo de Cliente debe contener entre 1 y 4 car&aacute;cteres."
			},
			descripcion : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n debe contener entre 3 y 40 car&aacute;cteres."
			},
			idEmpresa : {
				required : "Seleccione una empresa",
				notOnlySpace : "El C&oacute;digo de Empresa no puede contener solo espacios en blanco.",
				selectlength : "El C&oacute;digo de Empresa debe contener entre 1 y 4 car&aacute;cteres."
			}
		}
	});

	$formAsociacionSubBin.validate({
		rules : {
			codigoBIN : {
				required : true,
				number : true,
				selectlength : [ 6, 11 ]
			},
			codigoSubBIN : {
				required : true,
				number : true,
				selectlength : 2
			}
		},
		messages : {
			codigoBIN : {
				required : "Seleccione un BIN.",
				number : "El c&oacute;digo de BIN debe ser un n&uacute;mero.",
				selectlength : "El c&oacute;digo de BIN debe contener entre 6 y 11 d&iacute;gitos."
			},
			codigoSubBIN : {
				required : "Seleccione SubBIN.",
				number : "El C&oacute;digo de SubBIN debe ser un n&uacute;mero.",
				selectlength : "El C&oacute;digo de SubBIN debe contener 2 d&iacute;gitos."
			}
		}
	});

});