package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTipoSolicitante;

public interface IReporteEstadisticaInfraccionesPorTipoSolicitanteService {
	public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}