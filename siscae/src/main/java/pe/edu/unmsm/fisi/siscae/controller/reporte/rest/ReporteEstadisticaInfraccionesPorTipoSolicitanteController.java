package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTipoSolicitante;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorTipoSolicitanteService;

@RequestMapping("/reporteEstadisticoInfraccionesPorTipoSolicitante")
public @RestController class ReporteEstadisticaInfraccionesPorTipoSolicitanteController {
	private @Autowired IReporteEstadisticaInfraccionesPorTipoSolicitanteService reporteEstadisticaInfraccionesPorTipoSolicitanteService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarTodos() {
		return reporteEstadisticaInfraccionesPorTipoSolicitanteService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorTipoSolicitanteService.buscarPorCriterio(criterioBusqueda);
	}
}

