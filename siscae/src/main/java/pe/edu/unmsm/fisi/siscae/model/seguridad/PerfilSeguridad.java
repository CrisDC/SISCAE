package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecursoSeguridad.PerfilRecursoSeguridadBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerfilSeguridad {

	private int idPerfil;
	private String nombre;
	
}
