package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.sql.Time;
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
public class PrestamoRecurso
{
	int idRecurso;
	String numero;
	String tipoRecurso;
	int maxCapacidad;
	Date fechaPrestamo;
	String horaEntrada; // este tipo de datos si funciona
	Time horaSalida; // este tipo de datos si funciona
	String estado;
	String nombre;
	String appPaterno;
	String appMaterno;
	String codigoAlumno;
	String numDocumento;
	String areaEstudio;
	String observacion;
	int cantidadPrestamos;
}
