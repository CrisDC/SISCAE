package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Ubicacion;

public interface IUbicacionService extends IMantenibleService<Ubicacion> {

	public List<Ubicacion> buscarTodos();

	public Ubicacion buscarPorId(Integer idUbicacion);

	public boolean existe(Integer idUbicacion);

	public void registrarUbicacion(Ubicacion ubicacion);

	public void actualizarUbicacion(Ubicacion ubicacion);

	public void eliminarUbicacion(Ubicacion ubicacion);

}
