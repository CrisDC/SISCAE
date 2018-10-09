package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorAreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorAreaEstudioService;

@RequestMapping("/reporteEstadisticaInfraccionesPorAreaEstudio")
public @RestController class ReporteEstadisticaInfraccionesPorAreaEstudioController {
	private @Autowired IReporteEstadisticaInfraccionesPorAreaEstudioService reporteEstadisticaInfraccionesPorAreaEstudioService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarTodos() {
		return reporteEstadisticaInfraccionesPorAreaEstudioService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorAreaEstudioService.buscarPorCriterio(criterioBusqueda);
	}
}

