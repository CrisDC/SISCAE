package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.utilitario.Regex;

import java.time.LocalTime;
import java.util.Date;

import javax.validation.constraints.Digits;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;
import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	
	@Digits(integer=4, fraction=2)
	private double tiempoMax;
	
	@Size(min=3, max=60)
	@Length(min = 3, max = 60)
	@NotBlank(message = "{NotBlank.Horario.descripcion}")
	@Pattern(regexp = Regex.ALFANUMERICO, message = "{Pattern.Horario.descripcion}")
	private String descripcion;
	
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Horario.id_estado_tabla}")
	private Integer idEstadoTabla;
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Horario.id_turno}")
	private Integer idTurno;
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Horario.id_dia}")
	private Integer idDia;
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Horario.id_tipo_horario}")
	private Integer idTipoHorario;
	
	@Min(1)
	@Max(Integer.MAX_VALUE/2)
	@Pattern(regexp = Regex.SOLO_DIGITOS, message = "{Pattern.Horario.id_area_estudio}")
	private Integer idAreaEstudio;
	
	
		
}
