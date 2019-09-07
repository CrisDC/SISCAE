$(document).ready(function() {
	$formPrestamos.validate({	
		rules : {
			areaEstudio1 : {
				required : true
			}
			 },
		messages : {
			areaEstudio1 : {
				required : "Selecciona un area de estudio",
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