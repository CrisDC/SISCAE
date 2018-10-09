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
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoPrestamo;
import pe.edu.unmsm.fisi.siscae.service.IAreaAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoPrestamoService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/movimientoPrestamo")
public @RestController class MovimientoPrestamoController {
	
	private @Autowired IMovimientoPrestamoService movimientoPrestamoService;
	
	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarAreaAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody MovimientoPrestamo movimientoPrestamo,
			Errors error) {
		if (error.hasErrors()) {
			System.out.println("ERROR DESDE AQUI \n\n\n"+ValidatorUtil.obtenerMensajeValidacionError(error)+"\n\n\nHASTA AQuI");
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		movimientoPrestamo.setNombreUsuario(SecurityContextFacade.obtenerNombreUsuario()); 
		
		System.out.println(movimientoPrestamo);
		
		SecurityContextFacade.obtenerNombreUsuario();
		movimientoPrestamo.setNumDocumentoSolicitante(movimientoPrestamo.getNumDocumentoSolicitante().trim());
		System.out.println("Atributo 'numDocumentoSolicitante': "+movimientoPrestamo.getNumDocumentoSolicitante());
		System.out.println("Atributo 'nombreUsuario': "+movimientoPrestamo.getNombreUsuario());
		System.out.println("Atributo 'idRecurso': "+movimientoPrestamo.getIdRecurso());
		
		
		movimientoPrestamoService.registrarMovimientoPrestamo(movimientoPrestamo);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
}
