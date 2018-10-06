package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosService;

@RequestMapping("/reporteEstadisticoPrestamo")
public @RestController class reporteEstadisticaPrestamosController {
	private @Autowired IReporteEstadisticaPrestamosService reporteEstadisticaPrestamosService;
	@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaPrestamos> buscarTodos() {
		return reporteEstadisticaPrestamosService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosService.buscarPorCriterio(criterioBusqueda);
	}
}