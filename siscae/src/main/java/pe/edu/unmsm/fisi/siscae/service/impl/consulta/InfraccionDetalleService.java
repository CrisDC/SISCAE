package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IInfraccionDetalleMapper;
import pe.edu.unmsm.fisi.siscae.model.consulta.InfraccionDetalle;
import pe.edu.unmsm.fisi.siscae.model.criterio.InfraccionDetalleCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.service.IInfraccionDetalleService;

@Service
public class InfraccionDetalleService implements IInfraccionDetalleService {

	private @Autowired IInfraccionDetalleMapper infraccionDetalleMapper;
	
	@Override
	public List<InfraccionDetalle> buscarTodos() {
		return infraccionDetalleMapper.buscarTodos();
	}

	@Override
	public List<InfraccionDetalle> buscarPorCriterio(InfraccionDetalleCriterioBusqueda criterioBusqueda) {
		return infraccionDetalleMapper.buscarPorCriterio(criterioBusqueda);
	}

	
	
}
