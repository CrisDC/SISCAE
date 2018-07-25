package pe.edu.unmsm.fisi.siscae.controller.excepcion;

import java.sql.SQLException;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.service.excepcion.BadRequestException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.EjecucionManualException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.EscenarioException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ListaVaciaException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.NoDisponibleException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.OrdenEjecucionException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ValorEncontradoException;
import pe.edu.unmsm.fisi.siscae.service.excepcion.ValorNoEncontradoException;
import pe.edu.unmsm.fisi.siscae.utilitario.ConstantesExcepciones;

@ControllerAdvice(annotations = Vista.class)
public class ExceptionController
{
    private @Autowired Logger logger;

    @ExceptionHandler(SQLException.class)
    public String catchConexionException(SQLException ex, RedirectAttributes redirect)
    {
        logger.error("ERROR SQL  " + ex.getErrorCode(), ex);
        redirect.addFlashAttribute("mensaje", ex.getMessage());
        return "redirect:/409";
    }

    @ExceptionHandler(BadRequestException.class)
    public String catchBadRequestException(BadRequestException ex)
    {
        logger.error(ex.getMessage(), ex);
        return "redirect:/400";
    }

    @ExceptionHandler({ EscenarioException.class, OrdenEjecucionException.class,
            EjecucionManualException.class, ListaVaciaException.class,
            ValorNoEncontradoException.class, ValorEncontradoException.class })
    public String catchListaVaciaException(Exception ex, RedirectAttributes redirect)
    {
        logger.error(ex.getMessage(), ex);
        redirect.addFlashAttribute("mensaje", ex.getMessage());
        return "redirect:/409";
    }

    @ExceptionHandler(Exception.class)
    public String catchExcepcion(Exception ex, RedirectAttributes redirect)
    {
        logger.error(ex.getMessage(), ex);
        redirect.addFlashAttribute("mensaje", ConstantesExcepciones.ERROR_DESCONOCIDO);
        return "redirect:/500";
    }
    
    @ExceptionHandler(NoDisponibleException.class)
    public String catchExcepcionNoDisponible(Exception ex, RedirectAttributes redirect)
    {
        logger.error(ex.getMessage(), ex);
        redirect.addFlashAttribute("mensaje", ConstantesExcepciones.ERROR_DESCONOCIDO);
        return "redirect:/503";
    }
}