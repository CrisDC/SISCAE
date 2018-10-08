package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfracciones;

public interface IReporteEstadisticaInfraccionesMapper {
	public List<ReporteEstadisticaInfracciones> buscarTodos();
	public List<ReporteEstadisticaInfracciones> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	
}

