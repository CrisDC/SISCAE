package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorAreaEstudio;

public interface IReporteEstadisticaInfraccionesPorAreaEstudioMapper {
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}


