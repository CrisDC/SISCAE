package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.seguridad.PerfilRecurso.PerfilRecursoBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerfilRecursoSeguridad {

	private int idPerfil;
	private int idRecurso;
	private String acciones;
}
