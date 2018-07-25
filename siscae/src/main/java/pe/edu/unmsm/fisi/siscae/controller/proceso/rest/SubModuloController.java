package pe.edu.unmsm.fisi.siscae.controller.proceso.rest;

import java.util.List;

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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SubModulo;
import pe.edu.unmsm.fisi.siscae.service.ISubModuloService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesGenerales;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.ISecuenciaValidacionActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.ISecuenciaValidacionRegistro;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.secuencia.contabilidad.ISecuenciaValidacionEliminacionContabComision;

@Audit(tipo = Tipo.SubMod, datos = Dato.SubModulo)
@RequestMapping("/proceso/mantenimiento/subModulo")
public @RestController class SubModuloController
{
    private @Autowired ISubModuloService subModuloService;

    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<SubModulo> buscarTodos()
    {
        return subModuloService.buscarTodos();
    }

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public ResponseEntity<?> registrarSubModulo(
            @Validated(ISecuenciaValidacionRegistro.class) @RequestBody SubModulo subModulo,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        return ResponseEntity.ok(subModuloService.registrarSubModulo(subModulo));
    }

    @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarSubModulo(
            @Validated(ISecuenciaValidacionActualizacion.class) @RequestBody SubModulo subModulo,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        return ResponseEntity.ok(subModuloService.actualizarSubModulo(subModulo));
    }

    @Audit(accion = Accion.Eliminacion, comentario = Comentario.Eliminacion)
    @DeleteMapping
    public ResponseEntity<?> eliminarSubModulo(
            @Validated(ISecuenciaValidacionEliminacionContabComision.class) @RequestBody SubModulo subModulo,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        subModuloService.eliminarSubModulo(subModulo);
        return ResponseEntity.ok(ConstantesGenerales.ELIMINACION_EXITOSA);
    }
}