package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTipoSolicitante;

public interface IReporteEstadisticaPrestamosPorTipoSolicitanteMapper {
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}
