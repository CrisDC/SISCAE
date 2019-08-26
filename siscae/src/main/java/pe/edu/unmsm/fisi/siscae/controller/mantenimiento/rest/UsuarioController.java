package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;


import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.Usuario, datos = Dato.USUARIO)
@RequestMapping("/usuario")
public @RestController class UsuarioController {

	private @Autowired IUsuarioService usuarioService;
	
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
	@GetMapping(params = "accion=buscarTodos")
	public List<Usuario> buscarTodos(){
		return usuarioService.buscarTodos();
	}
	
	public ResponseEntity<?> registrarUsuario(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Usuario usuario, Errors error){
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		usuarioService.registrarUsuario(usuario);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
		
	}
	
	public ResponseEntity<?> actualizarUsuario(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Usuario usuario, Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		usuarioService.actualizarUsuario(usuario);
		return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	}
	
	
	public ResponseEntity<?> eliminarUsuario(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Usuario usuario, Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		usuarioService.eliminarUsuario(usuario);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
		
	}
	
	
}
