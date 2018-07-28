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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Facultad;
import pe.edu.unmsm.fisi.siscae.service.IEmpresaService;
import pe.edu.unmsm.fisi.siscae.service.IFacultadService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.Fac, datos = Dato.Facultad)
@RequestMapping("/facultad")
public @RestController class FacultadController {
	 private @Autowired IFacultadService facultadService;

	    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
	    @GetMapping(params = "accion=buscarTodos")
	    public List<Facultad> buscarTodos()
	    {
	        return facultadService.buscarTodos();
	    }

	    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
	    @PostMapping
	    public ResponseEntity<?> registrarFacultad(
	            @Validated({ Default.class, IRegistro.class }) @RequestBody Facultad facultad,
	            Errors error)
	    {
	        if (error.hasErrors())
	        {
	            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
	        }
	        facultadService.registrarFacultad(facultad);
	        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
	    }

	    @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
	    @PutMapping
	    public ResponseEntity<?> actualizarFacultad(
	            @Validated({ Default.class, IActualizacion.class }) @RequestBody Facultad facultad,
	            Errors error)
	    {
	        if (error.hasErrors())
	        {
	            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
	        }
	        facultadService.actualizarFacultad(facultad);
	        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
	    }

	    @Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
	    @DeleteMapping
	    public ResponseEntity<?> eliminarFacultad(
	            @Validated(IActualizacion.class) @RequestBody Facultad facultad, Errors error)
	    {
	        if (error.hasErrors())
	        {
	            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
	        }
	        facultadService.eliminarFacultad(facultad);
	        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
	    }

}
