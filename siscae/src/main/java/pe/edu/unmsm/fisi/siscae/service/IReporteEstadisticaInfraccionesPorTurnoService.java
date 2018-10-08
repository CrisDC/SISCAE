package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTurno;


public interface IReporteEstadisticaInfraccionesPorTurnoService {
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}