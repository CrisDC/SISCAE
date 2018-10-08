package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosFechasMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosFechas;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosFechasService;

@Service
public class ReporteEstadisticaPrestamosFechasService implements IReporteEstadisticaPrestamosFechasService {
	
	private @Autowired IReporteEstadisticaPrestamosFechasMapper reporteEstadisticaPrestamosFechasMapper; 
	
	@Override
	public List<ReporteEstadisticaPrestamosFechas> buscarTodos() {
		return reporteEstadisticaPrestamosFechasMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaPrestamosFechas> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosFechasMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

