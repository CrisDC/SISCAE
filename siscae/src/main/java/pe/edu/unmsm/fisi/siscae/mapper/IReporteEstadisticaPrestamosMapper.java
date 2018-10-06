package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;


import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;

public interface IReporteEstadisticaPrestamosMapper {
	public List<ReporteEstadisticaPrestamos> buscarTodos();
	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	
}
