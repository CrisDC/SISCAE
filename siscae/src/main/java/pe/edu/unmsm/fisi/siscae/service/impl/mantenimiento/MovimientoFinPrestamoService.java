package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IMovimientoFinPrestamoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoFinPrestamo;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoFinPrestamoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class MovimientoFinPrestamoService extends MantenibleService<MovimientoFinPrestamo> implements IMovimientoFinPrestamoService {

	private IMovimientoFinPrestamoMapper movimientoFinPrestamoMapper;

	public MovimientoFinPrestamoService(
			@Qualifier("IMovimientoFinPrestamoMapper") IMantenibleMapper<MovimientoFinPrestamo> mapper) {
		super(mapper);

		this.movimientoFinPrestamoMapper = (IMovimientoFinPrestamoMapper) mapper;
	}

	
	@Override
	public void registrarMovimientoFinPrestamo(MovimientoFinPrestamo movimientoFinPrestamo) {
		this.registrar(movimientoFinPrestamo);
	}

}

