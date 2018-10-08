package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorEscuela;

public interface IReporteEstadisticaInfraccionesPorEscuelaMapper {
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}
