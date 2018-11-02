package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaAdministrativo;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaAdministrativoCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;

public interface IConsultaAdministrativoMapper {
	public List<ConsultaAdministrativo> buscarTodos();
	public List<ConsultaAdministrativo> buscarPorCriterio(ConsultaAdministrativoCriterioBusqueda criterioBusqueda);
	public List<ConsultaAdministrativo> buscarPorCriterio2(ConsultaAdministrativoCriterioBusqueda criterioBusqueda);
	public List<ConsultaAdministrativo> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
	
}
