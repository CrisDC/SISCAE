package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IMovimientoPrestamoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoPrestamo;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoPrestamoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class MovimientoPrestamoService extends MantenibleService<MovimientoPrestamo> implements IMovimientoPrestamoService {

	private IMovimientoPrestamoMapper movimientoPrestamoMapper;

	public MovimientoPrestamoService(
			@Qualifier("IMovimientoPrestamoMapper") IMantenibleMapper<MovimientoPrestamo> mapper) {
		super(mapper);

		this.movimientoPrestamoMapper = (IMovimientoPrestamoMapper) mapper;
	}

	
	@Override
	public void registrarMovimientoPrestamo(MovimientoPrestamo movimientoPrestamo) {
		this.registrar(movimientoPrestamo);
	}

}
