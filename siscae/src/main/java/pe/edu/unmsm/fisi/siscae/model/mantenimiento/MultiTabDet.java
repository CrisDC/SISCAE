package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MultiTabDet
{
	private Integer idItem;
	private Integer idTabla;
    private String descripcion;
    private String descripcionCorta;
    
    
}