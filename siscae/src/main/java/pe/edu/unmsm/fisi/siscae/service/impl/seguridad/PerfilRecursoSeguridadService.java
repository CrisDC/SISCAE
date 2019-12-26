package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IPerfilRecursoSeguridadMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IPerfilRecursoSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

@Service
public class PerfilRecursoSeguridadService extends MantenibleService<PerfilRecursoSeguridad> implements IPerfilRecursoSeguridadService{

	
	private IPerfilRecursoSeguridadMapper perfilRecursoSeguridadMapper;

	public PerfilRecursoSeguridadService(@Qualifier("IPerfilRecursoSeguridadMapper") IMantenibleMapper<PerfilRecursoSeguridad> mapper) {
		super(mapper);
		this.perfilRecursoSeguridadMapper = (IPerfilRecursoSeguridadMapper) mapper;
	}


	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<PerfilRecursoSeguridad> buscarTodos() {
		return super.buscar(new PerfilRecursoSeguridad());
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<PerfilRecursoSeguridad> buscarPorNombreUsuario(String nombreUsuario) {
		PerfilRecursoSeguridad perfilRecursoSeguridad = PerfilRecursoSeguridad.builder().nombreUsuario(nombreUsuario).build();
		return super.buscar(perfilRecursoSeguridad, Operacion.OperacionParam.USUARIO);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public PerfilRecursoSeguridad buscarPorId(Integer idPerfil, Integer idRecurso) {
		PerfilRecursoSeguridad perfilRecursoSeguridad = PerfilRecursoSeguridad.builder().idPerfil(idPerfil).idRecurso(idRecurso).build();
		return super.buscarPorId(perfilRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idPerfil, Integer idRecurso) {
		PerfilRecursoSeguridad perfilRecursoSeguridad = PerfilRecursoSeguridad.builder().idPerfil(idPerfil).idRecurso(idRecurso).build();
		return super.existe(perfilRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarPerfilRecursoSeguridad(PerfilRecursoSeguridad perfilRecursoSeguridad) {
		this.actualizar(perfilRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarPerfilRecursoSeguridad(PerfilRecursoSeguridad perfilRecursoSeguridad) {
		this.eliminar(perfilRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarPerfilRecursoSeguridad(PerfilRecursoSeguridad perfilRecursoSeguridad) {
		this.registrar(perfilRecursoSeguridad);
	}



}



