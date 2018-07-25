$(document).ready(function() {

	$formPoliticaSeguridadModal.validate({
		focusCleanup : true,
		rules : {
			numeroMaximoIntentos : {
				required : true,
				notOnlySpace : true,
				digits : true
			},
			complejidadContrasenia : {
				required : true,
				digits : true
			},
			cantidadDiasParaCaducidadContrasenia : {
				required : true,
				notOnlySpace : true,
				digits : true
			},
			longitudMinimaContrasenia : {
				required : true,
				notOnlySpace : true,
				digits : true
			},
			autenticacionActiveDirectory : {
				required : true,
				digits : true
			}
		},
		messages : {
			numeroMaximoIntentos : {
				required : "Ingrese N&uacute;mero M&aacute;ximo de Intentos",
				notOnlySpace : "No puede contener solo espacios en blanco",
				digits : "Ingrese Solo n&uacute;meros"
			},
			complejidadContrasenia : {
				required : "Ingrese Complejidad de Contrasenia",
				digits : "Ingrese Solo n&uacute;meros"
			},
			cantidadDiasParaCaducidadContrasenia : {
				required : "Ingrese Cantidad de Dias",
				notOnlySpace : "No puede contener solo espacios en blanco",
				digits : "Ingrese Solo n&uacute;meros"
			},
			longitudMinimaContrasenia : {
				required : "Ingrese Longitud M&iacute;nima para Contrasenia",
				notOnlySpace : "No puede contener solo espacios en blanco",
				digits : "Ingrese Solo n&uacute;meros"
			},
			autenticacionActiveDirectory : {
				required : "Ingrese una Autenticaci&oacute;n",
				digits : "Ingrese Solo n&uacute;meros"
			}
		},
		highlight : function(element) {
			$(element).closest('.form-group').addClass('has-error');
		},
		unhighlight : function(element) {
			$(element).closest('.form-group').removeClass('has-error');
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