	$(document).ready(function() {
	$("#btnEnviarDatos").on("click",function(){
				
				
				
				let contraAnterior = $("#contraAnterior").val();
				let contraNueva = $("#contraNueva").val();
				let contraNuevaRep = $("#contraNuevaRep").val();
				
				let contraPasada = $("#contraPasada").val();
				if(contraNueva === contraNuevaRep){
					$.ajax({
						type : "GET",
						url : $variableUtil.root + "username",
						beforeSend : function(xhr) {
							//$local.$actualizarContrasenia.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
							xhr.setRequestHeader('Content-Type', 'application/json');
							xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
						},
						statusCode : {
							400 : function(response) {
								$funcionUtil.limpiarMensajesDeError($formContrasenia);
								$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formContrasenia);
							}
						},
						success : function(usuario) {
							console.log(usuario);
							$.ajax({
								type : "GET",
								url : $variableUtil.root + "usuario?accion=buscarTodos",
								beforeSend : function(xhr) {
									xhr.setRequestHeader('Content-Type', 'application/json');
									xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
								},
								statusCode : {
									400 : function(response) {
									//	$funcionUtil.limpiarMensajesDeError($formContrasenia);
									//	$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formContrasenia);
									}
								},
								success : function(usuarios) {
									var us = [];
									var n ;
									console.log(usuarios);
									for(i=0;i<usuarios.length;i++){
										if(usuarios[i].nombre == usuario){
											n = i;
											var e = new Object();
											e['username']=usuarios[i].nombre;
											e['pass'] = usuarios[i].pass;
											e['ingrepass'] = contraAnterior;
											e['nuevopass'] = contraNueva;
											us.push(e);
										}
									}
									console.log(us);
									
									$.ajax({
										type : "POST",
										url : $variableUtil.root + "cambiocontra",
										dataType: 'json',
										data :  JSON.stringify(us[0]),
										beforeSend : function(xhr) {
											//$local.$actualizarContrasenia.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
											xhr.setRequestHeader('Content-Type', 'application/json');
											xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
										},
										statusCode : {
											400 : function(response) {
											//	$funcionUtil.limpiarMensajesDeError($formContrasenia);
											//	$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formContrasenia);
											}
										},
										success : function(contrasenias) {
											console.log(contrasenias);
											if(contrasenias.nuevopass == "incorrecto"){
												Swal.fire({
													  type: 'error',
													  title: 'Error',
													  text: 'La contraseña anterior escrita no es la correcta'
													})
											}else{
											
												var u ={
														"idUsuario" : usuarios[n].idUsuario,
														"nombre" : usuarios[n].nombre,
														"pass": contrasenias.nuevopass,
														"idEstadoTabla"  :usuarios[n].idEstadoTabla,
														"idRol": usuarios[n].idRol,
														"idPersona" : usuarios[n].idPersona
												}
												console.log(u);
												
												$.ajax({
													type : "PUT",
													url : $variableUtil.root + "usuario",
													dataType: 'json',
													data :  JSON.stringify(u),
													beforeSend : function(xhr) {
														//$local.$actualizarContrasenia.attr("disabled", true).find("i").removeClass("fa-floppy-o").addClass("fa-spinner fa-pulse fa-fw");
														xhr.setRequestHeader('Content-Type', 'application/json');
														xhr.setRequestHeader("X-CSRF-TOKEN", $variableUtil.csrf);
													},
													statusCode : {
														400 : function(response) {
														//	$funcionUtil.limpiarMensajesDeError($formContrasenia);
														//	$funcionUtil.mostrarMensajeDeError(response.responseJSON, $formContrasenia);
														}
													},
													success : function(response) {
														console.log(response);
														console.log("GAAA");
								    					swal({
								    						title: "Cambio de contraseña",
								    					  	text: "La contraseña se cambio con éxito",
								    					  	icon: "success",
								    					  	button: false,
								    					  	timer: 1000,
								    					}).then((value) => {
								    						location.reload();
								    					});
														
													},
													error : function(response) {
													},
													complete : function(response) {
														
														//$local.$actualizarContrasenia.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
													}
												});
											}
										},
										error : function(response) {
										},
										complete : function(response) {
											Swal.fire({
												  type: 'success',
												  title: 'Cambio de contraseña',
												  text: 'La contraseña se cambio con éxito'
												}).then((value)=>{
													location.reload();
												});
											//$local.$actualizarContrasenia.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
										}
									});
									
								},
								error : function(response) {
								},
								complete : function(response) {
									//$local.$actualizarContrasenia.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
								}
							});
						},
						error : function(response) {
						},
						complete : function(response) {
							//$local.$actualizarContrasenia.attr("disabled", false).find("i").addClass("fa-floppy-o").removeClass("fa-spinner fa-pulse fa-fw");
						}
					});
					
				}else{
					Swal.fire({
						  type: 'error',
						  title: 'Error',
						  text: 'Los campos para la contraseña nueva deben ser iguales!'
						});
				}
			});
	
});