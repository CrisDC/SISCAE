package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorAreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorAreaEstudioService;
 
@RequestMapping("/reporteEstadisticaPrestamosPorAreaEstudio")
public @RestController class ReporteEstadisticaPrestamosPorAreaEstudioController {
	private @Autowired IReporteEstadisticaPrestamosPorAreaEstudioService reporteEstadisticaPrestamosPorAreaEstudioService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarTodos() {
		return reporteEstadisticaPrestamosPorAreaEstudioService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorAreaEstudioService.buscarPorCriterio(criterioBusqueda);
	}
}

