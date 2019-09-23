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
import pe.edu.unmsm.fisi.siscae.validacion.IdPersona;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.IBasico;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IActualizacion;
import pe.edu.unmsm.fisi.siscae.validacion.grupo.accion.IRegistro;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Persona {

	//@IdPersona(existe = true, groups = IActualizacion.class)
	//@IdPersona(existe = false, message = "Existe.Persona.idPersona", groups = IRegistro.class)
	private Integer idPersona;
	
	private String descripcionCorta;
	
	@NotNull(message = "{NotNull.Persona.numDocumento}")
	@NotBlank(message ="{NotBlank.Persona.numDocumento}")
	@Length(min = 5, max = 20, message = "{Length.Persona.numDocumento}", groups = IBasico.class)
	private String numDocumento;

	//@NotNull(message = "{NotNull.Persona.nombre}")
	//@NotBlank(message = "{NotBlank.Persona.nombre}")
	//@Pattern(regexp = Regex.SOLO_LETRAS_A_a, message = "{Pattern.Persona.nombre}")
	//@Length(min = 3, max = 45, message = "{Length.Persona.nombre}", groups = IBasico.class)
	private String nombre;

	@NotNull(message = "{NotNull.Persona.appPaterno}")
	@NotBlank(message = "{NotBlank.Persona.appPaterno}")
	@Pattern(regexp = Regex.SOLO_LETRAS_A_a, message = "{Pattern.Persona.appPaterno}")
	@Length(min = 3, max = 45, message = "{Length.Persona.appPaterno}", groups = IBasico.class)
	private String appPaterno;

	@NotNull(message = "{NotNull.Persona.appMaterno}")
	@NotBlank(message = "{NotBlank.Persona.appMaterno}")
	@Pattern(regexp = Regex.SOLO_LETRAS_A_a, message = "{Pattern.Persona.appMaterno}")
	@Length(min = 3, max = 45, message = "{Length.Persona.appMaterno}", groups = IBasico.class)
	private String appMaterno;

	@NotNull(message = "{NotNull.Persona.sexo}")
	@NotBlank(message = "{NotBlank.Persona.sexo}")
	@Pattern(regexp = Regex.SOLO_LETRAS_A_a, message = "{Pattern.Persona.sexo}")
	@Length(min = 3, max = 10, message = "{Length.Persona.Sexo}", groups = IBasico.class)
	private String sexo;

	//@NotNull(message = "{NotNull.Persona.fechaNac}")
	//@NotBlank(message = "{NotBlank.Persona.fechaNac}")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    //@NotNull(message = "{NotNull.Persona.fechaNac}")
	private Date fechaNac;

	//@NotNull(message = "{NotNull.Persona.numTelef}")
	//@NotBlank(message = "{NotBlank.Persona.numTelef}")
	@Length(min = 3, max = 20, message = "{Length.Persona.numTelef}", groups = IBasico.class)
	private String numTelef;

	//@NotNull(message = "{NotNull.Persona.idTipoDocumento}")
	//@NotBlank(message = "{NotBlank.Persona.idTipoDocumento}")
	private String idTipoDocumento;

	

}
