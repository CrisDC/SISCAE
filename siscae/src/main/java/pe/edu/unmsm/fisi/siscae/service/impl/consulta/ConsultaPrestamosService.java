package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaPrestamoMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaPrestamosService;


@Service
public class ConsultaPrestamosService implements IConsultaPrestamosService{

	private @Autowired IConsultaPrestamoMapper consultaPrestamosMapper;
	
	@Override
	public List<PrestamoRecurso> buscarTodos() {
		return consultaPrestamosMapper.buscarTodos();
	}

	@Override
	public List<PrestamoRecurso> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<PrestamoRecurso> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosMapper.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

	@Override
	public List<PrestamoRecurso> buscarPorCriterio2(ConsultaPrestamosCriterioBusqueda criterioBusqueda) {
		return consultaPrestamosMapper.buscarPorCriterio(criterioBusqueda);
	}

	
	
	
}
