package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Administrativo {

	
	private Integer idAdministrativo;
	
	@NotNull(message = "{NotNull.Administrativo.codigoAdm}")
    @NotBlank(message = "{NotBlank.Administrativo.codigoAdm}")
    @Length(min = 3, max = 20, message = "{Length.CodigoProcesoSwitch.codigoAdm}")
	private String codigoAdm;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Administrativo.fechaRegistro}")
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.Administrativo.usuarioRegistro}")
    @NotBlank(message = "{NotBlank.Administrativo.usuarioRegistro}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioRegistro}")
	private String usuarioRegistro;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.ParametroGeneral.fechaProceso}")
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.Administrativo.usuarioModificacion}")
    @NotBlank(message = "{NotBlank.Administrativo.usuarioModificacion}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioModificacion}")
	private String usuarioModificacion;
	
	
}
