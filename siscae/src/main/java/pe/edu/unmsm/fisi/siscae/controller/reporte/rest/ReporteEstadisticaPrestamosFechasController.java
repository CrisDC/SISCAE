package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosFechas;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosFechasService;

@RequestMapping("/reporteEstadisticaPrestamosFechas")
public @RestController class ReporteEstadisticaPrestamosFechasController {
	private @Autowired IReporteEstadisticaPrestamosFechasService reporteEstadisticaPrestamosFechasService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamosFechas> buscarTodos() {
		return reporteEstadisticaPrestamosFechasService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosFechas> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosFechasService.buscarPorCriterio(criterioBusqueda);
	}
}

