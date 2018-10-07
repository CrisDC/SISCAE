package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosPorTurnoMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTurno;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorTurnoService;

@Service
public class ReporteEstadisticaPrestamosPorTurnoService implements IReporteEstadisticaPrestamosPorTurnoService {
	
	private @Autowired IReporteEstadisticaPrestamosPorTurnoMapper reporteEstadisticaPrestamosPorTurnoMapper; 
	
	@Override
	public List<ReporteEstadisticaPrestamosPorTurno> buscarTodos() {
		return reporteEstadisticaPrestamosPorTurnoMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaPrestamosPorTurno> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorTurnoMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}