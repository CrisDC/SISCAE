package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import java.time.LocalTime;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EstadoAula {
	int idRecurso;
	String numero;
	String tipoRecurso;
	int maxCapacidad;
	Date fechaPrestamo;
	LocalTime horaEntrada;
	LocalTime horaSalida;
	String estado;
	String nombre;
	String appPaterno;
	String appMaterno;
	String codigoAlumno;
}
