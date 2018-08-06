package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IPrestamoMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;
import pe.edu.unmsm.fisi.siscae.service.IPrestamoService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

@Service
public class PrestamoService extends MantenibleService<Prestamo> implements IPrestamoService {

	private IPrestamoMapper prestamoMapper;

	public PrestamoService(@Qualifier("IPrestamoMapper") IMantenibleMapper<Prestamo> mapper) {
		super(mapper);
		this.prestamoMapper = (IPrestamoMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Prestamo> buscarTodos() {
		return this.buscar(new Prestamo(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Prestamo buscarPorId(Integer idPrestamo) {
		Prestamo prestamo = Prestamo.builder().idAdministrativo(idPrestamo).build();
		return super.buscarPorId(prestamo);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idPrestamo) {
		Prestamo prestamo = Prestamo.builder().idAdministrativo(idPrestamo).build();
		return super.existe(prestamo);
	}

	@Override
	public void registrarPrestamo(Prestamo prestamo) {
		this.registrar(prestamo);
	}

	@Override
	public void actualizarPrestamo(Prestamo prestamo) {
		this.actualizar(prestamo);
	}

	@Override
	public void eliminarPrestamo(Prestamo prestamo) {
		this.eliminar(prestamo);
	}

}
