package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IMovimientoConsultarEstadoSolicitanteMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoConsultarEstadoSolicitante;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoConsultarEstadoSolicitanteService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class MovimientoConsultarEstadoSolicitanteService extends MantenibleService<MovimientoConsultarEstadoSolicitante> implements IMovimientoConsultarEstadoSolicitanteService {

	private IMovimientoConsultarEstadoSolicitanteMapper movimientoConsultarEstadoSolicitanteMapper;

	public MovimientoConsultarEstadoSolicitanteService(
			@Qualifier("IMovimientoConsultarEstadoSolicitanteMapper") IMantenibleMapper<MovimientoConsultarEstadoSolicitante> mapper) {
		super(mapper);

		this.movimientoConsultarEstadoSolicitanteMapper = (IMovimientoConsultarEstadoSolicitanteMapper) mapper;
	}

	
	@Override
	public void registrarMovimientoConsultarEstadoSolicitante(MovimientoConsultarEstadoSolicitante movimientoConsultarEstadoSolicitante) {
		this.registrar(movimientoConsultarEstadoSolicitante);
	}

}


