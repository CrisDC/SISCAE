package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;


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
	
	
	
	private String nombre;

	private String appPaterno;

	private String appMaterno;

	private String sexo;

	private String numTelef;
	
	
}
