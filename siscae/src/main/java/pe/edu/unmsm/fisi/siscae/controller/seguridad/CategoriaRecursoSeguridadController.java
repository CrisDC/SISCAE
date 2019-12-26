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
import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.service.ICategoriaRecursoSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@RequestMapping("/categoriaRecursoSeguridad")
public @RestController class CategoriaRecursoSeguridadController {

	private @Autowired ICategoriaRecursoSeguridadService categoriaRecursoSeguridadService;

    @Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<CategoriaRecursoSeguridad> buscarTodos()
    {
        return categoriaRecursoSeguridadService.buscarTodos();
    }
    

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarCategoriaRecursoSeguridad(
            @Validated({ Default.class, IRegistro.class }) @RequestBody CategoriaRecursoSeguridad categoriaRecursoSeguridad,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        categoriaRecursoSeguridadService.registrarCategoriaRecursoSeguridad(categoriaRecursoSeguridad);
        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
    }
    
    @Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarCategoriaRecursoSeguridad(
            @Validated({ Default.class, IActualizacion.class }) @RequestBody CategoriaRecursoSeguridad categoriaRecursoSeguridad,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        categoriaRecursoSeguridadService.actualizarCategoriaRecursoSeguridad(categoriaRecursoSeguridad);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    }
    

    @Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarCategoriaRecursoSeguridad(
            @Validated(IActualizacion.class) @RequestBody CategoriaRecursoSeguridad categoriaRecursoSeguridad, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        categoriaRecursoSeguridadService.eliminarCategoriaRecursoSeguridad(categoriaRecursoSeguridad);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
    
	
}
