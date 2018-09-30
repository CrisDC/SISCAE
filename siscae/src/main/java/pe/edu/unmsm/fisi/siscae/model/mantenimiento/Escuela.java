package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sun.star.bridge.oleautomation.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Escuela {
	private Integer idEscuela;

	@Size(min = 3, max = 60)
	@Length(min = 3, max = 60)
	@NotBlank(message = "{NotBlank.Escuela.nombre}")
	@Pattern(regexp = Regex.SOLO_LETRAS_A_a, message = "{Pattern.Escuela.nombre}")
	private String nombre;

	@Max(Integer.MAX_VALUE / 2)
	@Min(1)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Escuela.idFacultad}")
	private Integer idFacultad;

	private String nombreFacultad;// agregue karen

	@NotNull(message = "{NotNull.Escuela.fecha_registro}")
	@PastOrPresent
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	private Date fechaRegistro;

	@NotNull(message = "{NotNull.Escuela.usuario_registro}")
	@NotBlank(message = "{NotBlank.Escuela.usuario_registro}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.Escuela.usuario_registro}")
	private String usuarioRegistro;

	@NotNull(message = "{NotNull.Escuela.fecha_modificacion}")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	private Date fechaModificacion;

	@NotNull(message = "{NotNull.Escuela.usuario_modificacion}")
	@NotBlank(message = "{NotBlank.Escuela.usuario_modificacion}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.Escuela.usuario_modificacion}")
	private String usuarioModificacion;
}
