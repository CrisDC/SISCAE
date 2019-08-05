$(document).ready(function() {

	$formMantenimiento.validate({
		focusCleanup : true,
		rules : {
			idTabla : {
				required : true,
				number : true,
				range : [ 1, 99 ]
			},
			nombre : {
				required : true,
				notOnlySpace : true
			},
			descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 80 ]
			},
			descripcionCorta :{
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 80 ]
			}
		},
		messages : {
			idTabla : {
				required : "Ingrese un Identificador de Tabla.",
				number : "El Identificador de Tabla debe ser un n&uacute;mero.",
				range : "El Identificador de Tabla debe estar entre 1 y 99."
			},
			nombre: {
				required :"Ingrese nombre de la Tabla",
				notOnlySpace : "El nombre no puede contener solo espacios en blanco"
			},
			descripcion : {
				required : "Ingrese una descripci&oacute;n.",
				notOnlySpace : "La descripci&oacute;n no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n debe contener entre 3 y 80 car&aacute;cteres"
			},
			descripcionCorta : {
				required : "Ingrese una descripci&oacute;n corta.",
				notOnlySpace : "La descripci&oacute;n corta no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n corta debe contener entre 3 y 80 car&aacute;cteres"
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
			} else {
				error.insertAfter(element);
			}
		}
	});

});