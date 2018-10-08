package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorEscuela;


public interface IReporteEstadisticaPrestamosPorEscuelaMapper {
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
