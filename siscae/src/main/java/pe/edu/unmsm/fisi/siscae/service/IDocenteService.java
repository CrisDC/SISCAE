package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Docente;

public interface IDocenteService extends IMantenibleService<Docente> {

	public List<Docente> buscarTodos();

	public List<Docente> buscarPorIdDocente(Integer idDocente);

	public boolean existeDocente(Integer idDocente);

	public void registrarDocente(Docente docente);

	public void actualizarDocente(Docente docente);

	public void eliminarDocente(Docente docente);

}
