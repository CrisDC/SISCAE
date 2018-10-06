package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;

public interface IReporteEstadisticaPrestamosService {
	public List<ReporteEstadisticaPrestamos> buscarTodos();
	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
