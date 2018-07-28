package pe.edu.unmsm.fisi.siscae.model.mantenimiento;
import com.sun.star.bridge.oleautomation.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

      public class Alumno {
		
		private Integer idAlumno;
		private String codigo;
		private String estadoAlumno;
		private int idTipoAcademico;
		private int idEscuela;
		private Date fechaRegistro;
		private String usuarioRegistro;
		private Date fechaModificacion;
		private String usuarioModificacion;
	}



