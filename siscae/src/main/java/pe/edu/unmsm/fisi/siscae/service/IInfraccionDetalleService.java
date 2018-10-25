package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.InfraccionDetalle;
import pe.edu.unmsm.fisi.siscae.model.criterio.InfraccionDetalleCriterioBusqueda;

public interface IInfraccionDetalleService {

	public List<InfraccionDetalle> buscarTodos();
	public List<InfraccionDetalle> buscarPorCriterio(InfraccionDetalleCriterioBusqueda criterioBusqueda);
	
}
