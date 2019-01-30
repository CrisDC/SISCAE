$(document).ready(function() {
	$formEstadisticas.validate({
		focusCleanup : true,
		rules : {
			tipoGrafica : {
				required : true
			},
			tipoPeriodo : {
				required : true
			},
			fechaPrestamo : {
				required : true
			},
			valSemanaIncio : {
				required : true
			},
			valSemanaFin : {
				required : true
			},
			valMesIncio : {
				required : true
			},
			valMesFin : {
				required : true
			},
			valAnioInicio : {
				required : true,
				number : true
			},
			valAnioFin : {
				required : true
			},
			valSeries : {
				required : true
			},
			valEjeX : {
				required : true
			},
			valPresentacion : {
				required : true
			}				
		},
		messages : {
			tipoGrafica : {
				required : 'Seleccione un tipo de gráfica.'
			},
			tipoPeriodo : {
				required : 'Seleccione un periodo.'
			},
			fechaPrestamo : {
				required : 'Seleccione un intervalo de fecha.'
			},
			valSemanaIncio : {
				required : 'Seleccione un semana inicio.'
			},
			valSemanaFin : {
				required : 'Seleccione un semana fin.'
			},
			valMesIncio : {
				required : 'Seleccione un mes inicio.'
			},
			valMesFin : {
				required : 'Seleccione un mes fin.'
			},
			valAnioInicio : {
				required : 'Seleccione un año inicio.',
				number : 'Debe ser un número.'
			},
			valAnioFin : {
				required : 'Seleccione un año fin.',
				number : 'Debe ser un número.'
			},
			valSeries : {
				required : 'Seleccione un serie.'
			},
			valEjeX : {
				required : 'Seleccione un eje X.'
			},
			valPresentacion : {
				required : 'Seleccione una presentacion.'
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
