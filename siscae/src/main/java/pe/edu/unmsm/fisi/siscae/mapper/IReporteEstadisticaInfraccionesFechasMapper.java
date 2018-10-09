package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesFechas;

public interface IReporteEstadisticaInfraccionesFechasMapper {
	public List<ReporteEstadisticaInfraccionesFechas> buscarTodos();
	public List<ReporteEstadisticaInfraccionesFechas> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	
}


