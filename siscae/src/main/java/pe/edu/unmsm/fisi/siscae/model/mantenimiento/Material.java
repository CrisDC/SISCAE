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
	private String nombreMaterial;
	
	private Integer idTipoMaterial;
	
	
	private String tipo;
}
