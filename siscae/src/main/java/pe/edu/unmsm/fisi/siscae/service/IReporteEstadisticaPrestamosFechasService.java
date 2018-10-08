package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosFechas;

public interface IReporteEstadisticaPrestamosFechasService {
	public List<ReporteEstadisticaPrestamosFechas> buscarTodos();
	public List<ReporteEstadisticaPrestamosFechas> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
