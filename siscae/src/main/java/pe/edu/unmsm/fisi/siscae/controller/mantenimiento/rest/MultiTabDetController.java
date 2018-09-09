package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;

import javax.validation.groups.Default;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.service.IMultiTabDetService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.IdTabla;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.MulTabDet, datos = Dato.MultiTabDet)
@RequestMapping("/multiTabDet")
public @RestController class MultiTabDetController
{
    private @Autowired IMultiTabDetService multiTabDetService;

    @Audit(accion = Accion.CONSULTA, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<MultiTabDet> buscarTodos()
    {
        return multiTabDetService.buscarTodos();
    }

    @Audit(accion = Accion.CONSULTA, comentario = Comentario.Consulta)
    @GetMapping("/multiTabCab/{idTabla}")
    public List<MultiTabDet> buscarPorIdTabla(@IdTabla(existe = true) @PathVariable int idTabla)
    {
        return multiTabDetService.buscarPorIdTabla(idTabla);
    }

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarMultiTabDet(
            @Validated({ Default.class, IRegistro.class }) @RequestBody MultiTabDet multiTabDet,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        multiTabDetService.registrarMultiTabDet(multiTabDet);
        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
    }

    @Audit(accion = Accion.ACTUALIZACION, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarMultiTabDet(@Validated({ Default.class,
            IActualizacion.class }) @RequestBody MultiTabDet multiTabDet, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        multiTabDetService.actualizarMultiTabDet(multiTabDet);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    }

    @Audit(accion = Accion.ELIMINACION, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarMultiTabDet(
            @Validated(IActualizacion.class) @RequestBody MultiTabDet multiTabDet, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        multiTabDetService.eliminarMultiTabDet(multiTabDet);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}