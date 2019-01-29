package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorPeriodo;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosService;

@Service
public class ReporteEstadisticaPrestamosService implements IReporteEstadisticaPrestamosService {
	
	private @Autowired IReporteEstadisticaPrestamosMapper reporteEstadisticaPrestamosMapper;


	
//	@Override
//	public List<ReporteEstadisticaPrestamos> buscarTodos() {
//		return reporteEstadisticaPrestamosMapper.buscarTodos();
//	}
//
//	@Override
//	public List<ReporteEstadisticaPrestamos> buscarPorCriterio(
//			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
//		return reporteEstadisticaPrestamosMapper.buscarPorCriterio(criterioBusqueda);
//	}

	@Override
	public List<ReporteEstadisticaPrestamosPorPeriodo> buscarPorPeriodoSinSegementar(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorPeriodoSinSegementar(criterioBusqueda);
	}



	@Override
	public List<ReporteEstadisticaPrestamosPorPeriodo> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorCriterio(criterioBusqueda);
	} 

}
