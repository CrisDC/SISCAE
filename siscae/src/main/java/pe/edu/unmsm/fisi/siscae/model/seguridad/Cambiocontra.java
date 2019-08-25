package pe.edu.unmsm.fisi.siscae.model.seguridad;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.MultiTabDet;
import pe.edu.unmsm.fisi.siscae.model.seguridad.CategoriaRecurso.CategoriaRecursoBuilder;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cambiocontra {
	private String username;
    private String pass;
    private String ingrepass;
    private String nuevopass;

}

