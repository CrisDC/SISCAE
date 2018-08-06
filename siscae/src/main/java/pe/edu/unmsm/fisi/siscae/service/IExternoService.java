package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Externo;

public interface IExternoService extends IMantenibleService<Externo> {
	public List<Externo> buscarTodos();

    public Externo buscarPorId(Integer idExterno);

    public boolean existe(Integer idExterno);

    public void registrarExterno(Externo externo);

    public void actualizarExterno(Externo externo);

    public void eliminarExterno(Externo externo);
	

}
