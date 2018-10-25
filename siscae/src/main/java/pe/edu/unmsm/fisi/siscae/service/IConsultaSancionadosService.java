package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaSancionados;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaSancionadosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;

public interface IConsultaSancionadosService {
	public List<ConsultaSancionados> buscarTodos();
	public List<ConsultaSancionados> buscarPorCriterio(ConsultaSancionadosCriterioBusqueda criterioBusqueda);
	public List<ConsultaSancionados> buscarPorCriterio2(ConsultaSancionadosCriterioBusqueda criterioBusqueda);
	public List<ConsultaSancionados> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
}

