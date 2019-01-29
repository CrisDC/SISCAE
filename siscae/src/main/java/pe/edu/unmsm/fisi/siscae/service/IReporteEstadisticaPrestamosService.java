package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorPeriodoSegmentado;

public interface IReporteEstadisticaPrestamosService {
//	public List<ReporteEstadisticaPrestamos> buscarTodos();
//	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	//Nuevo - pd: los de arriba los borre del Mapper XML
	public List<ReporteEstadisticaPrestamosPorPeriodo> buscarPorPeriodoSinSegementar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaPrestamosPorPeriodo> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReportePrestamosPorPeriodoSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
