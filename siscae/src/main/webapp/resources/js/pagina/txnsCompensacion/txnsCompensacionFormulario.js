$(document).ready(function() {

	$formBusquedaTipoDocumento.validate({
		focusCleanup : true,
		rules : {
			tipoDocumento : {
				required : true,
				number : true,
				rangelength : [ 1, 4 ]
			},
			numeroDocumento : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 1, 20 ]
			}
		},
		messages : {
			tipoDocumento : {
				required : "Seleccione un Tipo de Documento.",
				number : "El Tipo de Documento debe ser un n&uacute;mero.",
				rangelength : "El Tipo de Documento debe contener entre 1 y 4 d&iacute;gitos."
			},
			numeroDocumento : {
				required : "Ingrese un N&uacute;mero de Documento.",
				notOnlySpace : "El N&uacute;mero de Documento no puede contener solo espacios en blanco.",
				rangelength : "El N&uacute;mero de Documento debe contener entre 1 y 20 c&aacute;racteres."
			}
		},
		highlight : function(element) {
			$(element).parents(".group, .form-group").first().addClass('has-error');
		},
		unhighlight : function(element) {
			$(element).parents(".group, .form-group").first().removeClass('has-error');
		},
		errorElement : 'span',
		errorClass : 'help-block',
		errorPlacement : function(error, element) {
			if (element.parent('.input-group').length) {
				error.insertAfter(element.parent());
			} else if (element.parent().find("span.select2").length > 0) {
				error.appendTo(element.parent());
			} else {
				error.insertAfter(element);
			}
		}
	});
	
	$formBusquedaCriterios.validate({
		focusCleanup : true,
		rules : {
			numeroTarjeta : {
				number: true,
				notOnlySpaceOrEmpty : true,
				maxlength : 20
			},
			trace : {
				number: true,
				notOnlySpaceOrEmpty : true,
				maxlength : 15
			},
			autorizacion : {
				number: true,
				notOnlySpaceOrEmpty : true,
				maxlength : 15
			},
			codigoMembresia : {
//				lettersonly : true
			},
			codigoClaseServicio : {
//				lettersonly : true

			},
			codigoOrigen : {
				number : true
			},
			codigoClaseTxn : {
				number : true
			},
			codigoTxn : {
				number : true
			},
			idCanal : {
				number : true
			},
			codigoInstitucionEmisor : {
				number : true
			},
			codigoInstitucionReceptor : {
				number : true
			},
			codigoBIN : {
				number : true
			},
			codigoSubBIN : {
				number : true
			},
			codigoRespuestaSwitch : {
				number : true
			},
			codigoMoneda : {
				number : true
			}
		},
			messages : {
				numeroTarjeta : {
					notOnlySpaceOrEmpty : "El N&uacute;mero de Tarjeta no debe contener solo espacios en blanco.",
					number : "El N&uacute;mero de Tarjeta debe ser un n&uacute;mero.",
					maxlength : "El N&uacute;mero de Tarjeta no debe contener m&aacute;s de 20 d&iacute;gitos."
				},
				trace : {
					notOnlySpaceOrEmpty : "El N&uacute;mero de Trace no debe contener solo espacios en blanco.",
					number : "El N&uacute;mero de Trace debe ser un n&uacute;mero.",
					maxlength : "El N&uacute;mero de Trace no debe contener m&aacute;s de 20 d&iacute;gitos."
				},
				autorizacion : {
					notOnlySpaceOrEmpty : "El N&uacute;mero de Autorizaci&oacute;n no debe contener solo espacios en blanco.",
					number : "El N&uacute;mero de Autorizaci&oacute;n debe ser un n&uacute;mero.",
					maxlength : "El N&uacute;mero de Autorizaci&oacute;n no debe contener m&aacute;s de 20 d&iacute;gitos."
				},
				codigoMembresia : {
					number : "El Codigo de Membresia debe ser un n&uacute;mero."
				},
				codigoClaseServicio : {
					number : "El Codigo de Clase Servicio debe ser un n&uacute;mero."
				},
				codigoOrigen : {
					number : "El Codigo de Origen debe ser un n&uacute;mero."
				},
				codigoClaseTxn : {
					number : "El Codigo de Clase Transaccion debe ser un n&uacute;mero."
				},
				codigoTxn : {
					number : "El Codido de Transaccion debe ser un n&uacute;mero."
				},
				idCanal : {
					number : "El N&uacute;mero de Canal debe ser un n&uacute;mero."
				},
				codigoInstitucionEmisor : {
					number : "El Codigo de Institucion debe ser un n&uacute;mero."
				},
				codigoInstitucionReceptor : {
					number : "El Codigo de Institucion debe ser un n&uacute;mero."
				},
				codigoBIN : {
					number : "El Codigo de BIN debe ser un n&uacute;mero."
				},
				codigoSubBIN : {
					number : "El Codigo de SubBIN debe ser un n&uacute;mero."
				},
				codigoRespuestaSwitch : {
					number : "El Codigo de Respuesta debe ser un n&uacute;mero."
				},
				codigoMoneda : {
					number : "El Codigo de Moneda debe ser un n&uacute;mero."
				}
			},
				highlight : function(element) {
					$(element).parents(".group, .form-group").first().addClass('has-error');
				},
				unhighlight : function(element) {
					$(element).parents(".group, .form-group").first().removeClass('has-error');
				},			
				errorElement : 'span',
				errorClass : 'help-block',
				errorPlacement : function(error, element) {
					if (element.parent('.input-group').length) {
						error.insertAfter(element.parent());
					} else if (element.parent().find("span.select2").length > 0) {
						error.appendTo(element.parent());
					} else {
						error.insertAfter(element);
					}
				}
	});
});