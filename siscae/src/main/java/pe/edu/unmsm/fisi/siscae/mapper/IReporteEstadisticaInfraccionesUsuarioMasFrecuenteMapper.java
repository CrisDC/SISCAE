package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesUsuarioMasFrecuente;

public interface IReporteEstadisticaInfraccionesUsuarioMasFrecuenteMapper {
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarTodos();
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
	
}
