package pe.edu.unmsm.fisi.siscae.controller.reporte.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaFacEsc;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaRankingAlumno;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorEjeXSegmentado;
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
	
	@GetMapping(params = "accion=buscarRankingAlumno")
	public List<ConsultaRankingAlumno> buscarRankingAlumno(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarRankingAlumno(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarRankingEscuela")
	public List<ConsultaFacEsc> buscarRankingEscuela(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarRankingEscuela(criterioBusqueda);
	}
	
	@GetMapping(params = "accion=buscarRankingFacultad")
	public List<ConsultaFacEsc> buscarRankingFacultad(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
			@RequestParam("areasEstudio") List<Integer> areasEstudio,
			@RequestParam("escuelas") List<Integer> escuelas,
			@RequestParam("solicitantes") List<String> solicitantes,
			@RequestParam("recursos") List<Integer> recursos*/) {
		/*criterioBusqueda.setAreasEstudio(areasEstudio);
		criterioBusqueda.setEscuelas(escuelas);
		criterioBusqueda.setSolicitantes(solicitantes);
		criterioBusqueda.setRecursos(recursos);*/
		System.out.println(criterioBusqueda);		
		return reporteEstadisticaPrestamosService.buscarRankingFacultad(criterioBusqueda);
	}
	
	
	
	
	@GetMapping(params = "accion=buscarPorPeriodoSinSegmentar")
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorPeriodoSinSegmentar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
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
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
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
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda/*,
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