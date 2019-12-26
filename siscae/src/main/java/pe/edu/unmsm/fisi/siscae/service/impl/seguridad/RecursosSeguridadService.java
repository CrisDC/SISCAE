package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IRecursoSeguridadMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.model.seguridad.RecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.service.IRecursoSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

public class RecursosSeguridadService extends MantenibleService<RecursoSeguridad> implements IRecursoSeguridadService{

	
	private IRecursoSeguridadMapper recursoSeguridadMapper;
	
	public RecursosSeguridadService(@Qualifier("IRecursoSeguridadMapper") IMantenibleMapper<RecursoSeguridad> mapper) {
		super(mapper);
		this.recursoSeguridadMapper = (IRecursoSeguridadMapper) mapper;
	}
	
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<RecursoSeguridad> buscarTodos() {
		return super.buscar(new RecursoSeguridad(), Operacion.SELECT);
	
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public RecursoSeguridad buscarPorId(Integer idPerfil) {
		RecursoSeguridad recursoSeguridad = RecursoSeguridad.builder().idRecurso(idPerfil).build();
		return super.buscarPorId(recursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idPerfil) {
		RecursoSeguridad recursoSeguridad = RecursoSeguridad.builder().idRecurso(idPerfil).build();
		return super.existe(recursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarRecursoSeguridad(RecursoSeguridad recursoSeguridad) {
		this.registrar(recursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarRecursoSeguridad(RecursoSeguridad recursoSeguridad) {
		this.actualizar(recursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarRecursoSeguridad(RecursoSeguridad recursoSeguridad) {
		this.eliminar(recursoSeguridad);
	}

}
