package pe.edu.unmsm.fisi.siscae.model.seguridad;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PerfilRecurso {
   
	private int idPerfil;
	private int idRecurso;
	private String acciones;
}
