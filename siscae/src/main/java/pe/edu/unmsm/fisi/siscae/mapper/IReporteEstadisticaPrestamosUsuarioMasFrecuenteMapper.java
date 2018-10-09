package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosUsuarioMasFrecuente;

public interface IReporteEstadisticaPrestamosUsuarioMasFrecuenteMapper {
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarTodos();
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
	
}
