package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISolicitanteMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Solicitante;
import pe.edu.unmsm.fisi.siscae.service.ISolicitanteService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class SolicitanteService extends MantenibleService<Solicitante> implements ISolicitanteService {

	private ISolicitanteMapper SolicitanteMapper;

	public SolicitanteService(
			@Qualifier("ISolicitanteMapper") IMantenibleMapper<Solicitante> mapper) {
		super(mapper);

		this.SolicitanteMapper = (ISolicitanteMapper) mapper;
	}


	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarSolicitante(Solicitante Solicitante) {
		this.registrar(Solicitante);
		
	}


	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarSolicitante(Solicitante Solicitante) {
		this.actualizar(Solicitante);
		
	}


	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarSolicitante(Solicitante Solicitante) {
		this.eliminar(Solicitante);
		
	}

}

