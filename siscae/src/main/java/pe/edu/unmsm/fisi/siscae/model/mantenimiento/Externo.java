package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Externo {
	private Persona persona;
	
	@NotNull(message = "{NotNull.Externo.estadoExterno}")
    @NotBlank(message = "{NotBlank.Prestamo.estadoExterno}")
    @Length(min = 3, max = 20, message = "{Length.CodigoProcesoSwitch.estadoExterno}")
	private String estadoExterno;
	private Date fechaRegistro;
	private String usuarioRegistro;
	private Date fechaModificacion;
	private String usuarioModificacion;

}
