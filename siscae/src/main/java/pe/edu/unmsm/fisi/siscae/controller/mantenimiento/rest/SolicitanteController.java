package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Solicitante;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Solicitante;
import pe.edu.unmsm.fisi.siscae.service.ISolicitanteService;
import pe.edu.unmsm.fisi.siscae.service.ISolicitanteService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.SOLICITANTE, datos = Dato.SOLICITANTE)
@RequestMapping("/solicitante")
public @RestController class SolicitanteController {
	private @Autowired ISolicitanteService SolicitanteService;

	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarSolicitante(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Solicitante Solicitante, Errors error) {
		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		Solicitante.setUsuario(SecurityContextFacade.obtenerNombreUsuario());
		Solicitante.setNumDocumentoSolicitante(Solicitante.getNumDocumentoSolicitante().trim());
		SolicitanteService.registrarSolicitante(Solicitante);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}

	@Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
	@PutMapping
	public ResponseEntity<?> actualizarSolicitante(
			@Validated({ Default.class, IActualizacion.class }) @RequestBody Solicitante Solicitante, Errors error) {
		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		Solicitante.setUsuario(SecurityContextFacade.obtenerNombreUsuario());
		Solicitante.setNumDocumentoSolicitante(Solicitante.getNumDocumentoSolicitante().trim());
		SolicitanteService.actualizarSolicitante(Solicitante);
		return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	}

	@Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
	@DeleteMapping
	public ResponseEntity<?> eliminarSolicitante(@Validated(IActualizacion.class) @RequestBody Solicitante Solicitante,
			Errors error) {
		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		Solicitante.setNumDocumentoSolicitante(Solicitante.getNumDocumentoSolicitante().trim());
		SolicitanteService.eliminarSolicitante(Solicitante);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}

}
