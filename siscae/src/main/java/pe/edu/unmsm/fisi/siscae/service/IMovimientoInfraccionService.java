package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoInfraccion;

public interface IMovimientoInfraccionService extends IMantenibleService<MovimientoInfraccion> {

	public void registrarInfraccion(MovimientoInfraccion movimientoInfraccion);
	
}
