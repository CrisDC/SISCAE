package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

	private Integer idUsuario;
	
	@NotNull(message = "{NotNull.Usuario.username}")
    @NotBlank(message = "{NotBlank.Usuario.username}")
    @Length(min = 3, max = 45, message = "{Length.CodigoProcesoSwitch.username}")
	private String username;
	
	@NotNull(message = "{NotNull.Usuario.pass}")
    @NotBlank(message = "{NotBlank.Usuario.pass}")
    @Length(min = 3, max = 200, message = "{Length.CodigoProcesoSwitch.pass}")
	private String pass;
	
	@NotNull(message = "{NotNull.Usuario.estado}")
	private Integer idEstadoTabla;
	
	private Integer idRol;
	
	private Integer idPersona;
	private String nombreRol;
 
	
	
}
