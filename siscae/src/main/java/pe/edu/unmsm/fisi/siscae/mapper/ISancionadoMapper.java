package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaInfracciones;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Sancionado;



public interface ISancionadoMapper {

	public List<Sancionado> buscarPorCriterio(ConsultaInfracciones criterioBusqueda);
	
}
