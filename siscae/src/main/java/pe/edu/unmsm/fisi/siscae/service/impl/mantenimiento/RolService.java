package pe.edu.unmsm.fisi.siscae.service.impl.mantenimiento;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IRolMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Rol;
import pe.edu.unmsm.fisi.siscae.service.IRolService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion.OperacionParam;

public class RolService extends MantenibleService<Rol> implements IRolService {

	private IRolMapper rolMapper;

	public RolService(@Qualifier("IRolMapper") IMantenibleMapper<Rol> mapper) {
		super(mapper);
		this.rolMapper = (IRolMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Rol> buscarTodos() {
		return super.buscar(new Rol(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public Rol buscarPorId(Integer idRol) {
		Rol rol = Rol.builder().idRol(idRol).build();
		return super.buscarPorId(rol);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idRol) {
		Rol rol = Rol.builder().idRol(idRol).build();
		return super.existe(rol);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarRol(Rol rol) {
		super.registrar(rol);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarRol(Rol rol) {
		super.actualizar(rol);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarRol(Rol rol) {
		super.eliminar(rol);
	}

}
