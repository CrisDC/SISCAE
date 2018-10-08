package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IMovimientoInfraccionMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoInfraccion;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoInfraccionService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class MovimientoInfraccionService extends MantenibleService<MovimientoInfraccion> implements IMovimientoInfraccionService {

	private IMovimientoInfraccionMapper movimientoInfraccionMapper;
	
	public MovimientoInfraccionService(@Qualifier("IMovimientoInfraccionMapper") IMantenibleMapper<MovimientoInfraccion> mapper) {
		super(mapper);
		this.movimientoInfraccionMapper = (IMovimientoInfraccionMapper) mapper;
	}

	@Override
	public void registrarInfraccion(MovimientoInfraccion movimientoInfraccion) {
		super.registrar(movimientoInfraccion);
	}
	
}
