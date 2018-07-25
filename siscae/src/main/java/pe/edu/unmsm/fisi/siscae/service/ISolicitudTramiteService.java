package pe.edu.unmsm.fisi.siscae.service;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.model.criterio.CriterioBusquedaNumeroDocumento;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SolicitudTramite;

public interface ISolicitudTramiteService extends IMantenibleService<SolicitudTramite>
{

    public List<SolicitudTramite> buscarTodos();

    public List<SolicitudTramite> buscarPorIdSolicitudTramite(Integer idSolicitudTramite);

    public boolean existeSolicitudTramite(Integer idSolicitudTramite);

    public void registrarSolicitudTramite(SolicitudTramite solicitudTramite);

    public void actualizarSolicitudTramite(SolicitudTramite solicitudTramite);

    public void eliminarSolicitudTramite(SolicitudTramite solicitudTramite);

    public List<SolicitudTramite> buscarPorUsuario(String idUsuario);
    
    public List<SolicitudTramite> buscarPorNumeroDocumento(CriterioBusquedaNumeroDocumento criterioBusquedaNumeroDocumento);

}
