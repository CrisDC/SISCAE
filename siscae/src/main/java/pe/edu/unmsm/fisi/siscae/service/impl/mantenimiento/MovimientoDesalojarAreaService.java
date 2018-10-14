package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import pe.edu.unmsm.fisi.siscae.mapper.IMovimientoDesalojarAreaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MovimientoDesalojarArea;
import pe.edu.unmsm.fisi.siscae.service.IMovimientoDesalojarAreaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;

@Service
public class MovimientoDesalojarAreaService extends MantenibleService<MovimientoDesalojarArea> implements IMovimientoDesalojarAreaService {

	private IMovimientoDesalojarAreaMapper movimientoDesalojarAreaMapper;

	public MovimientoDesalojarAreaService(
			@Qualifier("IMovimientoDesalojarAreaMapper") IMantenibleMapper<MovimientoDesalojarArea> mapper) {
		super(mapper);

		this.movimientoDesalojarAreaMapper = (IMovimientoDesalojarAreaMapper) mapper;
	}

	
	@Override
	public void registrarMovimientoDesalojarArea(MovimientoDesalojarArea movimientoDesalojarArea) {
		this.registrar(movimientoDesalojarArea);
	}

}


