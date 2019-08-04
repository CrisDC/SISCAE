package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;


import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Usuario;
import pe.edu.unmsm.fisi.siscae.service.IUsuarioService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;
//@Audit(tipo = Tipo.RECURSO, datos = Dato.RECURSO)
@RequestMapping("/usuario")
public @RestController class UsuarioController {

	private @Autowired IUsuarioService usuarioService;
	
	/*Metodo validarPassword,recibe una contraseña y la valida que la conincidicencia del parametro "clave" enviado por parámetro
	 * si son identicas devuelve true, si no false*/
	
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaPassword)
	@GetMapping(params = "accion=validarPassword")
	public boolean validarPassword(String clave) {
		return usuarioService.verificarPassword(clave);
	}
	
	
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
	
	/*Metodo para actualizar contraseña tipo PUT recibe parametro un objeto de tipo usuario*/
	@Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
	@PutMapping
	public ResponseEntity<?> actualizarPassword(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Usuario usuario, Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		
		usuarioService.cambiarPassword(usuario);
		return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_PASSWORD_EXISTOSA);
	}
	
	/*metodo que se uso para prueba con getMapping*/
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaPassword)
	@GetMapping( params = "accion=cambiarPasswordPrueba")
	public void pruebaCambio() {
			
		usuarioService.cambiarPassword("123456");
		
	}
	/*metodo que se uso para prueba con RequestMapping y la contraseña es enviada por parámetro, este es mejor*/
	 @RequestMapping(value="cambio/{pass}",method=RequestMethod.GET)
     @ResponseBody
	public String cambioConVariable(@PathVariable String pass) {
			usuarioService.cambiarPassword(pass);
			return "Se hizo el cambio a" + pass;
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
