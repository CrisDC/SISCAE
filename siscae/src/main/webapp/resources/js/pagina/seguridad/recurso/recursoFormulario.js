$(document).ready(function() {

	$formRecurso.validate({
		focusCleanup : true,
		rules : {
			idRecurso : {
				required : true,
				lettersonly : true
			},
			descripcion : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idRecurso : {
				required : "Ingrese un C&oacute;odigo de Recurso.",
				number : "El C&oacute;digo de Recurso debe ser una letra.",

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
	
	$formRecursoModal.validate({
		focusCleanup : true,
		rules : {
			idRecurso : {
				required : true,
				lettersonly : true
			},
			descripcion : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idRecurso : {
				required : "Ingrese un C&oacute;odigo de Recurso.",
				number : "El C&oacute;digo de Recurso debe ser una letra.",

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