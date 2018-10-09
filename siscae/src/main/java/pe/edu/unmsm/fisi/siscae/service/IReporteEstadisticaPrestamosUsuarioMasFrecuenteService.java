package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosUsuarioMasFrecuente;

public interface IReporteEstadisticaPrestamosUsuarioMasFrecuenteService {
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarTodos();
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}

