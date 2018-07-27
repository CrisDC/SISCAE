package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.practicas;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.practica.Administrativo;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.service.practica.IAdministrativoService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;


public @RestController class AdministrativoController {

	private @Autowired IAdministrativoService administrativoService;
	
	public List<Administrativo> buscarTodos(){
		
		return administrativoService.buscarTodos();
		
	}
	
	public ResponseEntity<?> registrarAdministrativo(
		@Validated({ Default.class, IRegistro.class }) @RequestBody Administrativo administrativo,
		Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		administrativoService.registrarAdministrativo(administrativo);
		 return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
	
	public ResponseEntity<?> actualizarAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Administrativo administrativo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		administrativoService.actualizarAdministrativo(administrativo);
		 return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	}
	
	public ResponseEntity<?> eliminarAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Administrativo administrativo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		
		administrativoService.eliminarAdministrativo(administrativo);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}
	
}
