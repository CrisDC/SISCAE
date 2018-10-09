package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTurno;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorTurnoService;

@RequestMapping("/reporteEstadisticaInfraccionesPorTurno")
public @RestController class ReporteEstadisticaInfraccionesPorTurnoController {
	private @Autowired IReporteEstadisticaInfraccionesPorTurnoService reporteEstadisticaInfraccionesPorTurnoService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarTodos() {
		return reporteEstadisticaInfraccionesPorTurnoService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorTurnoService.buscarPorCriterio(criterioBusqueda);
	}
}
