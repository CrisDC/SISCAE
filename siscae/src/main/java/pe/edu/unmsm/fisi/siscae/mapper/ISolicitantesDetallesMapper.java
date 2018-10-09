package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.SolicitantesDetalles;
import pe.edu.unmsm.fisi.siscae.model.criterio.SolicitantesDetallesCriterioBusqueda;

public interface ISolicitantesDetallesMapper {
	public List<SolicitantesDetalles> buscarTodos();
	public List<SolicitantesDetalles> buscarPorCriterio(SolicitantesDetallesCriterioBusqueda criterioBusqueda);
}


