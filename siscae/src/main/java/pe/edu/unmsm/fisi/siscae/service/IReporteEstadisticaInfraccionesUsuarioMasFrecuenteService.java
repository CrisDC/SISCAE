package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesUsuarioMasFrecuente;

public interface IReporteEstadisticaInfraccionesUsuarioMasFrecuenteService {
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarTodos();
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}
