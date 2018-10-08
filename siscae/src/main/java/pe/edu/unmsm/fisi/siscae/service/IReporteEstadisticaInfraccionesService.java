package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfracciones;

public interface IReporteEstadisticaInfraccionesService {
	public List<ReporteEstadisticaInfracciones> buscarTodos();
	public List<ReporteEstadisticaInfracciones> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);
}


