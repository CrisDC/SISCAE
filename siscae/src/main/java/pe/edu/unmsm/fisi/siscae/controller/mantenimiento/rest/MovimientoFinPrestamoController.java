package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoFinPrestamo;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoFinPrestamoService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/movimientoFinPrestamo")
public @RestController class MovimientoFinPrestamoController {
	
	private @Autowired IMovimientoFinPrestamoService movimientoFinPrestamoService;
	
	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarAreaAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody MovimientoFinPrestamo movimientoFinPrestamo,
			Errors error) {
		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		movimientoFinPrestamo.setNombreUsuario(SecurityContextFacade.obtenerNombreUsuario()); 
		
		System.out.println(movimientoFinPrestamo);
		System.out.println("Atributo 'numDocumentoSolicitante': "+movimientoFinPrestamo.getNumDocumentoSolicitante());
		System.out.println("Atributo 'nombreUsuario': "+movimientoFinPrestamo.getNombreUsuario());
		
		
		movimientoFinPrestamoService.registrarMovimientoFinPrestamo(movimientoFinPrestamo);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
}

