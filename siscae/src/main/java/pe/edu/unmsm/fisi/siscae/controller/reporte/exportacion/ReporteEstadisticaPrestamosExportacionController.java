package pe.edu.unmsm.fisi.siscae.controller.reporte.exportacion;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorPeriodoSegmentado;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosService;
import pe.edu.unmsm.fisi.siscae.configuracion.security.SecurityContextFacade;
import pe.edu.unmsm.fisi.siscae.utilitario.DatesUtils;
import java.util.Date;

import pe.edu.unmsm.fisi.siscae.controller.excepcion.anotacion.Vista;
import pe.edu.unmsm.fisi.siscae.utilitario.ReporteUtilYarg;

@Vista
@RequestMapping("/reporteEstadisticaPrestamos")
public @Controller class ReporteEstadisticaPrestamosExportacionController {

	private @Autowired IReporteEstadisticaPrestamosService reporteEstadisticaPrestamosService;
   
	@GetMapping(params ="accion=exportar")
	public ModelAndView exportarEstadisticaPrestamo(
			ModelMap model, @Validated ReporteEstadisticaPrestamosCriterioBusqueda criterio){

    	Map<String, Object> params = new HashMap<>();
        params.put("reporte", reporteEstadisticaPrestamosService.buscarPorPeriodoSinSegementar(criterio));
        System.out.println("ESTO SALE DE LA BD: " + reporteEstadisticaPrestamosService.buscarPorPeriodoSinSegementar(criterio));
        params.put("criterioBusqueda", criterio);
        params.put("username", SecurityContextFacade.obtenerNombreUsuario());
        params.put("fecha", DatesUtils.obtenerFechaEnFormato(new Date(), DatesUtils.FORMATO_FECHA_REPORTES));
        params.put("modulo", "Préstamos");

        model.addAttribute(ReporteUtilYarg.PARAM_TEMPLATE, "reportePrestamosPorPeriodo");
        model.addAttribute(ReporteUtilYarg.PARAM_NOMBRE_REPORTE,"Reporte de Préstamos por Periodo");
        model.addAttribute(ReporteUtilYarg.PARAM_REPORTE_PARAMETERS, params);
        return new ModelAndView("jxlsView", model);
	}
}
