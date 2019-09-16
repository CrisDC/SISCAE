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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoInfraccion;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoInfraccionService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/movimientoInfraccion")
public @RestController class MovimientoInfraccionController {

	private @Autowired IMovimientoInfraccionService movimientoInfraccionService;
	
	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarInfraccion(
			@Validated({ Default.class, IRegistro.class }) @RequestBody MovimientoInfraccion movimientoInfraccion,
			Errors error) {

		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}

		movimientoInfraccion.setNombreUsuario(SecurityContextFacade.obtenerNombreUsuario());
		movimientoInfraccionService.registrarInfraccion(movimientoInfraccion);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
	
	
	
}