package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesPorTurnoMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesPorTurno;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesPorTurnoService;

@Service
public class ReporteEstadisticaInfraccionesPorTurnoService implements IReporteEstadisticaInfraccionesPorTurnoService {
	
	private @Autowired IReporteEstadisticaInfraccionesPorTurnoMapper reporteEstadisticaInfraccionesPorTurnoMapper; 
	
	@Override
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarTodos() {
		return reporteEstadisticaInfraccionesPorTurnoMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfraccionesPorTurno> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesPorTurnoMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

