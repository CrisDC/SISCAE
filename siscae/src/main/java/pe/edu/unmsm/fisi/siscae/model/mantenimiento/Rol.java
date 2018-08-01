package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Externo.ExternoBuilder;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Rol {
	private Integer idRol;
	
	@NotNull(message = "{NotNull.Rol.nombre}")
    @NotBlank(message = "{NotBlank.Rol.nombre}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.nombre}")
	private String nombre;

}
