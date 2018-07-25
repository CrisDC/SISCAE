package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.seguridad.SecTipoAuditoria;

public interface ISecTipoAuditoriaService extends IMantenibleService<SecTipoAuditoria>
{
    public List<SecTipoAuditoria> buscarTodos();
}
