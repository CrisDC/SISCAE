package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ICategoriaRecursoSeguridadMapper;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilSeguridad;
import pe.edu.unmsm.fisi.siscae.service.ICategoriaRecursoSeguridadService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;

public class CategoriaRecursoSeguridadService extends MantenibleService<CategoriaRecursoSeguridad> implements ICategoriaRecursoSeguridadService {

	private ICategoriaRecursoSeguridadMapper categoriaRecursoSeguridadMapper;
	
	public CategoriaRecursoSeguridadService(@Qualifier("ICategoriaRecursoSeguridadMapper") IMantenibleMapper<CategoriaRecursoSeguridad> mapper) {
		super(mapper);
		this.categoriaRecursoSeguridadMapper = (ICategoriaRecursoSeguridadMapper) mapper;
	}
	
	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public List<CategoriaRecursoSeguridad> buscarTodos() {
		return super.buscar(new CategoriaRecursoSeguridad(), Operacion.SELECT);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public CategoriaRecursoSeguridad buscarPorId(Integer idPerfil) {
		CategoriaRecursoSeguridad categoriaRecursoSeguridad = CategoriaRecursoSeguridad.builder().idCategoriaRecurso(idPerfil).build();
		return super.buscarPorId(categoriaRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRED)
	public boolean existe(Integer idPerfil) {
		CategoriaRecursoSeguridad categoriaRecursoSeguridad = CategoriaRecursoSeguridad.builder().idCategoriaRecurso(idPerfil).build();
		return super.existe(categoriaRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void registrarCategoriaRecursoSeguridad(CategoriaRecursoSeguridad categoriaRecursoSeguridad) {
		this.registrar(categoriaRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void actualizarCategoriaRecursoSeguridad(CategoriaRecursoSeguridad categoriaRecursoSeguridad) {
		this.actualizar(categoriaRecursoSeguridad);
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void eliminarCategoriaRecursoSeguridad(CategoriaRecursoSeguridad categoriaRecursoSeguridad) {
		this.eliminar(categoriaRecursoSeguridad);
	}

}
