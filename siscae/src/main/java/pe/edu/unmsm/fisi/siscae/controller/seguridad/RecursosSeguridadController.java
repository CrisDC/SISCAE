package pe.edu.unmsm.fisi.siscae.controller.seguridad;

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
import pe.edu.unmsm.fisi.siscae.model.seguridad.RecursoSeguridad;

import pe.edu.unmsm.fisi.siscae.service.IRecursoSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/recursosSeguridad")
public @RestController class RecursosSeguridadController {

	private @Autowired IRecursoSeguridadService recursoSeguridadService;
	
	@Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<RecursoSeguridad> buscarTodos()
    {
        return recursoSeguridadService.buscarTodos();
    }
    

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarRecursoSeguridad(
            @Validated({ Default.class, IRegistro.class }) @RequestBody RecursoSeguridad recursoSeguridad,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        recursoSeguridadService.registrarRecursoSeguridad(recursoSeguridad);
        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
    }
    
    @Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarRecursoSeguridad(
            @Validated({ Default.class, IActualizacion.class }) @RequestBody RecursoSeguridad recursoSeguridad,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        recursoSeguridadService.actualizarRecursoSeguridad(recursoSeguridad);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    }
    

    @Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarRecursoSeguridad(
            @Validated(IActualizacion.class) @RequestBody RecursoSeguridad recursoSeguridad, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        recursoSeguridadService.eliminarRecursoSeguridad(recursoSeguridad);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
	
}
