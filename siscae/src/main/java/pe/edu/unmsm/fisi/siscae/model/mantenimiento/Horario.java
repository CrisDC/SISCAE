package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;
import java.util.Date;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Horario {
	
	private  Integer idHorario;
	
	@NotNull(message = "{NotNull.Horario.hora_inicio}")
	private  LocalTime horaInicio;
	
	@NotNull(message = "{NotNull.Horario.hora_fin}")
	private LocalTime horaFin;
	
	@NotNull(message = "{NotNull.Horario.estado}")
	private boolean estado;
	
	@Digits(integer=4, fraction=2)
	private double tiempoMax;
	
	private Integer idTurno;
	private Integer idDia;
	private Integer idTipoHorario;
	private Integer idAreaEstudio;
	
	@NotNull(message = "{NotNull.Horario.fecha_registro}")
	@PastOrPresent
	private Date fechaRegistro;
	
	@NotNull(message = "{NotNull.Horario.usuario_registro}")
	@NotBlank(message = "{NotBlank.Horario.usuario_registro}")
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	private String usuarioRegistro;
	
	@NotNull(message = "{NotNull.Horario.fecha_modificacion}")
	@PastOrPresent
	private Date fechaModificacion;
	
	@NotNull(message = "{NotNull.Horario.usuario_modificacion}")
	@NotBlank(message = "{NotBlank.Horario.usuario_modificacion}")
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	private String usuarioModificacion;
		
}
