package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorEjeXSegmentado;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorPeriodoSegmentado;

public interface IReporteEstadisticaPrestamosMapper {
//	public List<ReporteEstadisticaPrestamos> buscarTodos();
//	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	//Nuevo - pd: los de arriba los borre del Mapper XML
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorPeriodoSinSegementar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorEjeXSinSegementar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorEjeXSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
