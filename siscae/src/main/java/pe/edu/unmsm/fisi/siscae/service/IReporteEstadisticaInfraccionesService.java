package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfracciones;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaInfraccionesPorPeriodo;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteInfraccionesPorPeriodoSegmentado;

public interface IReporteEstadisticaInfraccionesService {
	//public List<ReporteEstadisticaInfracciones> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorPeriodo> buscarPorPeriodoSinSegementar(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteEstadisticaInfraccionesPorPeriodo> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	public List<ReporteInfraccionesPorPeriodoSegmentado> buscarPorPeriodoSegmentado(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}


