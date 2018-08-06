package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Material;
import pe.edu.unmsm.fisi.siscae.service.IMantenibleService;



public interface IMaterialService extends IMantenibleService<Material> {

	public List<Material> buscarTodos();

    public Material buscarPorId(Integer idMaterial);

    public boolean existe(Integer idMaterial);

    public void registrarMaterial(Material material);

    public void actualizarMaterial(Material material);

    public void eliminarMaterial(Material material);
	
}
