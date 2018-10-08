package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesPorEscuelaMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorEscuela;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorEscuelaService;

@Service
public class ReporteEstadisticaInfraccionesPorEscuelaService implements IReporteEstadisticaInfraccionesPorEscuelaService {
	
	private @Autowired IReporteEstadisticaInfraccionesPorEscuelaMapper reporteEstadisticaInfraccionesPorEscuelaMapper; 
	
	@Override
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarTodos() {
		return reporteEstadisticaInfraccionesPorEscuelaMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfraccionesPorEscuela> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorEscuelaMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

