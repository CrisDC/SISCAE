package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.practicas;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.practica.Prestamo;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.service.practica.IPrestamoService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;


public @RestController class PrestamoController {

	
	private @Autowired IPrestamoService prestamoService;
	
	
	public List<Prestamo> buscarTodos(){
		
		return prestamoService.buscarTodos();
		
	}
	
	public ResponseEntity<?> registrarPrestamo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Prestamo prestamo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		prestamoService.registrarPrestamo(prestamo);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
				
	}
	
	public ResponseEntity<?> actualizarPrestamo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Prestamo prestamo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		prestamoService.actualizarPrestamo(prestamo);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
				
	}
	
	public ResponseEntity<?> eliminarPrestamo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Prestamo prestamo,
			Errors error){
		
		if(error.hasErrors()){
			 throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		prestamoService.eliminarPrestamo(prestamo);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
				
	}
	
	
}
