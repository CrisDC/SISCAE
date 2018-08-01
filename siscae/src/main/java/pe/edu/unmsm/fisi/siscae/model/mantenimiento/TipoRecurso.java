package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TipoRecurso {
	private Integer idTipoRecurso;
	
	@NotNull(message = "{NotNull.Externo.nombre}")
    @NotBlank(message = "{NotBlank.Externo.nombre}")
    @Length(min = 3, max = 20, message = "{Length.CodigoProcesoSwitch.nombre}")
	private String nombre;
	
	@NotNull(message = "{NotNull.Externo.nombre}")
    @NotBlank(message = "{NotBlank.Externo.nombre}")
    @Length(min = 10, max  = 45, message = "{Length.CodigoProcesoSwitch.nombre}")
	private String descripcion;
	
	@NotNull(message = "{NotNull.Externo.nombre}")
    @NotBlank(message = "{NotBlank.Externo.nombre}")
    @Length(min = 10, max  = 20, message = "{Length.CodigoProcesoSwitch.nombre}")
	private String uso;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Externo.fechaRegistro}")
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.Externo.usuarioRegistro}")
    @NotBlank(message = "{NotBlank.Externo.usuarioRegistro}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioRegistro}")
	private String usuarioRegistro;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.ParametroGeneral.fechaProceso}")
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.Externo.usuarioModificacion}")
    @NotBlank(message = "{NotBlank.Externo.usuarioModificacion}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioModificacion}")
	private String usuarioModificacion;

}
