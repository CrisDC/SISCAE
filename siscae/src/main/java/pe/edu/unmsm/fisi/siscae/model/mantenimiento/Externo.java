package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;
import com.fasterxml.jackson.annotation.JsonFormat;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Externo {
	
	private Persona persona;
	
	//@NotNull(message = "{NotNull.Externo.estadoExterno}")
	private Integer idEstadoTabla;
	
	private Integer idExterno;
	private String descripcionCorta;
	private Integer numDocumento;
	private String nombre;
	private String appPaterno;
	private String appMaterno;
	private String estado; 


}
