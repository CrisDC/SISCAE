package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor 
@NoArgsConstructor
public class SolicitudTramite
{
    private Integer idSolicitudTramite;
    private String asunto;
    private String fechaHoraRegistro;
    private String fechaHoraRegistroFormateado;
    private String estado;
    private String tipoTramite;
    private String descripcion;
    
}
