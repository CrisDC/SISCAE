package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AreaEstudio {
private Integer idAreaEstudio;
	
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	@NotBlank(message = "{NotBlank.AreaEstudio.nombre}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.nombre}")
	private String nombre;
	
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	@NotBlank(message = "{NotBlank.AreaEstudio.pabellon}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.pabellon}")
	private String pabellon;
	
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	@NotBlank(message = "{NotBlank.AreaEstudio.nivel}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.nivel}")
	private String nivel ;
	
	@PastOrPresent
	@NotNull(message = "{NotNull.Horario.fecha_registro}")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	private Date fechaRegistro;
	
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	@NotBlank(message = "{NotBlank.AreaEstudio.usuario_registro}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.usuario_registro}")
	private String usuarioRegistro;
	
	@PastOrPresent
	@NotNull(message = "{NotNull.Area_Estudio.fecha_modificacion}")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	private Date fechaModificacion;
	
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	@NotBlank(message = "{NotBlank.AreaEstudio.usuario_modificacion}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaEstudio.usuario_modificacion}")
	private String usuarioModificacion;
	
}
