package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaSancionadosMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaSancionados;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaSancionadosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaSancionadosService;

@Service
public class ConsultaSancionadosService implements IConsultaSancionadosService{

	private @Autowired IConsultaSancionadosMapper ConsultaSancionadosMapper;
	
	@Override
	public List<ConsultaSancionados> buscarTodos() {
		return ConsultaSancionadosMapper.buscarTodos();
	}

	@Override
	public List<ConsultaSancionados> buscarPorCriterio(ConsultaSancionadosCriterioBusqueda criterioBusqueda) {
		return ConsultaSancionadosMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<ConsultaSancionados> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		return ConsultaSancionadosMapper.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

	@Override
	public List<ConsultaSancionados> buscarPorCriterio2(ConsultaSancionadosCriterioBusqueda criterioBusqueda) {
		return ConsultaSancionadosMapper.buscarPorCriterio(criterioBusqueda);
	}

	
	
	
}

