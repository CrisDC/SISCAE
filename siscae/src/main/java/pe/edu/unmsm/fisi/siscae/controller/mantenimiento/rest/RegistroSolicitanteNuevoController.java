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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.RegistroSolicitanteNuevo;
import pe.edu.unmsm.fisi.siscae.service.IRegistroSolicitanteNuevoService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/registroSolicitanteNuevo")
public @RestController class RegistroSolicitanteNuevoController {
	
	private @Autowired IRegistroSolicitanteNuevoService RegistroSolicitanteNuevoService;
	
	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarAreaAdministrativo(
			@Validated({ Default.class, IRegistro.class }) @RequestBody RegistroSolicitanteNuevo RegistroSolicitanteNuevo,
			Errors error) {
		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		RegistroSolicitanteNuevo.setUsuario(SecurityContextFacade.obtenerNombreUsuario()); 
		
		System.out.println(RegistroSolicitanteNuevo);
		
		SecurityContextFacade.obtenerNombreUsuario();
		RegistroSolicitanteNuevo.setNumDocumentoSolicitante(RegistroSolicitanteNuevo.getNumDocumentoSolicitante().trim());
		System.out.println("Atributo 'numDocumentoSolicitante': "+RegistroSolicitanteNuevo.getNumDocumentoSolicitante());
		System.out.println("Atributo 'usuario': "+RegistroSolicitanteNuevo.getUsuario());
		System.out.println("Atributo 'idTipoDocumentoSolicitante': "+RegistroSolicitanteNuevo.getIdTipoDocumentoSolicitante());
		System.out.println("Atributo 'appPaterno': "+RegistroSolicitanteNuevo.getAppPaterno());
		System.out.println("Atributo 'appMaterno': "+RegistroSolicitanteNuevo.getAppMaterno());
		System.out.println("Atributo 'nombre': "+RegistroSolicitanteNuevo.getNombre());
		System.out.println("Atributo 'sexo': "+RegistroSolicitanteNuevo.getSexo());
		System.out.println("Atributo 'fechaNac': "+RegistroSolicitanteNuevo.getFechaNac());
		System.out.println("Atributo 'telefono': "+RegistroSolicitanteNuevo.getTelefono());
		System.out.println("Atributo 'tipoAcademico': "+RegistroSolicitanteNuevo.getTipoAcademico());
		System.out.println("Atributo 'ocupacion': "+RegistroSolicitanteNuevo.getOcupacion());
		System.out.println("Atributo 'idEscuela': "+RegistroSolicitanteNuevo.getIdEscuela());
		System.out.println("Atributo 'codigoAlumno': "+RegistroSolicitanteNuevo.getCodigoAlumno());
		RegistroSolicitanteNuevoService.registrarRegistroSolicitanteNuevo(RegistroSolicitanteNuevo);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}
}

