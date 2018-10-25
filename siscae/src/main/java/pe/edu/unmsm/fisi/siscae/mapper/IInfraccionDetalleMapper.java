package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.InfraccionDetalle;
import pe.edu.unmsm.fisi.siscae.model.criterio.InfraccionDetalleCriterioBusqueda;

public interface IInfraccionDetalleMapper {

	public List<InfraccionDetalle> buscarTodos();
	public List<InfraccionDetalle> buscarPorCriterio(InfraccionDetalleCriterioBusqueda criterioBusqueda);
	
}
