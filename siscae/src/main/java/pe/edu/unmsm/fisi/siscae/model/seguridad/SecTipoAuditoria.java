package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.Data;

@Data
public class SecTipoAuditoria
{
    private Integer idTipoAuditoria;
    private String descripcion;
    private String codigoAuditoria;
}