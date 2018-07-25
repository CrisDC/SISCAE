package pe.edu.unmsm.fisi.siscae.model.criterio;

import lombok.Data;

@Data
public class CriterioBusquedaDocumento
{
    private String nombres;
    private String apellidos;
    private String codigoTipoTramite;
    private String codigoTipoDocumento;
    private String numeroEmision;
}
