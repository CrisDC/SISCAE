package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SecAccion {
	private String idAccion;
	private String accion;
}
