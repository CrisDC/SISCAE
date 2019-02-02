package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.util.Date;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

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
public class Docente {

	//@NotNull(message = "{NotNull.Docente.persona}")
	private Persona persona;
	
	//@NotNull(message = "{NotNull.Docente.estadoDocente}")
	private Integer idEstadoTabla;
	private Integer idDocente;
	private String descripcionCorta;
	private Integer numDocumento;
	private String nombre;
	private String appPaterno;
	private String appMaterno;
	private String estado; 

}
