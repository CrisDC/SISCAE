$(document).ready(function() {
	console.log("formulariogaaa3");
	$formPrestamos.validate({	
		rules : {
			areaEstudio : {
				required : true,
				number : true
			}
			 },
		messages : {
			areaEstudio : {
				required : "Selecciona un area de estudio",
				number:"El Id del area de Estudio  debe contener solo n&uacute;meros.",
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