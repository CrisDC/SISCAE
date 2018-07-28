package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Persona {

	private Integer idPersona;
	private String numDocumento;
	private String nombre;
	private String appPaterno;
	private String appMaterno;
	private String sexo;
	private Date fechaNac;
	private String numTelef;
	private Integer idTipoDocumento;
	private Date fechaRegistro;
	private String usuarioRegistro;
	private Date fechaModificacion;
	private String usuarioModificacion;

}
