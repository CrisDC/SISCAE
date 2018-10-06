package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticoPrestamos;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosService;

@Service
public class ReporteEstadisticaPrestamosService implements IReporteEstadisticaPrestamosService {
	
	private @Autowired IReporteEstadisticaPrestamosMapper reporteEstadisticaPrestamosMapper; 
	
	@Override
	public List<ReporteEstadisticoPrestamos> buscarTodos() {
		return reporteEstadisticaPrestamosMapper.buscarTodos();
	}

	@Override
	public List<ReporteEstadisticoPrestamos> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<ReporteEstadisticoPrestamos> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

}
