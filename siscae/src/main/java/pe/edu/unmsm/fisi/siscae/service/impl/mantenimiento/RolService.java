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

	
	private  IRolMapper rolMapper;
	
	
	 public RolService(@Qualifier("IRolMapper") IMantenibleMapper<Rol> mapper)
	    {
	        super(mapper);
	        this.rolMapper = (IRolMapper) mapper;
	    }
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<Rol> buscarTodos() {
		return this.buscar(new Rol(),Operacion.SELECT);
	
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public List<Rol> buscarPorIdRol(Integer idRol) {
		Rol rol = Rol.builder().idRol(idRol).build();
		return this.buscar(rol, Operacion.SELECT, OperacionParam.PRIMARY_KEY);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existeRol(Integer idRol) {
		return !this.buscarPorIdRol(idRol).isEmpty();
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarRol(Rol rol) {
		this.registrarRol(rol);
		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarRol(Rol rol) {
		this.actualizarRol(rol);
		
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarRol(Rol rol) {
		// TODO Auto-generated method stub
		
	}

}
