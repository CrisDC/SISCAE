package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTipoSolicitante;


public interface IReporteEstadisticaPrestamosPorTipoSolicitanteService {
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}