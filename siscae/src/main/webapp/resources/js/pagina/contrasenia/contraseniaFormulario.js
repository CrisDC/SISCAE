$(document).ready(function() {

	$formContrasenia.validate({
		focusCleanup : true,
		rules : {
			id_usuario : {
				required : true,
				lettersonly : true
			},
			id_perfil : {
				required : true,
				notOnlySpace : true
			},
			contraseniaActual : {
				required : true

			},
			nuevaContrasenia : {
				required : true,

				segContrasenia : true
			},
			nuevaContrasenia2 : {
				required : true,

				equalTo : "#nuevaContrasenia"
			}
		},
		messages : {
			id_usuario : {
				required : "Ingrese un C&oacute;odigo de Recurso.",
				number : "El C&oacute;digo de Recurso debe ser una letra.",

			},
			id_perfil : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco."
			},
			contraseniaActual : {
				required : "Ingrese la contraseña actual.",

			},
			nuevaContrasenia : {
				required : "Ingrese contraseña nueva.",

				segContrasenia : "<b>La Contraseña no cumple con las condiciones.</b> </br>" +
						". Debe tener como m&iacute;nimo 8 caracteres. </br>" +
						". Debe contener al menos un n&uacute;mero,una letra may&uacute;scula y una min&uacute;scula."
			},
			nuevaContrasenia2 : {
				required : "Confirme contraseña nueva.",

				equalTo : "Contraseñas no Coninciden"
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