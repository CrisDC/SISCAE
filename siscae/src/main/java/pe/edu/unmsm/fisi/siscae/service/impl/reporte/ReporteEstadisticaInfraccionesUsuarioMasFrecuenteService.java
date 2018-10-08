package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaInfraccionesUsuarioMasFrecuenteMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaInfraccionesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfraccionesUsuarioMasFrecuente;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaInfraccionesUsuarioMasFrecuenteService;

@Service
public class ReporteEstadisticaInfraccionesUsuarioMasFrecuenteService implements IReporteEstadisticaInfraccionesUsuarioMasFrecuenteService {
	
	private @Autowired IReporteEstadisticaInfraccionesUsuarioMasFrecuenteMapper reporteEstadisticaInfraccionesUsuarioMasFrecuenteMapper; 
	
	@Override
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarTodos() {
		return reporteEstadisticaInfraccionesUsuarioMasFrecuenteMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaInfraccionesUsuarioMasFrecuente> buscarPorCriterio(
			ReporteEstadisticaInfraccionesCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaInfraccionesUsuarioMasFrecuenteMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

