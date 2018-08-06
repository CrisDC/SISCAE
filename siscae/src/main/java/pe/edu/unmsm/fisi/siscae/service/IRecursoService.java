package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso;

public interface IRecursoService extends IMantenibleService<Recurso> {
	public List<Recurso> buscarTodos();

	public Recurso buscarPorId(Integer idRecurso);

	public boolean existe(Integer idRecurso);

	public void registrarRecurso(Recurso recurso);

	public void actualizarRecurso(Recurso recurso);

	public void eliminarRecurso(Recurso recurso);
}