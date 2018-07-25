package pe.edu.unmsm.fisi.siscae.controller.mantenimiento.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
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
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.ParametroGeneral;
import pe.edu.unmsm.fisi.siscae.service.IParametroGeneralService;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.utilitario.DatesUtils;
import pe.edu.unmsm.fisi.siscae.utilitario.ValidatorUtil;

@Audit(tipo = Tipo.ParamGral, datos = Dato.ParametroGeneral)
@RequestMapping("/parametroGeneral")
public @RestController class ParametroGeneralController
{
    private @Autowired IParametroGeneralService parametroGeneralService;

    @Audit(accion = Accion.Consulta, comentario = Comentario.ConsultaTodos)
    @GetMapping(params = "accion=buscarTodos")
    public List<ParametroGeneral> buscarTodos()
    {
        return this.parametroGeneralService.buscarTodos();
    }

    @GetMapping(value = "/fechaProceso", params = "accion=buscar")
    public String buscarFechaProceso()
    {
        return DatesUtils.obtenerFechaEnFormato(parametroGeneralService.buscarFechaProceso(),
                "dd/MM/yyyy");
    }

    @Audit(accion = Accion.REGISTRO, comentario = Comentario.Registro)
    @PostMapping
    public void registrarParametroGeneral(@Validated @RequestBody ParametroGeneral parametroGeneral,
            Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        parametroGeneralService.registrarParametroGeneral(parametroGeneral);
    }

    @Audit(accion = Accion.Actualizacion, comentario = Comentario.Actualizacion)
    @PutMapping
    public ResponseEntity<?> actualizarParametroGeneral(
            @Validated @RequestBody ParametroGeneral parametroGeneral, Errors error)
    {
        if (error.hasErrors())
        {
            throw new BadRequestException(ValidatorUtil.obtenerMensajeValidacionError(error));
        }
        parametroGeneralService.actualizarParametroGeneral(parametroGeneral);
        return ResponseEntity.ok(parametroGeneralService.buscarTodos());
    }
}