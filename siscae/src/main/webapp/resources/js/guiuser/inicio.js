function copiar(e) {
	//Capturo el DIV
	let click = document.getElementById("for-each");

	click.addEventListener("click", function (e) {
		var targ = $(e.target)
		console.log(targ[0]);
		let recurso=targ[0].id;
		/*swal("Solicitud de cubiculo "+recurso, {
			title: "Solicitud de cubiculo "+recurso,
			text: "Ingrese su carnet de biblioteca por el scanner",
			content: "input",
			icon: "images/nuevo_gif.gif",
		});*/
		swal({
  title: 'Multiple inputs',
  html:
    '<input id="swal-input1" class="swal2-input">' +
    '<input id="swal-input2" class="swal2-input">',
  focusConfirm: false,
  preConfirm: function () {
    return new Promise(function (resolve) {
      resolve([
        $('#swal-input1').val(),
        $('#swal-input2').val()
      ])
    })
  }
}).then(function (result) {
  swal(JSON.stringify(result))
}).catch(swal.noop)
		
	})

}

copiar();


$('#salida').click(function () {
	swal("Registrar salida",{
		title: "Registrar salida",
		text: "Ingrese su carnet de biblioteca por el scanner",
		content: "input",
		icon: "images/nuevo_gif.gif",
	});
	$.get('/prestamo', { userId : 1234 }, function(resp) {
		console.log(resp);
	});
})


$.ajax({
	// la URL para la petición
	url : '/prestamo',
 
	// la información a enviar
	// (también es posible utilizar una cadena de datos)
	data : { id: "123" },
 
	// especifica si será una petición POST o GET
	type : 'GET',
 
	// el tipo de información que se espera de respuesta
	dataType : 'json',
 
	// código a ejecutar si la petición es satisfactoria;
	// la respuesta es pasada como argumento a la función
	success : function(json) {
		$('<h1/>').text(json.title).appendTo('body');
		$('<div class="content"/>')
			.html(json.html).appendTo('body');
	},
 
	// código a ejecutar si la petición falla;
	// son pasados como argumentos a la función
	// el objeto de la petición en crudo y código de estatus de la petición
	error : function(xhr, status) {
		alert('Disculpe, existió un problema');
	},
 
	// código a ejecutar sin importar si la petición falló o no
	complete : function(xhr, status) {
		alert('Petición realizada');
	}
});