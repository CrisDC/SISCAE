package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadoTabla {
	
	private String tablaOrigen;
	private Integer idEstadoTabla;
	private String descripcion;
	private Boolean estado;

}
