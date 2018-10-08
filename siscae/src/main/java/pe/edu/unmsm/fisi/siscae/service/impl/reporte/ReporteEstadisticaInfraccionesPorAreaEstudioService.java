package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesPorAreaEstudioMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorAreaEstudio;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorAreaEstudioService;

@Service
public class ReporteEstadisticaInfraccionesPorAreaEstudioService implements IReporteEstadisticaInfraccionesPorAreaEstudioService {
	
	private @Autowired IReporteEstadisticaInfraccionesPorAreaEstudioMapper reporteEstadisticaInfraccionesPorAreaEstudioMapper; 
	
	@Override
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarTodos() {
		return reporteEstadisticaInfraccionesPorAreaEstudioMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfraccionesPorAreaEstudio> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorAreaEstudioMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

