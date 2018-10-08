package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesFechas;

public interface IReporteEstadisticaInfraccionesFechasService {
	public List<ReporteEstadisticaInfraccionesFechas> buscarTodos();
	public List<ReporteEstadisticaInfraccionesFechas> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}

