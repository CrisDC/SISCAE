package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteInfraccionesPorEjeXSegmentado;

public interface IReporteEstadisticaInfraccionesService {
	//public List<ReporteEstadisticaInfracciones> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorEjeX> buscarPorPeriodoSinSegementar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorEjeX> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorEjeXSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorEjeX> buscarPorEjeXSinSegmentar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorEjeXSegmentado> buscarPorEjeXSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorEjeXSegmentado> buscarPorNumeroDocumento(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}


