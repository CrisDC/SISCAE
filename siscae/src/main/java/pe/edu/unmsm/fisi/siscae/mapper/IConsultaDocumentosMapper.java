package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.Documento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaDocumento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaNumeroDocumento;


public interface IConsultaDocumentosMapper
{
   public List<Documento> buscarPorNumeroDocumento(CriterioBusquedaNumeroDocumento criterioBusquedaNumeroDocumento);
    
    public List<Documento> buscarPorCriterio(CriterioBusquedaDocumento criterioBusquedaDocumento);

    public Documento buscarPorNumeroEmision(CriterioBusquedaDocumento criterioBusquedaDocumento);
}
