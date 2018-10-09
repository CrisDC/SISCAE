package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosUsuarioMasFrecuenteMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosUsuarioMasFrecuente;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosUsuarioMasFrecuenteService;

@Service
public class ReporteEstadisticaPrestamosUsuarioMasFrecuenteService implements IReporteEstadisticaPrestamosUsuarioMasFrecuenteService {
	
	private @Autowired IReporteEstadisticaPrestamosUsuarioMasFrecuenteMapper reporteEstadisticaPrestamosUsuarioMasFrecuenteMapper; 
	
	@Override
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarTodos() {
		return reporteEstadisticaPrestamosUsuarioMasFrecuenteMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticaPrestamosUsuarioMasFrecuente> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosUsuarioMasFrecuenteMapper.buscarPorCriterio(criterioBusqueda);
	}

	

}

