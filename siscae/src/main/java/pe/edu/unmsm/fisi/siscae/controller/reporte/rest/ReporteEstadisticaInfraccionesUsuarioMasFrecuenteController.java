package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesUsuarioMasFrecuente;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesUsuarioMasFrecuenteService;

@RequestMapping("/reporteEstadisticaInfraccionesUsuarioMasFrecuente")
public @RestController class ReporteEstadisticaInfraccionesUsuarioMasFrecuenteController {
	private @Autowired IReporteEstadisticaInfraccionesUsuarioMasFrecuenteService reporteEstadisticaInfraccionesUsuarioMasFrecuenteService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarTodos() {
		return reporteEstadisticaInfraccionesUsuarioMasFrecuenteService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesUsuarioMasFrecuenteService.buscarPorCriterio(criterioBusqueda);
	}
}

