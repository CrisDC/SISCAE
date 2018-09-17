package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.ConsultaPrestamosCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.criterio.NumeroDocumentoIdentidadCriterioBusqueda;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Prestamo;

public interface IConsultaDocumentosService
{    
	public List<Prestamo> buscarTodos();
	public List<Prestamo> buscarPorCriterio(ConsultaPrestamosCriterioBusqueda criterioBusqueda);
	public List<Prestamo> buscarPorNumeroDocumentoIdentidad(NumeroDocumentoIdentidadCriterioBusqueda criterioBusqueda); 
}
