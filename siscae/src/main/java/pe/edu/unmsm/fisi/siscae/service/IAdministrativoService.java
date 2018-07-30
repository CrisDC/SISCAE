package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.practica.Administrativo;
import pe.edu.unmsm.fisi.siscae.service.IMantenibleService;



public interface IAdministrativoService extends IMantenibleService<Administrativo> {

	public List<Administrativo> buscarTodos();

    public List<Administrativo> buscarPorIdAdministrativo(Integer idAdministrativo);

    public boolean existeAdministrativo(Integer idAdministrativo);

    public void registrarAdministrativo(Administrativo administrativo);

    public void actualizarAdministrativo(Administrativo administrativo);

    public void eliminarAdministrativo(Administrativo administrativo);
	
}
