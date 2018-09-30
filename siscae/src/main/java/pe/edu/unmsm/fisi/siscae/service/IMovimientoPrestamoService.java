package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoPrestamo;

public interface IMovimientoPrestamoService extends IMantenibleService<MovimientoPrestamo>{
	
	public void registrarMovimientoPrestamo(MovimientoPrestamo movimientoPrestamo);
}
