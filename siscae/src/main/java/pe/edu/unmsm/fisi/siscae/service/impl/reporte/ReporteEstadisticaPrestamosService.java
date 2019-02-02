package pe.edu.unmsm.fisi.siscae.service.impl.reporte;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IReporteEstadisticaPrestamosMapper;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReporteEstadisticaPrestamosPorEjeX;
import pe.edu.unmsm.fisi.siscae.model.reporte.resumen.ReportePrestamosPorEjeXSegmentado;
import pe.edu.unmsm.fisi.siscae.service.IReporteEstadisticaPrestamosService;

@Service
public class ReporteEstadisticaPrestamosService implements IReporteEstadisticaPrestamosService {
	
	private @Autowired IReporteEstadisticaPrestamosMapper reporteEstadisticaPrestamosMapper;



	@Override
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorPeriodoSinSegementar(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorPeriodoSinSegementar(criterioBusqueda);
	}



	@Override
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorCriterio(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorCriterio(criterioBusqueda);
	}



	@Override
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorPeriodoSegmentado(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorPeriodoSegmentado(criterioBusqueda);
	}



	@Override
	public List<ReporteEstadisticaPrestamosPorEjeX> buscarPorEjeXSinSegementar(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorEjeXSinSegementar(criterioBusqueda);
	}



	@Override
	public List<ReportePrestamosPorEjeXSegmentado> buscarPorEjeXSegmentado(
			ReporteEstadisticaPrestamosCriterioBusqueda criterioBusqueda) {
		return reporteEstadisticaPrestamosMapper.buscarPorEjeXSegmentado(criterioBusqueda);
	} 

}
