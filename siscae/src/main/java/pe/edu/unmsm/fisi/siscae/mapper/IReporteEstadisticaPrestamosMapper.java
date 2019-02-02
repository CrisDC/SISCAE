package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorEjeXSegmentado;

public interface IReporteEstadisticaPrestamosMapper {

	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorPeriodoSinSegementar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorEjeXSinSegementar(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorEjeXSegmentado(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
