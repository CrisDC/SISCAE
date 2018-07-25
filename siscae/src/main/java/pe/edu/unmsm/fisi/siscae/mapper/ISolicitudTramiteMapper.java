package pe.edu.unmsm.fisi.siscae.mapper;

import java.util.List;

import pe.edu.unmsm.fisi.siscae.mapper.base.IMantenibleMapper;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.SolicitudTramite;
import pe.edu.unmsm.fisi.siscae.model.parametro.Parametro;

public interface ISolicitudTramiteMapper extends IMantenibleMapper<SolicitudTramite> {
    
    public List<SolicitudTramite> mantener(Parametro<SolicitudTramite> parametro);
    
}