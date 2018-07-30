$(document).ready(function() {

	$formCategoriaRecurso.validate({
		focusCleanup : true,
		rules : {
			idCategoria : {
				required : true,
				notOnlySpace : true,
				digits : true
			},
			categoria : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idCategoria : {
				required : "Ingrese un C&oacute;digo Categoria de Recurso",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				digits : "Ingrese S&oacute;lo números"
			},
			categoria : {
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
	
	$formCategoriaRecursoModal.validate({
		focusCleanup : true,
		rules : {
			idCategoria : {
				required : true,
				notOnlySpace : true,
				digits : true

			},
			categoria : {
				required : true,
				notOnlySpace : true
			}
		},
		messages : {
			idCategoria : {
				required : "Ingrese un C&oacute;digo Categoria de Recurso",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				digits : "Ingrese S&oacute;lo números"

			},
			categoria : {
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