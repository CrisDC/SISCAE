package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecursoSeguridad;

public interface ICategoriaRecursoSeguridadService extends IMantenibleService<CategoriaRecursoSeguridad>{

	public List<CategoriaRecursoSeguridad> buscarTodos();

    public CategoriaRecursoSeguridad buscarPorId(Integer idPerfil);

    public boolean existe(Integer idPerfil);

    public void registrarCategoriaRecursoSeguridad(CategoriaRecursoSeguridad categoriaRecursoSeguridad);

    public void actualizarCategoriaRecursoSeguridad(CategoriaRecursoSeguridad categoriaRecursoSeguridad);

    public void eliminarCategoriaRecursoSeguridad(CategoriaRecursoSeguridad categoriaRecursoSeguridad);
}
