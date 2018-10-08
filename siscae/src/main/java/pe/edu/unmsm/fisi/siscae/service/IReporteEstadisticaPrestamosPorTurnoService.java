package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTurno;

public interface IReporteEstadisticaPrestamosPorTurnoService {
	public List<ReporteEstadisticaPrestamosPorTurno> buscarTodos();
	public List<ReporteEstadisticaPrestamosPorTurno> buscarPorCriterio(ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda);
}