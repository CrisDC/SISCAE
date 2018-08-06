package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Persona;

public interface IPersonaService extends IMantenibleService<Persona> {

	public List<Persona> buscarTodos();

	public Persona buscarPorId(Integer idPersona);

	public boolean existe(Integer idPersona);

	public void registrarPersona(Persona persona);

	public void actualizarPersona(Persona persona);

	public void eliminarPersona(Persona persona);

}
