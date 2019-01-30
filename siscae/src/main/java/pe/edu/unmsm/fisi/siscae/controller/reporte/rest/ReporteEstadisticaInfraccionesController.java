package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfracciones;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteInfraccionesPorPeriodoSegmentado;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesService;

@RequestMapping("/reporteEstadisticaInfracciones")
public @RestController class ReporteEstadisticaInfraccionesController {
	private @Autowired IReporteEstadisticaInfraccionesService reporteEstadisticaInfraccionesService;
	/*@GetMapping(params = "accion=buscarTodos")
	public List<ReporteEstadisticaInfracciones> buscarTodos() {
		return reporteEstadisticaInfraccionesService.buscarTodos();
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfracciones> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesService.buscarPorCriterio(criterioBusqueda);
	}*/
	@GetMapping(params = "accion=buscarPorPeriodoSinSegmentar")
	public List<ReporteEstadisticaInfraccionesPorPeriodo> buscarPorPeriodoSinSegmentar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("tiposInfraccion") List<Integer> tiposInfraccion*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setTiposInfraccion(tiposInfraccion);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaInfraccionesService.buscarPorPeriodoSinSegementar(criterioBusqueda);
	}
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaInfraccionesPorPeriodo> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaInfraccionesService.buscarPorCriterio(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarPorPeriodoSegmentado")
	public List<ReporteInfraccionesPorPeriodoSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaInfraccionesService.buscarPorPeriodoSegmentado(criterioBusqueda);
	}
}

