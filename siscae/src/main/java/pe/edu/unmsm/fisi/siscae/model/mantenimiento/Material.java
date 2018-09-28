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
public class Material {

	private Integer idMaterial;
	
	@NotNull(message = "{NotNull.Material.nombreMaterial}")
    @NotBlank(message = "{NotBlank.Material.nombreMaterial}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.nombreMaterial}")
	private String nombre;
	
	private Integer idTipoMaterial;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Material.fechaRegistro}")
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.Material.usuarioRegistro}")
    @NotBlank(message = "{NotBlank.Material.usuarioRegistro}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioRegistro}")
	private String usuarioRegistro;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "EST")
    @NotNull(message = "{NotNull.Material.fechaModificacion}")
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.Material.usuarioModificacion}")
    @NotBlank(message = "{NotBlank.Material.usuarioModificacion}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.usuarioModificacion}")
	private String usuarioModificacion;
	
	private String tipo;
}
