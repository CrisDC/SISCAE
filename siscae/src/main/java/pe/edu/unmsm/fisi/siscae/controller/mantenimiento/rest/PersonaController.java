package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Alumno;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;
import pe.edu.unmsm.fisi.siscae.service.IPersonaService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.PERSONA, datos = Dato.PERSONA)
@RequestMapping("/persona")
public @RestController class PersonaController {

	private @Autowired IPersonaService personaService;

	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
	@GetMapping(params = "accion=buscarTodos")
	public List<Persona> buscarTodos() {
		return personaService.buscarTodos();
	}
	
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "search")
    public List<Persona> buscar(@RequestParam("search") String search)
    {	
    	List<Persona> alumnos =  personaService.buscarTodos();
    	return  alumnos.stream().filter(x -> ((x.getNumDocumento()+" "+x.getNombre()+" "+x.getAppPaterno()+" "+x.getAppMaterno()).toUpperCase()).contains(search.toUpperCase())).limit(5).collect(Collectors.toList());
    }

	@Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	@PostMapping
	public ResponseEntity<?> registrarPersona(
			@Validated({ Default.class, IRegistro.class }) @RequestBody Persona persona, Errors error) {

		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		personaService.registrarPersona(persona);
		return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	}

	@Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
	@PutMapping
	public ResponseEntity<?> actualizarPersona(
			@Validated({ Default.class, IActualizacion.class }) @RequestBody Persona persona, Errors error) {

		if (error.hasErrors()) {
			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		personaService.actualizarPersona(persona);
		return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	}

	@Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
	@DeleteMapping
	public ResponseEntity<?> eliminarPersona(@Validated(IActualizacion.class) @RequestBody Persona persona,
			Errors error) {

		if (error.hasErrors()) {

			throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
		}
		personaService.eliminarPersona(persona);
		return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	}
	
	
	
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
	@GetMapping(params = "accion=buscarIdPersona")
	public Persona buscarIdPersona(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		
		System.out.println("angel was here");
		System.out.println(criterioBusqueda.getNumeroDocumento());
		System.out.println(criterioBusqueda.getIdTipoDocumento());
		return personaService.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}
	

}
