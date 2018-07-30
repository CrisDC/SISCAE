$(document).ready(function()
{
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
			nombres : {
				number: true,
				notOnlySpaceOrEmpty : true,
				maxlength : 50
			},
			apellidos : {
				notOnlySpaceOrEmpty : true,
				maxlength : 50
			},
			codigoTipoDocumento : {
				number: true
			},
			codigoTipoTramite : {
				number: true
			}
		},
		messages : {
			nombres : {
				notOnlySpaceOrEmpty : "Los nombres no deben contener solo espacios en blanco.",
				maxlength : "Los nombres no debe contener m&aacute;s de 50 car&aacute;cteres."
			},
			apellidos : {
				notOnlySpaceOrEmpty : "Los apellidos no deben contener solo espacios en blanco.",
				maxlength : "Los apellidos no debe contener m&aacute;s de 50 car&aacute;cteres."
			},
			codigoTipoDocumento : {
				number : "El C&oacute;digo del Tipo de Documento debe ser un n&uacute;mero."
			},
			codigoTipoTramite : {
				number : "El C&oacute;digo del Tipo de Trámite debe ser un n&uacute;mero."
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