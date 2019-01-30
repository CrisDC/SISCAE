package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteInfraccionesPorPeriodoSegmentado;

public interface IReporteEstadisticaInfraccionesMapper {
	//public List<ReporteEstadisticaInfracciones> buscarTodos();
	//public List<ReporteEstadisticaInfracciones> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorPeriodo> buscarPorPeriodoSinSegementar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorPeriodo> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorPeriodoSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}

