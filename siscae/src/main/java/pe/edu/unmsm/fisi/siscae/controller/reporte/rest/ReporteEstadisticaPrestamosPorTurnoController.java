package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTurno;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorTurnoService;

@RequestMapping("/reporteEstadisticaPrestamosPorTurno")
public @RestController class ReporteEstadisticaPrestamosPorTurnoController {
	private @Autowired IReporteEstadisticaPrestamosPorTurnoService reporteEstadisticaPrestamosPorTurnoService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamosPorTurno> buscarTodos() {
		return reporteEstadisticaPrestamosPorTurnoService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosPorTurno> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorTurnoService.buscarPorCriterio(criterioBusqueda);
	}
}
