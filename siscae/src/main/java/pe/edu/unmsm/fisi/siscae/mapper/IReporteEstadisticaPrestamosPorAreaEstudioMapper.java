package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorAreaEstudio;

public interface IReporteEstadisticaPrestamosPorAreaEstudioMapper {
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
