package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerfilRecursoSeguridad {

	private int idPerfil;
	private int idRecurso;
	private String nombreRecurso;
	private String acciones;
	
	private String nombreUsuario;
}
