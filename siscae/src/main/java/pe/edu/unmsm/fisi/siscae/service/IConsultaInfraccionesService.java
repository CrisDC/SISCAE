package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.consulta.Infracciones;
import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;

public interface IConsultaInfraccionesService {
	public List<Infracciones> buscarTodos();
	public List<Infracciones> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<Infracciones> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda);
}
