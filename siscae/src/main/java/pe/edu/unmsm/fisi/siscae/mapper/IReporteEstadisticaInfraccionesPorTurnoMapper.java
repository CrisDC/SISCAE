package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTurno;


public interface IReporteEstadisticaInfraccionesPorTurnoMapper {
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarTodos();
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}


