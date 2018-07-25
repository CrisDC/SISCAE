package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.security.Principal;
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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SolicitudTramite;
import pe.edu.unmsm.fisi.siscae.service.ISolicitudTramiteService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Audit(tipo = Tipo.Emp, datos = Dato.SolicitudTramite)
@RequestMapping("/solicitudTramite")
public @RestController class SolicitudTramiteController
{
    private @Autowired ISolicitudTramiteService solicitudTramiteService;

    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<SolicitudTramite> buscarTodos()
    {
        return solicitudTramiteService.buscarTodos();
    }
    
    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaPorUsuario)
    @GetMapping(params = "accion=buscarPorUsuario")
    public List<SolicitudTramite> buscarPorUsuario(Principal principal)
    {
        System.out.println(principal.getName());
        return solicitudTramiteService.buscarPorUsuario(principal.getName());
    } 

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarSolicitudTramite(
            @Validated({ Default.class, IRegistro.class }) @RequestBody SolicitudTramite solicitudTramite,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        solicitudTramiteService.registrarSolicitudTramite(solicitudTramite);
        return ResponseEntity.ok(ConstantesGenerales.REGISTRO_EXITOSO);
    }

    @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarSolicitudTramite(
            @Validated({ Default.class, IActualizacion.class }) @RequestBody SolicitudTramite solicitudTramite,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        solicitudTramiteService.actualizarSolicitudTramite(solicitudTramite);
        return ResponseEntity.ok(ConstantesGenerales.ACTUALIZACION_EXITOSA);
    }

    @Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarSolicitudTramite(
            @Validated(IActualizacion.class) @RequestBody SolicitudTramite solicitudTramite, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        solicitudTramiteService.eliminarSolicitudTramite(solicitudTramite);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}