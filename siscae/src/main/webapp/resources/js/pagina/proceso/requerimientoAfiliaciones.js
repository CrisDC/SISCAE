var controlLoteModel;
$(document).ready(function() {

					var $local = {
						$aniadirNuevoPedido : $("#aniadirNuevoPedido"),
						$modalNuevoPedido : $("#modalNuevoPedido"),
						tipoFormulario : "",
						$filaSeleccionada : "",
						$selecOneMenuCategoria : $("#categoria"),
						nextStep1 : $("#next1"),
						codigoBIN :  "",
						categoriaSeleccionado : "",
						$innominadas : $("#innominadas"),
						$nominadas : $("#nominadas"),
						$tablaNuevosPedidos : $("#tablaNuevosPedidos"),
						tablaNuevosPedidos : "",
						$bin : $("#bin"),
						$subBin : $("#producto"),
						$selecOneMenuProducto : $("#producto"),
						$cargarNuevoPedido : $("#cargarNuevoPedido"),
						$modalDetalleNuevoPedido : $("#modalDetalleMantenimiento"),
						$buttonFinalizar : $("#buttonFinalizar"),
						$buttonFinalizarIn : $("#buttonFinalizarIn"),
						$actualizarControlLote : $("#actualizarControlLote"),
						idClienteSeleccionado : "",
						$selecOneMenuTipoDocumento : $("#tipoDocumento"),
						$inputNumDocumento : $("#numDocumento"),
						$inputNombres : $("#nombres"),
						$inputApellidos : $("#apellidos"),
						$inputNombreEnTarjeta : $("#nombreEnTarjeta"),
						$selecOneMenuMonedaRecarga : $("#monedaRecarga"),
						$inputMontoRecarga : $("#montoRecarga"),
						$inputVigenciaTarjeta : $("#vigenciaTarjeta"),
						$inputCorreoElectronico : $("#correoElectronico"),
						$inputDireccion : $("#direccion"),
						$inputTelefonoFijo : $("#telefonoFijo"),
						$inputTelefonoMovil : $("#telefonoMovil"),
						$selecOneMenuNacionalidades : $("#nacionalidad"),
						$navListItems : $('div.setup-panel div a'),
					    $allWells : $('.setup-content'),
					    $allNextBtn : $('.nextBtn'),
						$allPrevBtn : $('.prevBtn'),
						$step1 : $("#step1"),
						$step2 : $("#step2"),
						$inputCantidadPedido : $("#txtCantidadPedido"),
						$inputNombreCliente : $("#txtNombreCliente"),
						$selectOneMenuOrigenesArchivo : $("#origenesArchivo"),
						$tablaConsulta : $("#tablaConsulta"),
						tablaConsulta : "",
						$tipoBusqueda : $("input[type=radio][name=tipoBusqueda]"),
						$rangoFechas : $("#rangoFechas"),
						$clientes : $("#clientes"),
						$estados : $("#estados"),
						filtrosSeleccionables : [],
						$agregableCliente : "",
						$agregableEstado : "",
						$clientesFiltroParaTablaMantenimiento : $("#clientes-filtroParaTablaMantenimiento"),
						$estadosFiltroParaTablaMantenimiento : $("#estados-filtroParaTablaMantenimiento"),
						$selecOneMenuEmpresas : $("#empresa"),
						$selecOneMenuClientes : $("#cliente"),
						empresaSeleccionada : "",
						clienteSeleccionada : "",
						$uploadFile : $("#uploadfile"),
						$filaSeleccionadaTablaConsulta : "",
						$modalDetalleTablaConsulta : $("#modalDetalleTablaConsulta"),
						$tablaDetalleConsulta : $("#tablaDetalleConsulta"),
						tablaDetalleConsulta : "",
						$inputCantidadPedido : $("#cantidadPedido"),
						afinidadSeleccionada : "",
						$inputAfinidad : $("#afinidad"),
						$divTablaDetalleConsulta : $("#divTablaDetalleConsulta"),
						$btnRecarga : $("#btnRecarga"),
						loteSeleccionado : ""
					};

					
					$funcionUtil.crearSelect2($local.$selecOneMenuEmpresas);
					$funcionUtil.crearSelect2($local.$selecOneMenuClientes);
					$funcionUtil.crearSelect2($local.$bin);
					$funcionUtil.crearSelect2($local.$subBin);
					$funcionUtil.crearSelect2($local.$selecOneMenuCategoria);
					
					
					$formNuevoPedido = $("#formNuevoPedido");
					$formDetalleControlLote = $("#formDetalleControlLote");
					$local.$allWells.hide();
					
					$local.$uploadFile.change(handleExcelFile);

					$local.$aniadirNuevoPedido.on("click", function() {
						$local.$modalNuevoPedido.PopupWindow("open");
						$local.$step2.attr( "disabled", true );
						$local.$navListItems.removeClass('btn-primary').addClass('btn-default');
						$local.$step1.addClass('btn-primary');
					    $local.$allWells.hide();
					    $($local.$step1.attr('href')).show();
					    $($local.$step1.attr('href')).find('input:eq(0)').focus();
					    $local.$bin.empty();
					    $local.tablaNuevosPedidos.clear().draw();
					    $local.$uploadFile.val('');
					    clienteSeleccionada = "";
					    empresaSeleccionada = "";
					    categoriaSeleccionado = "";
					    $local.$inputCantidadPedido.val('');
					    afinidadSeleccionada = "";
					    
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "bin?accion=buscarTodos",
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(bines) {
								$local.$selecOneMenuProducto.empty();
								$local.$selecOneMenuProducto.append($(
										"<option></option>").val("").text(
										"Seleccione Producto"));
								var $opcion = $("<option></option>");
								$opcion.val(-1).text("Seleccione BIN");
								$local.$bin.append($opcion);
								$.each(bines, function(i, bin) {
									$opcion = $("<option></option>");
									$opcion.val(bin.codigoBIN).text(
											bin.codigoBIN + "-"
													+ bin.descripcion);
									$local.$bin.append($opcion);
								});
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
						
						
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "empresa?accion=buscarTodos",
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(empresas) {
								$local.$selecOneMenuEmpresas.empty();
								$local.$selecOneMenuClientes.empty();
								$local.$selecOneMenuClientes.append($("<option></option>").val("").text("Seleccione Cliente"));
								var $opcion = $("<option></option>");
								$opcion.val(-1).text("Seleccione Empresa");
								$local.$selecOneMenuEmpresas.append($opcion);
								$.each(empresas, function(i, empresa) {
									$opcion = $("<option></option>");
									$opcion.val(empresa.idEmpresa).text(
											empresa.idEmpresa + "-"
													+ empresa.descripcion);
									$local.$selecOneMenuEmpresas.append($opcion);
								});
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
					});

					$local.tablaNuevosPedidos = $local.$tablaNuevosPedidos
							.DataTable({
								"language" : {
									"emptyTable" : "No hay pedidos registradas"
								},
								"initComplete" : function() {
									$local.$tablaNuevosPedidos
											.wrap("<div class='table-responsive'></div>");
								},
								"columnDefs" : [ {
									"targets" : 7,
									"render" : function(data, type, row, meta) {
										if (row.respCode == -1) {
											return "<button type='button' class='btn btn-success actualizar'>Corregir</button>";
										} else {
											return "";
										}
									}
								} ],
								"columns" : [ 
							    {
							    	"data" : "idControlLote",
							    	"title" : "Nro"
							    },{
									"data" : "persona.tipoDocumento",
									"title" : "Tipo Documento"
								}, {
									"data" : "persona.numDocumento",
									"title" : "Num. Documento"
								}, {
									"data" : "persona.nombres",
									"title" : "Nombres"
								}, {
									"data" : "persona.apePaterno",
									"title" : "Apellidos"
								}, {
									"data" : "persona.nomCliente",
									"title" : "Cliente"
								}, {
									"data" : "recarga.montoEnviadoo",
									"title" : 'Recarga'
								}, {
									"data" : null,
									"title" : 'Accion'
								} ]
							});

					$local.$modalNuevoPedido.PopupWindow({
						title : "Nuevo pedido",
						autoOpen : false,
						modal : true,
						height : 715,
						width : 1200,
					});

					$local.$modalDetalleNuevoPedido.PopupWindow({
						title : "Editar pedido",
						autoOpen : false,
						modal : false,
						height : 480,
						width : 700,
					});
					
					$local.$modalDetalleTablaConsulta.PopupWindow({
						autoOpen : false,
						modal : true,
						title : "Detalle del pedido",
						height : 580,
						width : 900,
					});

					$local.$selecOneMenuCategoria.on('change', function() {
						categoriaSeleccionado = $('#categoria option:selected').val();
					});
					
					$local.$selecOneMenuEmpresas.on('change',function(){
						empresaSeleccionada = $local.$selecOneMenuEmpresas.find('option:selected').val();
						$local.$selecOneMenuClientes.empty();
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "cliente/empresa/"+empresaSeleccionada,
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(clientes) {
								var $opcion = $("<option></option>");
								$opcion.val("").text("Seleccione Cliente");
								$local.$selecOneMenuClientes.append($opcion);
								$.each(clientes, function(i, cliente) {
									$opcion = $("<option></option>");
									$opcion.val(cliente.descripcion).text(cliente.idCliente + "-"+ cliente.descripcion);
									$local.$selecOneMenuClientes.append($opcion);
								});
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
					});
					

					$local.$bin.on('change', function() {
						codigoBIN = $(this).val();
						console.log("codigoBIN::"+codigoBIN);
						$local.$selecOneMenuProducto.empty();
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "subBin/bin/"+ codigoBIN,
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(productos) {
								var $opcion = $("<option></option>");
								$opcion.val("").text("Seleccione Producto");
								$local.$selecOneMenuProducto.append($opcion);
								$.each(productos, function(i, producto) {
									$opcion = $("<option></option>");
									$opcion.val(producto.codigoSubBIN).text(
											producto.codigoSubBIN + "-"
													+ producto.descripcion);
									$local.$selecOneMenuProducto
											.append($opcion);
								});
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
					});

					$local.$tablaNuevosPedidos.children("tbody").on("click","button",function() {
						$funcionUtil.prepararFormularioActualizacion($formDetalleControlLote);
						$local.$filaSeleccionada = $(this).parents("tr");
						var controlLote = $local.tablaNuevosPedidos.row($local.$filaSeleccionada).data();
 						
 						$.ajax({
							type : "GET",
							url : $variableUtil.root + "proceso/nacionalidades",
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(nacionalidades) {
								$local.$selecOneMenuNacionalidades.empty();
								var $opcion = $("<option></option>");
								$opcion.val("").text("SELECCIONE NACIONALIDAD");
								$local.$selecOneMenuNacionalidades.append($opcion);
								$.each(nacionalidades, function(i, nacionalidad) {
									$opcion = $("<option></option>");
									$opcion.val(nacionalidad.idElemento).text(nacionalidad.valorLiteral);
									$local.$selecOneMenuNacionalidades.append($opcion);
								});
								$local.$selecOneMenuNacionalidades.val(controlLote.persona.nacionalidad).trigger("change.select2");
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
 						
 						
 						$.ajax({
							type : "GET",
							url : $variableUtil.root + "proceso/tipodocumento",
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(tiposDocumentos) {
								$local.$selecOneMenuTipoDocumento.empty();
								var $opcion = $("<option></option>");
								$opcion.val("").text("SELECCIONE TIPODOCUMENTO");
								$local.$selecOneMenuTipoDocumento.append($opcion);
								$.each(tiposDocumentos, function(i, tipoDocumento) {
									$opcion = $("<option></option>");
									console.log("idElemento:"+tipoDocumento.idElemento+"- valorLiteral:"+tipoDocumento.valorLiteral);
									$opcion.val(tipoDocumento.idElemento).text(tipoDocumento.valorLiteral);
									$local.$selecOneMenuTipoDocumento.append($opcion);
								});
								$local.$selecOneMenuTipoDocumento.val(controlLote.persona.tipoDocumento).trigger("change.select2");
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
 						
 						$.ajax({
							type : "GET",
							url : $variableUtil.root + "proceso/monedasrecargas",
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(monedasRecargas) {
								$local.$selecOneMenuMonedaRecarga.empty();
								var $opcion = $("<option></option>");
								$opcion.val("").text("SELECCIONE TIPODOCUMENTO");
								$local.$selecOneMenuMonedaRecarga.append($opcion);
								$.each(monedasRecargas, function(i, monedaRecarga) {
									$opcion = $("<option></option>");
									$opcion.val(monedaRecarga.idElemento).text(monedaRecarga.valorLiteral);
									$local.$selecOneMenuMonedaRecarga.append($opcion);
									console.log("monedaRecarga.idElemento:"+monedaRecarga.idElemento+"- .valorLiteral:"+monedaRecarga.valorLiteral);
									$local.$selecOneMenuMonedaRecarga.val(monedaRecarga.idElemento).trigger("change.select2");
								});
								$local.$selecOneMenuMonedaRecarga.val(controlLote.recarga.moneda).trigger("change.select2");
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
 						$.each(controlLote.respCodeControlLote, function(index, value){
 							console.log("Index = " + index + " value = " + value); 
 							$("#" + index).css('color', 'red');
 						});
 						
						$local.$inputNumDocumento.val(controlLote.persona.numDocumento);
						$local.$inputNombres.val(controlLote.persona.nombres);
						$local.$inputApellidos.val(controlLote.persona.apePaterno);
						$local.$inputNombreEnTarjeta.val(controlLote.persona.alias);
						$local.$inputMontoRecarga.val(controlLote.recarga.montoEnviadoo);
						$local.$inputVigenciaTarjeta.val(controlLote.cardLife);
						$local.$inputCorreoElectronico .val(controlLote.persona.correoElectronico);
						$local.$inputDireccion.val(controlLote.persona.direccion);
						$local.$inputTelefonoFijo .val(controlLote.persona.telFijo);
						$local.$inputTelefonoMovil.val("");
 						controlLoteModel = controlLote;
						$local.$modalDetalleNuevoPedido.PopupWindow("open");
					});
					
					$local.$actualizarControlLote.on("click",function(){
						if (!$formDetalleControlLote.valid()) {
							return;
						}
						$funcionUtil.notificarException($variableUtil.actualizacionExitosa, "fa-check", "Aviso", "success");
						$local.tablaNuevosPedidos.row($local.$filaSeleccionada).remove().draw(false);
						controlLoteModel.persona.tipoDocumento = $local.$selecOneMenuTipoDocumento.find('option:selected').val();
						controlLoteModel.persona.numDocumento = $local.$inputNumDocumento.val();
						controlLoteModel.persona.nombres = $local.$inputNombres.val();
						controlLoteModel.persona.apPaterno = $local.$inputApellidos.val();
						controlLoteModel.persona.alias = $local.$inputNombreEnTarjeta.val();
						controlLoteModel.recarga.montoEnviadoo = $local.$inputMontoRecarga.val();
						controlLoteModel.cardLife = $local.$inputVigenciaTarjeta.val();
						controlLoteModel.persona.correoElectronico = $local.$inputCorreoElectronico.val();
						controlLoteModel.persona.direccion = $local.$inputDireccion.val();
						controlLoteModel.persona.telFijo = $local.$inputTelefonoFijo.val();
						controlLoteModel.persona.telMovil = $local.$inputTelefonoMovil.val();
						controlLoteModel.persona.nacionalidad = $local.$selecOneMenuNacionalidades.find('option:selected').val();
						$.each(controlLoteModel.respCodeControlLote, function(index, value){
 							console.log("Index = " + index + " value = " + value); 
 							$("#" + index).css('color', 'black');
 						});
						controlLoteModel.respCode = 0;
						
						var row = $local.tablaNuevosPedidos.row.add(controlLoteModel).draw();
						row.show().draw(false);
						$(row.node()).animateHighlight();
						$local.$modalDetalleNuevoPedido.PopupWindow("close");
					});
					
					$local.$selecOneMenuProducto.on('change',function(){
						afinidadSeleccionada = "00"+$(this).val();
						console.log("afinidadSeleccionada:"+afinidadSeleccionada);
					});
					
					
					$local.$buttonFinalizarIn.on("click", function(){
						var cantidadPedido = $local.$inputCantidadPedido.val();
						if(cantidadPedido==''){
							$funcionUtil.notificarException("Debe ingresar la cantidad del pedido", "fa-warning", "Aviso", "warning");
							return;
						}
						
						var codigoSubBin = $local.$selecOneMenuProducto.find('option:selected').val();
						var loteInnominada = {
							"nIdLote" : null, //no se llena este dato
							"nIdInstitucion" : null, // se llena en el servicio rest valor 68 jet peru
							"dFechaProceso" : null, // envio por java en el servicio rest
							"codigoBIN" : codigoBIN,
							"codigoSubBIN" : codigoSubBin,
							"ivAfinidad" : afinidadSeleccionada, 
							"tipoEmision" : "001",  // ???
							"nEstadoLote" : 1, 
							"nInstancia" : 1,  //????
							"nIdEmpresa" : empresaSeleccionada,
							"nIdClienteLote" : $local.$selecOneMenuClientes.find('option:selected').text().substring(0,1),
							"cantidadLote" : $local.$inputCantidadPedido.val()
						};
						
						$.ajax({
							type : "POST",
							url : $variableUtil.root + "proceso/loteInnominada",
							data : JSON.stringify(loteInnominada), 
							beforeSend : function(xhr) {
								xhr.setRequestHeader('Content-Type',
										'application/json');
								xhr.setRequestHeader("X-CSRF-TOKEN",
										$variableUtil.csrf);
							},
							success : function() {
								$local.tablaConsulta.ajax.reload();
								$funcionUtil.notificarException("Se cargo los pedidos exitosamente", "fa-check", "Aviso", "success");
								$local.$modalNuevoPedido.PopupWindow("close");
							},
							complete : function() {

							}
						});
						
						
					});

					$local.$buttonFinalizar.on("click", function() {
						if($local.$uploadFile.val()==''){
							$funcionUtil.notificarException("Debe seleccionar un archivo excel", "fa-warning", "Aviso", "warning");
							return;
						}
						var lstControlLote = $local.tablaNuevosPedidos.rows().data().toArray();
						var flag = true;
						$.each(lstControlLote,function(i,controlLote){
							if(controlLote.respCode!=0) flag = false;
						});
						
						if(!flag) {
							$funcionUtil.notificarException("Debe corregir todos los registros de la tabla", "fa-warning", "Aviso", "warning");
							return;
						}
						
						var codigoSubBin = $local.$selecOneMenuProducto.find('option:selected').val();
						console.log("codigoSubBin:"+codigoSubBin);
						console.log("empresaSeleccionada:"+empresaSeleccionada);
						var loteDto = {
							"nIdLote" : null,
							"nEstadoLote" : 1,
							"dFechaRegistro" : null,
							"dFechaModificacion" : null,
							"nInstancia" : 1,
							"nIdInstitucion" : null,
							"clSubBin" :  {
								"codigoSubBIN" : codigoSubBin,
								"codigoBIN" : codigoBIN,
								"codigoCliente" : null,
								"descripcion" : null
							},
							"clCliente" : {
								"idCliente" : null,
								"idEmpresa" : empresaSeleccionada, // verificar envio
								"descripcion" : null
							},
							"sNombreArchivo" : null,
							"nSecuencia" : null,
							"lstControlLote" : lstControlLote
						};
						$.ajax({
							type : "POST",
							url : $variableUtil.root + "proceso/lote",
							data : JSON.stringify(loteDto),
							beforeSend : function(xhr) {
								xhr.setRequestHeader('Content-Type',
										'application/json');
								xhr.setRequestHeader("X-CSRF-TOKEN",
										$variableUtil.csrf);
							},
							success : function() {
								$local.tablaConsulta.ajax.reload();
								$funcionUtil.notificarException("Se cargo los pedidos exitosamente", "fa-check", "Aviso", "success");
								$local.$modalNuevoPedido.PopupWindow("close");
							},
							complete : function() {

							}
						});
						
					});
					

					
					
					$local.$navListItems.click(function (e) {
					 e.preventDefault();
					 var $target = $($(this).attr('href')), $item = $(this);
					
					 if (!$item.hasClass('disabled')) {
						 $local.$navListItems.removeClass('btn-primary').addClass('btn-default');
					     $item.addClass('btn-primary');
					     $local.$allWells.hide();
					     $target.show();
					     $target.find('input:eq(0)').focus();
					 }
					});
					
					$local.$allPrevBtn.click(function(){
						 var curStep = $(this).closest(".setup-content"),
					     curStepBtn = curStep.attr("id"),
					     prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");
					
					     prevStepWizard.removeAttr('disabled').trigger('click');
					});
					
					$local.$allNextBtn.click(function(){
					 var curStep = $(this).closest(".setup-content"),
					     curStepBtn = curStep.attr("id"),
					     nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
					     curInputs = curStep.find("input[type='text'],input[type='url']"),
					     isValid = true;
					
					 $(".form-group").removeClass("has-error");
					 for(var i=0; i<curInputs.length; i++){
					     if (!curInputs[i].validity.valid){
					         isValid = false;
					         $(curInputs[i]).closest(".form-group").addClass("has-error");
					     }
					 }
					 
					 categoriaSeleccionado = $('#categoria option:selected').val();
						switch (categoriaSeleccionado) {
						case "nominadas":
							$local.$nominadas.removeClass("hidden");
							$local.$innominadas.addClass("hidden");
							$local.$uploadFile.val('');
							$local.tablaNuevosPedidos.clear().draw();
							break;
						case "innominadas":
							$local.$nominadas.addClass("hidden");
							$local.$innominadas.removeClass("hidden");
							var textoProductoSeleccionado = $local.$selecOneMenuProducto.find('option:selected').text();
							$local.$inputAfinidad.val(afinidadSeleccionada + " " +
									"( AFINIDAD ESTANDAR DEL PRODUCTO "+
									textoProductoSeleccionado.substring(3,textoProductoSeleccionado.length)+" )");
							$local.$uploadFile.val('');
							$local.tablaNuevosPedidos.clear().draw();
							break;
					}
					
					if (isValid)
					     nextStepWizard.removeAttr('disabled').trigger('click');
					 
					});
					
					$('div.setup-panel div a.btn-primary').trigger('click');
					
					
					$local.tablaConsulta = $local.$tablaConsulta.DataTable({
						"ajax" : {
							"url" : $variableUtil.root + "proceso/lote?accion=buscarTodos",
							"dataSrc" : ""
						},
						"language" : {
							"emptyTable" : "No hay pedidos registrados"
						},
						"initComplete" : function() {
							$local.$tablaConsulta.wrap("<div class='table-responsive'></div>");
							$local.filtrosSeleccionables["3"] = $local.$clientesFiltroParaTablaMantenimiento.html();
							$local.filtrosSeleccionables["5"] = $local.$estadosFiltroParaTablaMantenimiento.html();
							$tablaFuncion.aniadirFiltroDeBusquedaEnEncabezado(this, $local.$tablaConsulta, $local.filtrosSeleccionables);
							$local.$agregableCliente = $local.$tablaConsulta.find("thead").find("select.agregable-cliente");
							$local.$agregableEstado = $local.$tablaConsulta.find("thead").find("select.agregable-membresia");
						},
						"columnDefs" : [ 
							{
								"targets" : [0,1,2,4],
								"className" : "all filtrable",
								
							},	
						{
							"targets" : 6,
							"className" : "all dt-center",
							"defaultContent" : "<button type='button' class='btn btn-success actualizar'>Ver detalles</button>"
						} ],
						"columns" : [ 
					    {
					    	"data" : function(row){
					    		var date = new Date(row.dfechaRegistro);
					    		var curr_date = date.getDate();
					    		var curr_month = date.getMonth() + 1;
					    		var curr_year = date.getFullYear();
					    		return (curr_date>9?curr_date:"0"+curr_date)+"/"+(curr_month>9?curr_month:"0"+curr_month)+"/"+curr_year;
					    		
					    	},
					    	"title" : "Fecha"
					    },{
							"data" : "nidLote",
							"title" : "Lote"
						}, {
							"data" : function(row) {
								return row.lstControlLote==null ? 0: row.lstControlLote.length;
							},
							"title" : "Cantidad"
						}, {
							"className" : "all seleccionable select2 insertable-opciones-html",
							"data" : "clCliente.descripcion",
							"title" : "Cliente (Empresa)"
						}, {
							"data" : function(row){
								return row.clSubBin.codigoBIN+row.clSubBin.codigoSubBIN;
							},
							"title" : "Producto"
						}, {
							"className" : "all seleccionable select2 insertable-opciones-html",
							"data" :function(row) {
								console.log(row.nestadoLote);
								var sEstado = "";
						    	switch (row.nestadoLote)
						    	{
						    		case 1: sEstado = "Pendiente de emisión"; break;
						    		case 2: sEstado = "En emisión"; break;
						    		case 3: sEstado = "Emitido"; break;
						    		case 4: sEstado = "Pendiente de recarga"; break;
						    		case 5: sEstado = "Enviado para recarga"; break;
						    		case 6: sEstado = "Recargado"; break;
						    		case -1: break;
						    		default: sEstado = "Error";
						    	}
						    	return sEstado;
							},
							"title" : "Estado"
						}, {
							"data" : null,
							"title" : 'Accion'
						} ]
					});
					
					$local.$tablaConsulta.find("thead").on('change', 'select', function() {
						var val = $.fn.dataTable.util.escapeRegex($(this).val());
						console.log("El valor del filtro : " +val);
						$local.tablaConsulta.column($(this).parent().index() + ':visible').search(val ? '^' + val + '$' : '', true, false).draw();
					});
					
					$local.$tablaConsulta.children("tbody").on("click","button",function() {
						$local.tablaDetalleConsulta.clear().draw();
						$local.$filaSeleccionadaTablaConsulta = $(this).parents("tr");
						var lote = $local.tablaConsulta.row($local.$filaSeleccionadaTablaConsulta).data();
						loteSeleccionado = lote;
						console.log("$local.$filaSeleccionadaTablaConsulta:"+$local.$filaSeleccionadaTablaConsulta );
						console.log("length:"+$local.$filaSeleccionadaTablaConsulta.length);
						console.log(lote);
						
						
						$.ajax({
							type : "GET",
							url : $variableUtil.root + "proceso/"+lote.nidLote+"/personas", // cambiar por lote.nIdLote
							statusCode : {
								400 : function(response) {
								}
							},
							success : function(personas) {
								
								if(personas.length==0){
									$local.$divTablaDetalleConsulta.addClass("hidden");
								} else{
									$local.$divTablaDetalleConsulta.removeClass("hidden");
									$.each(personas,function(i,persona){
										$local.tablaDetalleConsulta.row.add([lote.clCliente.descripcion,
																persona.ntipoDocumento,
																persona.numeroDocumento,
																persona.nombres,
																persona.apePaterno+" "+persona.apeMaterno]).draw(false);
									});
								}
								console.log("········");
								console.log(lote.nestadoLote);
								if(lote.nestadoLote==3){
									console.log("Remueve el hidden");
									$local.$btnRecarga.removeClass("hidden");
								}else{
									$local.$btnRecarga.addClass("hidden");
								}
								$local.$modalDetalleTablaConsulta.PopupWindow("open");
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
						
						
					});
					
					
					function handleExcelFile(e){
						$local.tablaNuevosPedidos.clear().draw();
						event.preventDefault();
						var form = $('#formNuevoPedido')[0];
						var data = new FormData(form);
						console.log("data:"+data);
						var nombreCliente = $local.$selecOneMenuClientes.find('option:selected').val();
						console.log("nombreCliente:"+nombreCliente);
						
						var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;  
					     /*Checks whether the file is a valid excel file*/  
					     console.log("nombreArchivo: "+$("#uploadfile").val());
					     if (regex.test($("#uploadfile").val().toLowerCase())) {  
					         var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/  
					         if ($("#uploadfile").val().toLowerCase().indexOf(".xlsx") > 0) {  
					             xlsxflag = true;  
					         }  
					         /*Checks whether the browser supports HTML5*/  
					         if (typeof (FileReader) != "undefined") {
					        	
					         }  
					         else {
					        	 $funcionUtil.notificarException("Sorry! Your browser does not support HTML5!", "fa-warning", "Aviso", "warning");
					        	 $local.$uploadFile.val('');
								 $local.tablaNuevosPedidos.clear().draw();
					        	 return ;
					         }  
					     }  
					     else { 
					    	 $funcionUtil.notificarException("Por favor importe un archivo excel", "fa-warning", "Aviso", "warning");
					    	 $local.$uploadFile.val('');
							 $local.tablaNuevosPedidos.clear().draw();
					    	 return ;
					     }  
					     
						console.log("paso validacion");
						console.log("nombreCliente"+$local.$selecOneMenuClientes.find('option:selected').val());
						$.ajax({
							type : "POST",
							enctype : 'multipart/form-data',
							url : $variableUtil.root + "proceso/uploadfile/"+$local.$selecOneMenuClientes.find('option:selected').val()+"/"+empresaSeleccionada,
							data : data,
							processData : false,
							contentType : false,
							cache : false,
							beforeSend : function(xhr) {
								xhr.setRequestHeader("X-CSRF-TOKEN",
										$variableUtil.csrf);
							},
							statusCode : {
								400 : function(response) {
								},
								409 : function(response) {
									var mensaje = response.responseJSON.motivo;
									$funcionUtil.notificarException(mensaje,
											"fa-warning", "Aviso", "warning");
									$local.$uploadFile.val('');
									$local.tablaNuevosPedidos.clear().draw();
									
								}
							},
							success : function(controlLotes) {
								console.log(controlLotes);
								$local.tablaNuevosPedidos.rows
										.add(controlLotes).draw(false);
							},
							error : function(response) {
							},
							complete : function(response) {
							}
						});
					}
					
					
					
					$local.tablaDetalleConsulta = $local.$tablaDetalleConsulta.DataTable({
						"language" : {
							"emptyTable" : "No hay pedidos registradas"
						},
						"initComplete" : function() {
							$local.$tablaDetalleConsulta.wrap("<div class='table-responsive'></div>");
						},
						"columns" : [ 
					    {
					    	"title" : "Cliente"
					    },{
							"title" : "Tipo de Documento"
						}, {
							"title" : "Nro. Documento"
						}, {
							"title" : "Nombre"
						}, {
							"title" : "Apellido"
						}]
					});
					
					$local.$btnRecarga.on("click",function(){
							console.log(loteSeleccionado);
							$.ajax({
								type : "GET",
								url : $variableUtil.root + "proceso/loteRecarga/"+loteSeleccionado.nidLote,
								statusCode : {
									400 : function(response) {
									}
								},
								success : function() {
									$local.$btnRecarga.val("Enviando a Recarga");
									$local.$btnRecarga.prop('disabled', true);
									$funcionUtil.notificarException("Se realizo la recarga exitosamente", "fa-check", "Aviso", "success");
								},
								complete : function() {

								}
							});
					});
					
					
});