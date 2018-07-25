package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecRecurso;

public interface ISecRecursoService extends IMantenibleService<SecRecurso> {
	
	public List<SecRecurso> getLsRecurso();

	public void registrarRecurso(SecRecurso recurso);

	public void actualizarRecurso(SecRecurso recurso);

	public List<SecRecurso> buscarPorCodigoRecurso(String recurso);

	public void eliminarRecurso(SecRecurso recurso);
}