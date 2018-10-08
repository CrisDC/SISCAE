package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTipoSolicitante;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorTipoSolicitanteService;

@RequestMapping("/reporteEstadisticaPrestamosPorTipoSolicitante")
public @RestController class ReporteEstadisticaPrestamosPorTipoSolicitanteController {
	private @Autowired IReporteEstadisticaPrestamosPorTipoSolicitanteService reporteEstadisticaPrestamosPorTipoSolicitanteService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarTodos() {
		return reporteEstadisticaPrestamosPorTipoSolicitanteService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorTipoSolicitanteService.buscarPorCriterio(criterioBusqueda);
	}
}

