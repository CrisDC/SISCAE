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
public class Escuela {
	private Integer idEscuela;
	private String nombre;
	private int idFacultad;
	private Date fechaRegistro;
	private String usuarioRegistro;
	private Date fechaModificacion;
	private String usuarioModificacion;
}
