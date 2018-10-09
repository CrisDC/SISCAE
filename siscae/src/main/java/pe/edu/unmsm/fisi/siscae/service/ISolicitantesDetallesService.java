package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.SolicitantesDetalles;
import pe.edu.unmsm.fisi.siscae.model.criterio.SolicitantesDetallesCriterioBusqueda;

public interface ISolicitantesDetallesService {
	public List<SolicitantesDetalles> buscarTodos();
	public List<SolicitantesDetalles> buscarPorCriterio(SolicitantesDetallesCriterioBusqueda criterioBusqueda);
	
}
