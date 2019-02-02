package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteInfraccionesPorEjeXSegmentado;



public interface IReporteEstadisticaInfraccionesMapper {
	//public List<ReporteEstadisticaInfracciones> buscarTodos();
	//public List<ReporteEstadisticaInfracciones> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorEjeX> buscarPorPeriodoSinSegementar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorEjeX> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorEjeXSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorEjeX> buscarPorEjeXSinSegementar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorEjeXSegmentado> buscarPorEjeXSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}

