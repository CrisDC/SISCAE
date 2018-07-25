package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.Documento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaDocumento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaNumeroDocumento;

public interface IConsultaDocumentosService
{    
    List<Documento> buscarPorCriterio(CriterioBusquedaDocumento criterioBusquedaDocumento);    
    List<Documento> buscarPorNumeroDocumento(CriterioBusquedaNumeroDocumento criterioBusquedaNumeroDocumento);
    Documento buscarPorNumeroEmision(CriterioBusquedaDocumento criterioBusquedaDocumento);    
}
