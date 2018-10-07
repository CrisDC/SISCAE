package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosPorEscuelaMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorEscuela;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorEscuelaService;

@Service
public class ReporteEstadisticaPrestamosPorEscuelaService implements IReporteEstadisticaPrestamosPorEscuelaService {
	
	private @Autowired IReporteEstadisticaPrestamosPorEscuelaMapper reporteEstadisticaPrestamosPorEscuelaMapper; 
	
	@Override
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarTodos() {
		return reporteEstadisticaPrestamosPorEscuelaMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaPrestamosPorEscuela> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorEscuelaMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}