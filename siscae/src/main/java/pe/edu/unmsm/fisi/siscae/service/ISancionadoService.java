package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaInfracciones;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Sancionado;

public interface ISancionadoService {

	public List<Sancionado> buscarPorCriterio(ConsultaInfracciones criterioBusqueda);
	
}
