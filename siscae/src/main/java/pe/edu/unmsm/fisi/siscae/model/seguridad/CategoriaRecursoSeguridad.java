package pe.edu.unmsm.fisi.siscae.model.seguridad;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.seguridad.RecursoSeguridad.RecursoSeguridadBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoriaRecursoSeguridad {
	
	private int idCategoriaRecurso;
	private String descripcion;

}
