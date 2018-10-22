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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoConsultarEstadoSolicitante;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoConsultarEstadoSolicitanteService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/movimientoConsultarEstadoSolicitante")
public @RestController class MovimientoConsultarEstadoSolicitanteController {
	
	private @Autowired IMovimientoConsultarEstadoSolicitanteService MovimientoConsultarEstadoSolicitanteService;
	
	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarAreaAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody MovimientoConsultarEstadoSolicitante MovimientoConsultarEstadoSolicitante,
			Errors error) {
		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		 
		System.out.println("Atributo 'numDocumentoSolicitante': "+MovimientoConsultarEstadoSolicitante.getNumDocumentoSolicitante());
		
		MovimientoConsultarEstadoSolicitanteService.registrarMovimientoConsultarEstadoSolicitante(MovimientoConsultarEstadoSolicitante);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
}


