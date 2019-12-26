package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecursoSeguridad;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilSeguridad;

public interface IPerfilRecursoSeguridadService  extends IMantenibleService<PerfilRecursoSeguridad>{

	public List<PerfilRecursoSeguridad> buscarTodos();

    public PerfilRecursoSeguridad buscarPorId(Integer idPerfil,Integer idRecurso);

    public boolean existe(Integer idPerfil,Integer idRecurso);

    public void registrarPerfilRecursoSeguridad(PerfilRecursoSeguridad perfilRecursoSeguridad);

    public void actualizarPerfilRecursoSeguridad(PerfilRecursoSeguridad perfilRecursoSeguridad);

    public void eliminarPerfilRecursoSeguridad(PerfilRecursoSeguridad perfilRecursoSeguridad);
}
