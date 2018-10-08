package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesPorTipoSolicitanteMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTipoSolicitante;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorTipoSolicitanteService;

@Service
public class ReporteEstadisticaInfraccionesPorTipoSolicitanteService implements IReporteEstadisticaInfraccionesPorTipoSolicitanteService {
	
	private @Autowired IReporteEstadisticaInfraccionesPorTipoSolicitanteMapper reporteEstadisticaInfraccionesPorTipoSolicitanteMapper; 
	
	@Override
	public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarTodos() {
		return reporteEstadisticaInfraccionesPorTipoSolicitanteMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfraccionesPorTipoSolicitante> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorTipoSolicitanteMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

