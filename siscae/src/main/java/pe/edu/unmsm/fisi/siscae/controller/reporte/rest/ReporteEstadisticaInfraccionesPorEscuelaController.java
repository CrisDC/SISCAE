package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorEscuela;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorEscuelaService;

@RequestMapping("/reporteEstadisticoPrestamoPorEscuela")
public @RestController class ReporteEstadisticaInfraccionesPorEscuelaController {
	private @Autowired IReporteEstadisticaInfraccionesPorEscuelaService reporteEstadisticaInfraccionesPorEscuelaService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarTodos() {
		return reporteEstadisticaInfraccionesPorEscuelaService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorEscuelaService.buscarPorCriterio(criterioBusqueda);
	}
}


