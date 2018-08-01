package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.util.Date;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Administrativo {

	private Persona persona;
	
	@NotNull(message = "{NotNull.Administrativo.codigoAdm}")
    @NotBlank(message = "{NotBlank.Administrativo.codigoAdm}")
    @Length(min = 3, max = 20, message = "{Length.CodigoProcesoSwitch.codigoAdm}")
	private String codigoAdm;
	
	private Date fechaRegistro;
	
	private String usuarioRegistro;
	
	private Date fechaModificacion;
	
	private String usuarioModificacion;
	
	
}
