package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.sun.star.util.DateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor


public class TipoRecurso {
	 	private Integer idTipoRecurso;
		private String nombre;
		private String descripcion;
		private String uso;
		private DateTime fechaRegistro;
		private String usuarioRegistro;
		private DateTime fechaModificacion;
		private String usuarioModificacion;
		
	

}
