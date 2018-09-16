package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;

import java.util.Date;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
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
public class AreaAdministrativo {
	private Integer idAreaAdministrativo;
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.AreaAdministrativo.id_Area_Estudio}")
	private Integer idAreaEstudio;
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.AreaAdministrativo.id_Administrativo}")
	private Integer idAdministrativo;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_inicio}")
	private Date fechaInicio;
	
	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_fin}")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	private Date fechaFin;
	
	@Size(min=3,max=30)
    @Length(min = 3, max = 30)
	@NotNull(message = "{NotNull.AreaAdministrativo.cargo}")
	@NotBlank(message = "{NotBlank.AreaAdministrativo.cargo}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaAdministrativo.cargo}")
	private String cargo;
	
	@PastOrPresent
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_registro}")
	private Date fechaRegistro;
	
	@Size(min=3,max=45)
	@Length(min = 3, max = 45)
	@NotNull(message = "{NotNull.AreaAdministrativo.usuario_registro}")
	@NotBlank(message = "{NotBlank.AreaAdministrativo.usuario_registro}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaAdministrativo.usuario_registro}")
	private String usuarioRegistro;
	

	@NotNull(message = "{NotNull.AreaAdministrativo.fecha_modificacion}")
	@PastOrPresent
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
	private Date fechaModificacion;
	
	@Size(min=3,max=45)
	@Length(min = 3, max = 45)
	@NotNull(message = "{NotNull.AreaAdministrativo.usuario_modificacion}")
	@NotBlank(message = "{NotBlank.AreaAdministrativo.usuario_modificacion}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.AreaAdministrativo.usuario_modificacion}")
	private String usuarioModificacion;

	private String nombreAreaEstudio;
	private String nombreAdministrativo;
	private String appPatAdministrativo;
	private String appMatAdministrativo;
	private String codigo;
	
}
