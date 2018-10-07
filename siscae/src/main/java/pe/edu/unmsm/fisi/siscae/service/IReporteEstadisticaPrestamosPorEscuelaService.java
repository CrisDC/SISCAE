package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorEscuela;

public interface IReporteEstadisticaPrestamosPorEscuelaService {
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
