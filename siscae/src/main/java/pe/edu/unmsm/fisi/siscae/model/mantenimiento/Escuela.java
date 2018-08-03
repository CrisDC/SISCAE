package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.NotBlank;

import com.sun.star.bridge.oleautomation.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Escuela {
	private Integer idEscuela;
	
	@NotBlank(message = "{NotBlank.Escuela.nombre}")
	private String nombre;
	
	private Integer idFacultad;
	
	@NotNull(message = "{NotNull.Escuela.fecha_registro}")
	@PastOrPresent
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.Escuela.usuario_registro}")
	@NotBlank(message = "{NotBlank.Escuela.usuario_registro}")
	private String usuarioRegistro;
	
	@NotNull(message = "{NotNull.Escuela.fecha_modificacion}")
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.Escuela.usuario_modificacion}")
	@NotBlank(message = "{NotBlank.Escuela.usuario_modificacion}")
	private String usuarioModificacion;
}
