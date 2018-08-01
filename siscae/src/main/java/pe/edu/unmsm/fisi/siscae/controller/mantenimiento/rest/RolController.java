package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Rol;
import pe.edu.unmsm.fisi.siscae.service.IRolService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

public @RestController class RolController {
	
	private @Autowired IRolService rolService;
	
	
	
	public List<Rol> buscarTodos(){
		return rolService.buscarTodos();
	}
	
	
	public ResponseEntity<?> registrarRol(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Rol rol, Errors error){
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		rolService.registrarRol(rol);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
		
	}
	public ResponseEntity<?> actualizarRol(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Rol rol, Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		rolService.actualizarRol(rol);
		return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	}
	
	public ResponseEntity<?> eliminarRol(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Rol rol, Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		rolService.eliminarRol(rol);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
		
	}
	
	
	
	
	
}


