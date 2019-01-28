//$formBusquedaTipoDocumento.validate({
//		focusCleanup : true,
//		rules : {
//			tipoDocumento : {
//				required : true
//			},
//			numeroDocumento : {
//				rangelength : [ 0, 20 ]
//			},
//			selectTipoGrafica : {
//				required : true,
//				number : true,
//				rangelength : [ 1, 2 ]
//			},
//			selectTipoCriterio : {
//				required : true,
//				number : true,
//				rangelength : [ 1, 2 ]
//			}
//			
//		},
//		messages : {
//			tipoDocumento : {
//				required : "Seleccione un Tipo de Documento.",
//				number : "El Tipo de Documento debe ser un n&uacute;mero.",
//				rangelength : "El Tipo de Documento debe contener entre 1 y 4 d&iacute;gitos."
//			},
//			numeroDocumento : {
//				rangelength : "El N&uacute;mero de Documento debe contener entre 0 y 20 c&aacute;racteres."
//			}
//		},
//		highlight : function(element) {
//			$(element).parents(".group, .form-group").first().addClass('has-error');
//		},
//		unhighlight : function(element) {
//			$(element).parents(".group, .form-group").first().removeClass('has-error');
//		},
//		errorElement : 'span',
//		errorClass : 'help-block',
//		errorPlacement : function(error, element) {
//			if (element.parent('.input-group').length) {
//				error.insertAfter(element.parent());
//			} else if (element.parent().find("span.select2").length > 0) {
//				error.appendTo(element.parent());
//			} else {
//				error.insertAfter(element);
//			}
//		}
//	});