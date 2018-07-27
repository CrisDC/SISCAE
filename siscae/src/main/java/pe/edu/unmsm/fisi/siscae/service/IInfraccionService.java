package pe.edu.unmsm.fisi.siscae.service;
import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Infraccion;
public interface IInfraccionService extends IMantenibleService<Infraccion> {
	 public List<Infraccion> buscarTodos();

	    public List<Infraccion> buscarPorIdInfraccion(Integer idInfraccion);

	    public boolean existeInfraccion(Integer idEmpresa);

	    public void registrarInfraccion(Infraccion infraccion);

	    public void actualizarInfraccion(Infraccion infraccion);

	    public void eliminarInfraccion(Infraccion infraccion);
	

}
