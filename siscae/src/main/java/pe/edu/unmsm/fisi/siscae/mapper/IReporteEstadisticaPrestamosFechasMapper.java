package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosFechas;

public interface IReporteEstadisticaPrestamosFechasMapper {
	public List<ReporteEstadisticaPrestamosFechas> buscarTodos();
	public List<ReporteEstadisticaPrestamosFechas> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	
}
