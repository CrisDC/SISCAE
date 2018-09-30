package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.Infracciones;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;

public interface IConsultaInfraccionesMapper {
	public List<Infracciones> buscarTodos();
	public List<Infracciones> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<Infracciones> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
}
