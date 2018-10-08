package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTurno;

public interface IReporteEstadisticaPrestamosPorTurnoMapper {
	public List<ReporteEstadisticaPrestamosPorTurno> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorTurno> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}