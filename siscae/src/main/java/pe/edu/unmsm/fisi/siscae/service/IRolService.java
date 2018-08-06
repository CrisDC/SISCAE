package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Rol;



public  interface IRolService extends IMantenibleService<Rol> {
	public List<Rol> buscarTodos();

    public Rol buscarPorId(Integer idRol);

    public boolean existe(Integer idRol);

    public void registrarRol(Rol rol);

    public void actualizarRol(Rol rol);

    public void eliminarRol(Rol rol);
}
