package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoPrestamo;
import pe.edu.unmsm.fisi.siscae.service.IAdministrativoService;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoPrestamoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class MovimientoPrestamoService extends MantenibleService<MovimientoPrestamo> implements IMovimientoPrestamoService {

	@Override
	public void registrarMovimientoPrestamo(MovimientoPrestamo movimientoPrestamo) {
		this.registrar(movimientoPrestamo);
	}

}
