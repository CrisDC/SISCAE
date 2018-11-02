package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaAdministrativoMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaAdministrativoCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IConsultaAdministrativoService;

@Service
public class ConsultaAdministrativoService implements IConsultaAdministrativoService{

	private @Autowired IConsultaAdministrativoMapper ConsultaAdministrativoMapper;
	
	@Override
	public List<ConsultaAdministrativo> buscarTodos() {
		return ConsultaAdministrativoMapper.buscarTodos();
	}

	@Override
	public List<ConsultaAdministrativo> buscarPorCriterio(ConsultaAdministrativoCriterioBusqueda criterioBusqueda) {
		return ConsultaAdministrativoMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<ConsultaAdministrativo> buscarPorNumeroDocumentoIdentidad(
			NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda) {
		return ConsultaAdministrativoMapper.buscarPorNumeroDocumentoIdentidad(criterioBusqueda);
	}

	@Override
	public List<ConsultaAdministrativo> buscarPorCriterio2(ConsultaAdministrativoCriterioBusqueda criterioBusqueda) {
		return ConsultaAdministrativoMapper.buscarPorCriterio(criterioBusqueda);
	}

	
	
	
}

