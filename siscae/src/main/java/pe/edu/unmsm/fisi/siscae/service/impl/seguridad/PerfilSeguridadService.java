package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IPerfilSeguridadMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IPerfilSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@Service
public class PerfilSeguridadService extends MantenibleService<PerfilSeguridad> implements IPerfilSeguridadService {

	private IPerfilSeguridadMapper perfilSeguridadMapper;

	public PerfilSeguridadService(@Qualifier("IPerfilSeguridadMapper") IMantenibleMapper<PerfilSeguridad> mapper) {
		super(mapper);
		this.perfilSeguridadMapper = (IPerfilSeguridadMapper) mapper;
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<PerfilSeguridad> buscarTodos() {
		// TODO Auto-generated method stub
		return super.buscar(new PerfilSeguridad(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public PerfilSeguridad buscarPorId(Integer idPerfil) {
		// TODO Auto-generated method stub
		PerfilSeguridad perfilSeguridad = PerfilSeguridad.builder().idPerfil(idPerfil).build();
		return super.buscarPorId(perfilSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idPerfil) {
		// TODO Auto-generated method stub
		PerfilSeguridad perfilSeguridad = PerfilSeguridad.builder().idPerfil(idPerfil).build();
		return super.existe(perfilSeguridad);
	}


	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarPerfilSeguridad(PerfilSeguridad perfilSeguridad) {
		// TODO Auto-generated method stub
		this.registrar(perfilSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarPerfilSeguridad(PerfilSeguridad perfilSeguridad) {
		// TODO Auto-generated method stub
		this.actualizar(perfilSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarPerfilSeguridad(PerfilSeguridad perfilSeguridad) {
		// TODO Auto-generated method stub
		this.eliminar(perfilSeguridad);
	}



}

