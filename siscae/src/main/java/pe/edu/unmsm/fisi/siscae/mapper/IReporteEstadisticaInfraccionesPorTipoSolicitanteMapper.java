package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTipoSolicitante;




	public interface IReporteEstadisticaInfraccionesPorTipoSolicitanteMapper {
		public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarTodos();
		public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarPorCriterio(ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda);

}
