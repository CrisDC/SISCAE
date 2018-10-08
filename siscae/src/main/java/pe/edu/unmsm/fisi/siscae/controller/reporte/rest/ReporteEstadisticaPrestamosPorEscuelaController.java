package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorEscuela;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorEscuelaService;
 
@RequestMapping("/reporteEstadisticoPrestamoPorEscuela")
public @RestController class ReporteEstadisticaPrestamosPorEscuelaController {
	private @Autowired IReporteEstadisticaPrestamosPorEscuelaService reporteEstadisticaPrestamosPorEscuelaService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarTodos() {
		return reporteEstadisticaPrestamosPorEscuelaService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorEscuelaService.buscarPorCriterio(criterioBusqueda);
	}
}

