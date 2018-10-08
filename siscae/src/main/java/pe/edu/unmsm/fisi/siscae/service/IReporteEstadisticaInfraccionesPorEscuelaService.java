package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorEscuela;

public interface IReporteEstadisticaInfraccionesPorEscuelaService {
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}


