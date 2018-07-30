$(document).ready(function() {

	$formPerfil.validate({
		focusCleanup : true,
		rules : {
			idPerfil : {
				required : true,
				notOnlySpace : true,
				lettersonly : true
			},
			descripcion : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idPerfil : {
				required : "Ingrese un C&oacute;odigo de Perfil.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				lettersonly : "Ingese S&oacute;lo letras"
			},
			descripcion : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco."
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
	
	$formPerfilModal.validate({
		focusCleanup : true,
		rules : {
			idPerfil : {
				required : true,
				notOnlySpace : true,
				lettersonly : true

			},
			descripcion : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idPerfil : {
				required : "Ingrese un C&oacute;odigo de Perfil.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				lettersonly : "Ingese S&oacute;lo letras"

			},
			descripcion : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco."
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