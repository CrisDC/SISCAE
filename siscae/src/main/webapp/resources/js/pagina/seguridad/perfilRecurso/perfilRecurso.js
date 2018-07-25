$(document).ready(function() {

	var csrf = $('meta[name=_csrf]').attr("content");
	var $local = {
		$modalPerfilRecurso : $("#modalPerfilRecurso"),
		$registrarRecursoModal : $("#registrarRecursoModal"),
		$tablaPerfilRecurso : $("#tablaPerfilRecurso"),
		tablaPerfilRecurso : "",
		$tablaAsignacionPermisos : $("#tablaAsignacionPermisos"),
		tablaAsignacionPermisos : "",
		codigo_perfilrecursoSeleccionado : "",
		$titulo : $("#titulo"),
		$filaSeleccionada : "",
		$resultadoBusqueda : $("#resultadoBusqueda"),
		$cardbloque : $("#card-bloque"),
		$btnAsignarPermisos : $("#btnAsignarPermisos"),
		$tablasRecursos : $(".tablaCategoria")
	};

	$opcion = "";
	$frmexample = $("#frm-example");
	var prueba = $local.$tablaAsignacionPermisos.DataTable({
		"paging" : false,
		"scrollX" : true
	});

	console.log("PERFIL RECURSO");
	$local.$tablaRecursos.find("tbody").find("tr").filter(function() {
		console.log($(this).attr("data-acciones"));
	});

	$local.tablaPerfilRecurso = $local.$tablaPerfilRecurso.DataTable({
		"ajax" : {
			"url" : $variableUtil.root + "perfilRecurso?accion=buscarTodos",
			"dataSrc" : ""
		},
		"language" : {
			"emptyTable" : "No hay PERFILES Y RECURSOS registradas"
		},
		"initComplete" : function() {
			$local.$tablaPerfilRecurso.wrap("<div class='table-responsive'></div>");
		},
		"columnDefs" : [ {
			"targets" : [ 0, 1 ],
			"className" : "all filtrable",
		}, {
			"targets" : 2,
			"className" : "all dt-center",

			"defaultContent" : $variableUtil.botonPermisos
		} ],
		"columns" : [ {
			"data" : 'idPerfil',
			"title" : 'Perfil'
		}, {
			"data" : 'descripcion',
			"title" : 'Descripcion'
		}, {
			"title" : 'Accion'
		} ]
	});

	$local.$modalPerfilRecurso.PopupWindow({
		title : "Mantenimiento de Privilegios",
		autoOpen : false,
		modal : false,
		height : 300,
		width : 640,
	});
	var codPerfil;

	$variable = codPerfil;

	$local.$tablaPerfilRecurso.children("tbody").on("click", ".permiso", function() {
		$local.$filaSeleccionada = $(this).parents("tr");
		var perfilrecurso = $local.tablaPerfilRecurso.row($local.$filaSeleccionada).data();
		$local.codigo_perfilSeleccionado = perfilrecurso.idPerfil;
		codPerfil = $local.codigo_perfilSeleccionado;

		$local.$titulo.text("Asignar Permisos a " + codPerfil);
		// console.log("PERFIL SELECCIONADO : " +
		// $local.codigo_perfilSeleccionado);
		$("#label").val($local.codigo_perfilSeleccionado);
		$("#hidden").val(codPerfil);

		// console.log($(".card-bloque"));
		// $(".card-bloque").trigger("removeElements");

		$opcion = codPerfil;
		$("#idPerfil").val($opcion);

		// $.ajax({
		// type : "GET",
		// url : $variableUtil.root + "recursosPerfil/" + codPerfil,
		// dataType : "json",
		// beforeSend : function(xhr) {
		// // console.log($(this));
		// $(this).find("i").removeClass("fa-floppy-o").addClass("fa-spinner
		// fa-pulse fa-fw");
		// xhr.setRequestHeader('Content-Type', 'application/json');
		// xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
		// },
		// success : function(categoria) {
		// $(".card").show();
		// for ( var sub in categoria) {
		// var categoriax=categoria[sub].categoria;
		// var recursos = categoria[sub].recursos;
		// // console.log("CATEGORIA : "+categoriax);
		// var card = $("#card-bloque-model").clone();
		// card.attr("id","card-bloque");
		// card.attr("class","card-bloque");
		// card.find("a").text(categoriax);
		// card.children("#collapseOne").attr("id","collapse"+categoriax);
		// card.find("a").attr("href", "#collapse"+categoriax);
		//                    
		// for ( var rec in recursos) {
		// var idRecurso=recursos[rec].idRecurso;
		// var permisox=recursos[rec].permiso;
		// // console.log("prueba : "+idRecurso);
		// // console.log("permisos : "+permisox);
		// var suma="";
		// if(permisox!=null){
		// for ( var i=0;i<permisox.length;i++) {
		// suma+="<td><input name='colorfavorito' id='id"+i+"'
		// class='checkeable' value='"+permisox.charAt(i)+"' type='checkbox'"+
		// (permisox.charAt(i) == 1?"checked":"")+"></></td>"
		// // suma+="<td><input id='id"+i+"' class='checkeable'
		// value='"+permisox.charAt(i)+"' type='checkbox'"+ (permisox.charAt(i)
		// == 1?"checked":"")+"></></td>"
		// // console.log("char : "+permisox.charAt(i));
		// }
		// }
		// card.find("#tabla tbody").append("<tr id='id'
		// data-cadena="+permisox+"><td style='width:
		// 65%;'>"+idRecurso+"</td>"+suma+"</tr>");
		// }
		// $("#card-bloque-model").parent().append(card);
		// }
		// $(".card").hide();
		// },
		// error : function() {
		// console.log("error");
		// },
		// complete : function(response) {
		// //$(this).attr("disabled",
		// false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner
		// fa-pulse fa-fw");
		// }
		// });
		$local.$modalPerfilRecurso.PopupWindow("open");
	});

	$('#modalPerfilRecurso').on("change", "input.checkeable", function() {
		var valor;
		if ($(this).is(':checked')) {
			valor = 1;
		} else {
			valor = 0;
		}

		var id = $(this).attr("id");
		console.log("ID =" + id);
		var posicion = Number(id.charAt(2));
		console.log("Posicion =" + posicion);
		var tr = $(this).parents('tr');
		console.log("TR =");
		console.log(tr);
		var cadena = tr.data('cadena');
		console.log("Cadena =" + cadena);
		var cadenax = cadena.toString();
		console.log("tipo de la cadena : " + typeof (cadenax));
		cadenaModo = cadenax.substr(0, posicion) + valor + cadenax.substr(posicion + 1);
		console.log("Cadena modificadoa =" + cadenaModo);
		console.log("tipo de la cadena modificada : " + typeof (cadenaModo));

		console.log(tr.data('cadena', cadenaModo));

		recurso = tr.find("td").eq(0).html();
		var perfil = $opcion;
		var permiso = cadenaModo;

		$.ajax({
			type : "POST",
			url : $variableUtil.root + "asignacionPermisos?perfil=" + perfil + "&recurso=" + recurso + "&permiso=" + permiso,
			beforeSend : function(xhr) {
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
			},
			success : function(response) {
				console.log("exito");
			},
			error : function() {
				console.log("error");
			}
		})
	});

	// $local.$btnAsignarPermisos.on("click", function(e) {
	// $local.$modalPerfilRecurso.PopupWindow("close");
	// });

	// $('#modalPerfilRecurso').on("removeElements",
	// "div.card-bloque",function(){
	// $(this).remove();
	// });

	// $('#modalPerfilRecurso').on("change", "input.checkeable",function(){
	// var valor;
	// if ($(this).is(':checked')) {
	// valor = 1;
	// }else{
	// valor = 0;
	// }
	//
	// var id = $(this).attr("id");
	// console.log("ID =" + id );
	// var posicion = Number(id.charAt(2));
	// console.log("Posicion =" + posicion );
	// var tr = $(this).parents('tr');
	// console.log("TR =");
	// console.log(tr);
	// var cadena = tr.data('cadena');
	// console.log("Cadena =" + cadena );
	// console.log("tipo de dato : "+typeof(cadena));
	// console.log("longitud : "+cadena.length);
	// // if(cadena.length > 1){
	// // cadenaModo = cadena.substr(0, posicion) + valor +
	// cadena.substr(posicion+1);
	// // console.log("Cadena modificada 1 = " + cadenaModo );
	// // }else{
	// // cadenaModo = valor;
	// // console.log("Cadena modificada 2 = " + cadenaModo );
	// // }
	// cadenaModo = cadena.substr(0, posicion) + valor +
	// cadena.substr(posicion+1);
	// console.log("Cadena modificada 1 = " + cadenaModo );
	// console.log("tipo cadena modig¿ficada : "+typeof(cadenaModo));
	// var permiso=cadenaModo;
	// var perfil=$opcion;
	//        
	// recurso = tr.find("td").eq(0).html();
	//        
	// var data = {'perfil':perfil,'recurso':recurso,'permiso':permiso};
	// $.ajax({
	// type : "POST",
	// url : $variableUtil.root +
	// "asignacionPermisos?perfil="+perfil+"&recurso="+recurso+"&permiso="+permiso,
	// beforeSend : function(xhr) {
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	// },
	// success : function(response) {
	// console.log("exito");
	// },
	// error : function() {
	// console.log("error");
	// }
	// })
	// });

	// $("#tablaAsignacionPermisos").on('click', 'input#checkPadre', function()
	// {
	// var rows = $local.tablaAsignacionPermisos.rows({
	// 'search' : 'applied'
	// }).nodes();
	// $('input[type="checkbox"]', rows).prop('checked', this.checked);
	// });

	// $('#tablaAsignacionPermisos tbody').on('change',
	// 'input[type="checkbox"]', function() {
	// if (!this.checked) {
	// var el = $('#checkPadre').get(0);
	// if (el && el.checked && ('indeterminate' in el)) {
	// el.indeterminate = true;
	// }
	// }
	// });

	// $local.$registrarRecursoModal.on("click", function(e) {
	//		
	// var cont = 0;
	// var selected = "";
	//
	// $('#tablaAsignacionPermisos input:checked').each(function() {
	// var recurso = $(this).attr('name');
	// selected += recurso+',';
	// var cadenaRecurso=selected.substring(0,selected.length-1);
	// console.log("ACUMILADO PARA LLEVAR : "+cadenaRecurso);
	// var idPerfil = $("#hidden").val();
	//				
	// var data = {'cadenaRecurso':cadenaRecurso,'idPerfil':idPerfil};
	// $.ajax({
	// type : "POST",
	// url : $variableUtil.root +
	// "asignacionPerfilRecurso?cadenaRecurso="+cadenaRecurso+"&idPerfil="+idPerfil,
	// beforeSend : function(xhr) {
	//
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
	// },
	// success : function(response) {
	// console.log("exito");
	// },
	// error : function() {
	// console.log("error");
	// }
	// });
	// });
	// $local.$modalPerfilRecurso.PopupWindow("close");
	// });

});
