package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.mantenimiento.EstadoTabla;

public interface IEstadoTablaService extends IMantenibleService<EstadoTabla> {

	public List<EstadoTabla> buscarTodos();
	
	public EstadoTabla buscarPorId(Integer idEstadoTabla);
	
	public List<EstadoTabla> buscarporTablaOrigen(String tablaOrigen);
	
	public boolean existe(Integer idEstadoTabla);
	
	public void registrarEstadoTabla(EstadoTabla estadoTabla);
	
	public void actualizarEstadoTabla(EstadoTabla estadoTabla);
	
	public void eliminarEstadoTabla(EstadoTabla estadoTabla);
	
}
