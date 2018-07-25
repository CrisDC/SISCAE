package pe.edu.unmsm.fisi.siscae.service.impl.seguridad;

import java.util.List;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import pe.edu.unmsm.fisi.siscae.mapper.ISecTipoAuditoriaMapper;
import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.seguridad.SecTipoAuditoria;
import pe.edu.unmsm.fisi.siscae.service.ISecTipoAuditoriaService;
import pe.edu.unmsm.fisi.siscae.service.impl.MantenibleService;
import pe.edu.unmsm.fisi.siscae.utilitario.Operacion;
import pe.edu.unmsm.fisi.siscae.utilitario.VerboConstantes;

@Service
public class SecTipoAuditoriaService extends MantenibleService<SecTipoAuditoria>
        implements ISecTipoAuditoriaService
{
    private ISecTipoAuditoriaMapper secTipoAuditoriaMapper;

    public SecTipoAuditoriaService(
            @Qualifier("ISecTipoAuditoriaMapper") IMantenibleMapper<SecTipoAuditoria> mapper)
    {
        this.secTipoAuditoriaMapper = (ISecTipoAuditoriaMapper) mapper;
    } 

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public List<SecTipoAuditoria> buscarTodos()
    {
        return this.buscar(new SecTipoAuditoria(), Operacion.SELECT);
    }
}