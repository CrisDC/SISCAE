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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabCab;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabCabService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.MulTabCab, datos = Dato.MultiTabCab)
@RequestMapping("/multiTabCab")
public @RestController class MultiTabCabController
{
    private @Autowired IMultiTabCabService multiTabCabService;

    @Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<MultiTabCab> buscarTodos()
    {
        return multiTabCabService.buscarTodos();
    }

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarMultiTabCab(
            @Validated({ Default.class, IRegistro.class }) @RequestBody MultiTabCab multiTabCab,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        multiTabCabService.registrarMultiTabCab(multiTabCab);
        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
    }

    @Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarMultiTabCab(@Validated({ Default.class,
            IActualizacion.class }) @RequestBody MultiTabCab multiTabCab, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        multiTabCabService.actualizarMultiTabCab(multiTabCab);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    }

    @Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarMultiTabCab(
            @Validated(IActualizacion.class) @RequestBody MultiTabCab multiTabCab, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        multiTabCabService.eliminarMultiTabCab(multiTabCab);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}