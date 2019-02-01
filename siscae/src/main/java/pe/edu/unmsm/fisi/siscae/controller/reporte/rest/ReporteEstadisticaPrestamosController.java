package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorEjeXSegmentado;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorPeriodoSegmentado;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosService;
 
@RequestMapping("/reporteEstadisticaPrestamos")
public @RestController class ReporteEstadisticaPrestamosController {
	private @Autowired IReporteEstadisticaPrestamosService reporteEstadisticaPrestamosService;
	
//	@GetMapping(params = "accion=buscarTodos")
//	public List<ReporteEstadisticaPrestamos> buscarTodos() {
//		return reporteEstadisticaPrestamosService.buscarTodos();
//	}
//	@GetMapping(params = "accion=buscarPorCriterio")
//	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
//		return reporteEstadisticaPrestamosService.buscarPorCriterio(criterioBusqueda);
//	}
	
	@GetMapping(params = "accion=buscarPorPeriodoSinSegmentar")
	public List<ReporteEstadisticaPrestamosPorPeriodo> buscarPorPeriodoSinSegmentar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarPorPeriodoSinSegementar(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarPorCriterio")
	public List<ReporteEstadisticaPrestamosPorPeriodo> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarPorCriterio(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarPorPeriodoSegmentado")
	public List<ReportePrestamosPorPeriodoSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarPorPeriodoSegmentado(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarPorEjeXSinSegmentar")
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorEjeXSinSegmentar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarPorEjeXSinSegementar(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarPorEjeXSegmentado")
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorEjeXSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarPorEjeXSegmentado(criterioBusqueda);
	}
}