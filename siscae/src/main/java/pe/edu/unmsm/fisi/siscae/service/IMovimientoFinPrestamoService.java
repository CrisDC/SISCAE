package pe.edu.unmsm.fisi.siscae.service;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoFinPrestamo;

public interface IMovimientoFinPrestamoService extends IMantenibleService<MovimientoFinPrestamo>{
	public void registrarMovimientoFinPrestamo(MovimientoFinPrestamo movimientoFinPrestamo);
}