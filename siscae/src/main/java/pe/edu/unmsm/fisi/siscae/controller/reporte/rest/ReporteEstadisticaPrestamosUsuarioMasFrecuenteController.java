package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosUsuarioMasFrecuente;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosUsuarioMasFrecuenteService;

@RequestMapping("/reporteEstadisticoPrestamosUsuarioMasFrecuente")
public @RestController class ReporteEstadisticaPrestamosUsuarioMasFrecuenteController {
	private @Autowired IReporteEstadisticaPrestamosUsuarioMasFrecuenteService reporteEstadisticaPrestamosUsuarioMasFrecuenteService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarTodos() {
		return reporteEstadisticaPrestamosUsuarioMasFrecuenteService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosUsuarioMasFrecuenteService.buscarPorCriterio(criterioBusqueda);
	}
}

