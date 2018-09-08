$(document).ready(function() {

	$formMantenimiento.validate({
		rules : {
			idHorario : {
				required : true,
				number:true
			},
			descripcion : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
			},
			horaInicio : {
				required : true,
				number:true
			},
			horaFin : {
				required : true,
				number:true
			},
			idEstadoTabla : {
				required : true,
				number:true
			},
			tiempoMaximo : {
				required : true,
				number:true
			},
			idTurno : {
				required : true,
				number:true
			},
			descripcionTurno : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
			},
			idDia : {
				required : true,
				number:true
			},
			descripcionDia : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
			},
			idTipoHorario : {
				required : true,
				number:true
			},
			descripcionTipoHorario : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
			},
			idAreaEstudio : {
				required : true,
				number:true
			},
			nombreAreaEstudio : {
				required : true,
				notOnlySpace : true,
				rangelength : [ 3, 70 ]
			}
		},
		messages : {
			idHorario : {
				required : "Ingrese un Id de Horario",
				number:"El Id del Horario debe contener solo n&uacute;meros.",
			},
			descripcion: {
				required : "Ingrese una descripci&oacute;n de Horario.",
				notOnlySpace : "La descripci&oacute;n de Horario no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n de Horario debe contener entre 3 y 70 car&aacute;cteres."
			},
			horaInicio : {
				required : "Ingrese una hora de inicio",
				number:"La hora de inicio  debe contener solo n&uacute;meros.",
			},
			horaFin : {
				required : "Ingrese una hora de fin",
				number:"La hora de fin debe contener solo n&uacute;meros.",
			},
			idEstadoTabla : {
				required : "Ingrese el estado del horario ",
				number:"El Id del estado debe contener solo n&uacute;meros."
			},
			idTurno : {
				required : "Ingrese un Id de Turno",
				number:"El Id del Turno debe contener solo n&uacute;meros.",
			},
			descripcionTurno : {
				required : "Ingrese una descripci&oacute;nde Turno.",
				notOnlySpace : "La descripci&oacute;n de Turno no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n de Turno debe contener entre 3 y 70 car&aacute;cteres."
			},
			idDia : {
				required : "Ingrese un Id de Dia",
				number:"El Id del Dia debe contener solo n&uacute;meros.",
			},
			descripcionDia : {
				required : "Ingrese una descripci&oacute;n de Dia.",
				notOnlySpace : "La descripci&oacute;n del Dia no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n del Dia debe contener entre 3 y 70 car&aacute;cteres."
			},
			idTipoHorario : {
				required : "Ingrese un Id de Tipo de Horario",
				number:"El Id del Tipo de Horario debe contener solo n&uacute;meros.",
			},
			descripcionTipoHorario : {
				required : "Ingrese una descripci&oacute;n del Tipo de Horario.",
				notOnlySpace : "La descripci&oacute;n del Tipo de Horario no puede contener solo espacios en blanco.",
				rangelength : "La descripci&oacute;n del Tipo de Horario debe contener entre 3 y 70 car&aacute;cteres."
			},
			idAreaEstudio : {
				required : "Ingrese un Id de Area de Estudio",
				number:"El Id del Area de Estudio debe contener solo n&uacute;meros.",
			},
			nombreAreaEstudio : {
				required : "Ingrese una nombre de Area de Estudio.",
				notOnlySpace : "Un nombre de Area de estudio no puede contener solo espacios en blanco.",
				rangelength : "Un nombre de Area de estudio debe contener entre 3 y 70 car&aacute;cteres."
			},	
	
		}
	});

});