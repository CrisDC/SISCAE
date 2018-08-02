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

import pe.edu.unmsm.fisi.siscae.aspecto.anotacion.Audit;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Accion;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Comentario;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Dato;
import pe.edu.unmsm.fisi.siscae.aspecto.enumeracion.Tipo;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.AreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IAreaEstudioService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo=Tipo.AREA_ESTUDIO, datos=Dato.AREA_ESTUDIO)
@RequestMapping("/areaEstudio")
public class AreaEstudioController {
	private @Autowired IAreaEstudioService areaEstudioService;
	
	@GetMapping(params = "accion=buscarTodos")
    public List<AreaEstudio> buscarTodos()
    {
        return areaEstudioService.buscarTodos();
    }
	
	 @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	    @PostMapping
	    public ResponseEntity<?> registrarAreaEstudio(
	            @Validated({ Default.class, IRegistro.class }) @RequestBody AreaEstudio areaEstudio,
	            Errors error)
	    {
	        if (error.hasErrors())
	        {
	            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
	        }
	        areaEstudioService.registrarAreaEstudio(areaEstudio);
	        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	    }
	 
	 @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
	    @PutMapping
	    public ResponseEntity<?> actualizarAreaEstudio(
	            @Validated({ Default.class, IActualizacion.class }) @RequestBody AreaEstudio areaEstudio,
	            Errors error)
	    {
	        if (error.hasErrors())
	        {
	            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
	        }
	        areaEstudioService.actualizarAreaEstudio(areaEstudio);
	        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	    }
	 @Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
	    @DeleteMapping
	    public ResponseEntity<?> eliminarAreaEstudio(
	            @Validated(IActualizacion.class) @RequestBody AreaEstudio areaEstudio, Errors error)
	    {
	        if (error.hasErrors())
	        {
	            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
	        }
	        areaEstudioService.eliminarAreaEstudio(areaEstudio);
	        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	    }
	 
}
