package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfracciones;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesService;

@Service
public class ReporteEstadisticaInfraccionesService implements IReporteEstadisticaInfraccionesService {
	
	private @Autowired IReporteEstadisticaInfraccionesMapper reporteEstadisticaInfraccionesMapper; 
	
	@Override
	public List<ReporteEstadisticaInfracciones> buscarTodos() {
		return reporteEstadisticaInfraccionesMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfracciones> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}
