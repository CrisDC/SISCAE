package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorAreaEstudio;

public interface IReporteEstadisticaPrestamosPorAreaEstudioService {
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
