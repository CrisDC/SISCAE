package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorAreaEstudio;

public interface IReporteEstadisticaInfraccionesPorAreaEstudioService {
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}
