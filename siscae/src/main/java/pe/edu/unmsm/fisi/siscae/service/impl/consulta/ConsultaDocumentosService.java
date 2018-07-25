package pe.edu.unmsm.fisi.siscae.service.impl.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.IConsultaDocumentosMapper;
import pe.edu.unmsm.fisi.siscae.model.Documento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaDocumento;
import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaNumeroDocumento;
import pe.edu.unmsm.fisi.siscae.service.IConsultaDocumentosService;

@Service
public class ConsultaDocumentosService implements IConsultaDocumentosService
{ 
    private @Autowired IConsultaDocumentosMapper consultaDocumentoMapper;

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Documento> buscarPorNumeroDocumento(CriterioBusquedaNumeroDocumento criterioBusquedaNumeroDocumento)
    {
        return consultaDocumentoMapper.buscarPorNumeroDocumento(criterioBusquedaNumeroDocumento);
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<Documento> buscarPorCriterio(
            CriterioBusquedaDocumento criterioBusquedaDocumento) 
    {
        return consultaDocumentoMapper.buscarPorCriterio(criterioBusquedaDocumento);
    }

    @Override
    public Documento buscarPorNumeroEmision(CriterioBusquedaDocumento criterioBusquedaDocumento)
    {
        return consultaDocumentoMapper.buscarPorNumeroEmision(criterioBusquedaDocumento);
    }
}
