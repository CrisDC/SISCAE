package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosPorAreaEstudioMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorAreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorAreaEstudioService;

@Service
public class ReporteEstadisticaPrestamosPorAreaEstudioService implements IReporteEstadisticaPrestamosPorAreaEstudioService {
	
	private @Autowired IReporteEstadisticaPrestamosPorAreaEstudioMapper reporteEstadisticaPrestamosPorAreaEstudioMapper; 
	
	@Override
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarTodos() {
		return reporteEstadisticaPrestamosPorAreaEstudioMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaPrestamosPorAreaEstudio> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorAreaEstudioMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}