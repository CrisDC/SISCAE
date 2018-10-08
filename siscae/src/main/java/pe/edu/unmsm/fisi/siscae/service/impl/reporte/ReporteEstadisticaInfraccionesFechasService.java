package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesFechasMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesFechas;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesFechasService;

@Service
public class ReporteEstadisticaInfraccionesFechasService implements IReporteEstadisticaInfraccionesFechasService {
	
	private @Autowired IReporteEstadisticaInfraccionesFechasMapper reporteEstadisticaInfraccionesFechasMapper; 
	
	@Override
	public List<ReporteEstadisticaInfraccionesFechas> buscarTodos() {
		return reporteEstadisticaInfraccionesFechasMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfraccionesFechas> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesFechasMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

