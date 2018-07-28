package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Empresa;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Escuela;

public interface IEscuelaService extends IMantenibleService<Escuela>{
	
	public List<Escuela> buscarTodos();

    public List<Escuela> buscarPorIdEscuela(Integer idEscuela);

    public boolean existeEscuela(Integer idEscuela);

    public void registrarEscuela(Escuela escuela);

    public void actualizarEscuela(Escuela escuela);

    public void eliminarEscuela(Escuela escuela);

}
