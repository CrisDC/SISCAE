package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Administrativo;

public interface IAdministrativoService extends IMantenibleService<Administrativo> {

	public List<Administrativo> buscarTodos();

    public Administrativo buscarPorId(Integer idAdministrativo);

    public boolean existe(Integer idAdministrativo);

    public void registrarAdministrativo(Administrativo administrativo);

    public void actualizarAdministrativo(Administrativo administrativo);

    public void eliminarAdministrativo(Administrativo administrativo);
	
    public List<Administrativo> buscarConNombre();
}
