package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Docente {

	@NotNull(message = "{NotNull.Docente.persona}")
	private Persona persona;
	
	@NotNull(message = "{NotNull.Docente.estadoDocente}")
	@NotBlank(message = "{NotBlank.Docente.estadoDocente}")
	@Length(min = 5, max = 20, message = "{Length.Docente.estadoDocente}", groups = IBasico.class)
	@Pattern(regexp = Regex.SOLO_LETRAS_A_a, message = "{Pattern.Docente.estadoDocente}")
	private String estadoDocente;
	
	private Date fechaRegistro;
	
	private String usuarioRegistro;
	
	private Date fechaModificacion;
	
	private String usuarioModificacion;

}
