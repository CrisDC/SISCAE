$(document).ready(function() {
	$formBusquedaCriterios.validate({
		focusCleanup : true,
		rules : {			
			idOrigenArchivo : {
				range : [ -1, 99 ]
			}
			
		},
		messages : {			
			idOrigenArchivo : {
				range : "El Origen de Archivo no debe ser mayor que 99."
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