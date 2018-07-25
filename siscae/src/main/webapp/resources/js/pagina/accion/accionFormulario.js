$(document).ready(function() {

	$formAccion.validate({
		focusCleanup : true,
		rules : {
			idAccion : {
				required : true,
				notOnlySpace : true,
				digits : true
			},
			accion : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idAccion : {
				required : "Ingrese un C&oacute;digo Acci&oacute;n",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				digits : "Ingrese S&oacute;lo números"
			},
			accion : {
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
	
	$formAccionModal.validate({
		focusCleanup : true,
		rules : {
			idAccion : {
				required : true,
				notOnlySpace : true,
				digits : true

			},
			accion : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idAccion : {
				required : "Ingrese un C&oacute;digo Acci&oacute;n",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				digits : "Ingrese S&oacute;lo números"

			},
			accion : {
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