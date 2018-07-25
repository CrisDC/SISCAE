package pe.edu.unmsm.fisi.siscae.model.CriterioResumenExpediente;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CriterioResumenExpediente
{
    private String codigoFacultad;
    private String codigoTipoTramite;
    
}
