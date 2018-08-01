package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Rol;



public  interface IRolService extends IMantenibleService<Rol> {
	public List<Rol> buscarTodos();

    public List<Rol> buscarPorIdRol(Integer idRol);

    public boolean existeRol(Integer idRol);

    public void registrarRol(Rol rol);

    public void actualizarRol(Rol rol);

    public void eliminarRol(Rol rol);
}
