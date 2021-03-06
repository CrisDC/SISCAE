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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Infraccion;
import pe.edu.unmsm.fisi.siscae.service.IExternoService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento.InfraccionService;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.INFRACCION, datos = Dato.Infraccion)
@RequestMapping("/infraccion")
public @RestController class InfraccionController {
	
	private @Autowired InfraccionService infraccionService;

    @Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<Infraccion> buscarTodos()
    {
    	return infraccionService.buscarTodos();
    }
	
    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarInfraccion(
            @Validated({ Default.class, IRegistro.class }) @RequestBody Infraccion infraccion,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        infraccionService.registrarInfraccion(infraccion);
        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
    }
	
    @Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarInfraccion(
            @Validated({ Default.class, IActualizacion.class }) @RequestBody Infraccion infraccion,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        infraccionService.actualizarInfraccion(infraccion);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    } 
	
    
    @Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarInfraccion(
            @Validated(IActualizacion.class) @RequestBody Infraccion infraccion, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        infraccionService.eliminarInfraccion(infraccion);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
	
	

}
