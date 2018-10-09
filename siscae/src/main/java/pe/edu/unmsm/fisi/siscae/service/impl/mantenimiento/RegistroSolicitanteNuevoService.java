package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IRegistroSolicitanteNuevoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.RegistroSolicitanteNuevo;
import pe.edu.unmsm.fisi.siscae.service.IRegistroSolicitanteNuevoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class RegistroSolicitanteNuevoService extends MantenibleService<RegistroSolicitanteNuevo> implements IRegistroSolicitanteNuevoService {

	private IRegistroSolicitanteNuevoMapper RegistroSolicitanteNuevoMapper;

	public RegistroSolicitanteNuevoService(
			@Qualifier("IRegistroSolicitanteNuevoMapper") IMantenibleMapper<RegistroSolicitanteNuevo> mapper) {
		super(mapper);

		this.RegistroSolicitanteNuevoMapper = (IRegistroSolicitanteNuevoMapper) mapper;
	}

	
	@Override
	public void registrarRegistroSolicitanteNuevo(RegistroSolicitanteNuevo RegistroSolicitanteNuevo) {
		this.registrar(RegistroSolicitanteNuevo);
	}

}

