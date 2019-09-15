package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Autowired;

import pe.edu.unmsm.fisi.siscae.mapper.IMovimientoInfraccionLevantarMapper;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoInfraccionLevantarService;

public class MovimientoInfraccionLevantarService implements IMovimientoInfraccionLevantarService {

	
	public @Autowired IMovimientoInfraccionLevantarMapper movimientoInfraccionLevantarMapper;
	
	@Override
	public void levantarInfraccion() {
		movimientoInfraccionLevantarMapper.levantarInfraccion();		
	}

}
