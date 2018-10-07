package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosPorTipoSolicitanteMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorTipoSolicitante;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosPorTipoSolicitanteService;

@Service
public class ReporteEstadisticaPrestamosPorTipoSolicitanteService implements IReporteEstadisticaPrestamosPorTipoSolicitanteService {
	
	private @Autowired IReporteEstadisticaPrestamosPorTipoSolicitanteMapper reporteEstadisticaPrestamosPorTipoSolicitanteMapper; 
	
	@Override
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarTodos() {
		return reporteEstadisticaPrestamosPorTipoSolicitanteMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaPrestamosPorTipoSolicitante> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosPorTipoSolicitanteMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}