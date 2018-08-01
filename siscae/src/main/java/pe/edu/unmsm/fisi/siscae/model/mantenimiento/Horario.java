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
	private  LocalTime horaInicio;
	private LocalTime horaFin;
	
	@NotNull
	private boolean estado;
	
	@Digits(integer=4, fraction=2)
	private double tiempoMax;
	
	private Integer idTurno;
	private Integer idDia;
	private Integer idTipoHorario;
	private Integer idAreaEstudio;
	
	@NotNull
	@PastOrPresent
	private Date fechaRegistro;
	
	@NotBlank
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	private String usuarioRegistro;
	
	@NotNull
	@PastOrPresent
	private Date fechaModificacion;
	
	@NotBlank
	@Size(min=3, max=45)
	@Length(min = 3, max = 45)
	private String usuarioModificacion;
		
}
