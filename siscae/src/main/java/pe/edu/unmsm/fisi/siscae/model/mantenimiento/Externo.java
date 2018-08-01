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

public class Externo {
	
	
	private Integer idExterno;
	
	@NotNull(message = "{NotNull.Externo.estadoExterno}")
    @NotBlank(message = "{NotBlank.Prestamo.estadoExterno}")
    @Length(min = 3, max = 20, message = "{Length.CodigoProcesoSwitch.estadoExterno}")
	private String estadoExterno;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Prestamo.fechaRegistro}")
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.Prestamo.usuarioRegistro}")
    @NotBlank(message = "{NotBlank.Prestamo.usuarioRegistro}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioRegistro}")
	private String usuarioRegistro;
	
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Prestamo.fechaModificacion}")
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.Prestamo.usuarioModificacion}")
    @NotBlank(message = "{NotBlank.Prestamo.usuarioModificacion}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioModificacion}")
	private String usuarioModificacion;


}
