package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IUbicacionMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Ubicacion;
import pe.edu.unmsm.fisi.siscae.service.IUbicacionService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

public class UbicacionService extends MantenibleService<Ubicacion> implements IUbicacionService {

	private IUbicacionMapper ubicacionMapper;

	public UbicacionService(@Qualifier("IUbicacionMapper") IMantenibleMapper<Ubicacion> mapper) {
		super(mapper);
		this.ubicacionMapper = (IUbicacionMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Ubicacion> buscarTodos() {
		return super.buscar(new Ubicacion(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Ubicacion> buscarPorIdUbicacion(Integer idUbicacion) {
		Ubicacion ubicacion = Ubicacion.builder().idUbicacion(idUbicacion).build();
		return super.buscar(ubicacion, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeUbicacion(Integer idUbicacion) {
		return !this.buscarPorIdUbicacion(idUbicacion).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarUbicacion(Ubicacion ubicacion) {
		super.registrar(ubicacion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarUbicacion(Ubicacion ubicacion) {
		super.actualizar(ubicacion);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarUbicacion(Ubicacion ubicacion) {
		super.eliminar(ubicacion);
	}

}
