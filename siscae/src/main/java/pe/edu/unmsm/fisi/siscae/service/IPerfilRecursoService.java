package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecurso;

public interface IPerfilRecursoService {
   
	
	public List<PerfilRecurso> buscarTodos();

    public PerfilRecurso buscarPorId(Integer idEscuela);

    public boolean existe(Integer idEscuela);

    public void registrarEscuela(PerfilRecurso perfilRecurso);

    public void actualizarEscuela(PerfilRecurso perfilRecurso);

    public void eliminarEscuela(PerfilRecurso perfilRecurso);
}
