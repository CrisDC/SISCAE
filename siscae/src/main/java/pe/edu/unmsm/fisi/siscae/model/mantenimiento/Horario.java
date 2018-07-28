package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;
import java.util.Date;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Horario {
	private  Integer idHorario;
	private  LocalTime horaInicio;
	private LocalTime horaFin;
	private boolean estado;
	private double tiempoMax;
	private Integer idTurno;
	private Integer idDia;
	private Integer idTipoHorario;
	private Integer idAreaEstudio;
	private Date fechaRegistro;
	private String usuarioRegistro;
	private Date fechaModificacion;
	private String usuarioModificacion;
		
}
