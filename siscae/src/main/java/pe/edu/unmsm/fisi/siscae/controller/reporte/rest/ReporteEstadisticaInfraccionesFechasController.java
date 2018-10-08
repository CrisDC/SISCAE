package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesFechas;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesFechasService;

@RequestMapping("/reporteEstadisticoInfraccionesFechas")
public @RestController class ReporteEstadisticaInfraccionesFechasController {
	private @Autowired IReporteEstadisticaInfraccionesFechasService reporteEstadisticaInfraccionesFechasService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfraccionesFechas> buscarTodos() {
		return reporteEstadisticaInfraccionesFechasService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesFechas> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesFechasService.buscarPorCriterio(criterioBusqueda);
	}
}

