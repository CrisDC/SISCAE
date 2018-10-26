package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.ISolicitantesDetallesMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.SolicitantesDetalles;
import pe.edu.unmsm.fisi.siscae.model.criterio.SolicitantesDetallesCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.ISolicitantesDetallesService;

@Service
public class SolicitantesDetallesService implements ISolicitantesDetallesService{

	private @Autowired ISolicitantesDetallesMapper SolicitantesDetallesMapper;
	
	@Override
	public List<SolicitantesDetalles> buscarTodos() {
		return SolicitantesDetallesMapper.buscarTodos();
	}

	@Override
	public List<SolicitantesDetalles> buscarPorCriterio(SolicitantesDetallesCriterioBusqueda criterioBusqueda) {
		return SolicitantesDetallesMapper.buscarPorCriterio(criterioBusqueda);
	}

	@Override
	public List<SolicitantesDetalles> buscarPorCriterio2(SolicitantesDetallesCriterioBusqueda criterioBusqueda) {
		return SolicitantesDetallesMapper.buscarPorCriterio2(criterioBusqueda);
	}

	
	
}

