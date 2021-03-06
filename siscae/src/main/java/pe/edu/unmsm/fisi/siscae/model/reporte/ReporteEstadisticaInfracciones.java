package pe.edu.unmsm.fisi.siscae.model.reporte;

import java.sql.Time;
import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamos.ReporteEstadisticaPrestamosBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaInfracciones {
	
	String numeroDocumento;
	String tipoDocumento;
	String nombreTipo;
	String appPaterno;
	String appMaterno;
	String nombre;
	String estadoInfraccion;
	int idEscuelaPrograma;
	String escuelaPrograma;
	int codigoInfraccion;
	String gravedad;
	String tipoInfraccion;
	String descripcion;
	Time horaInfraccion;
	Date fechaInfraccion;
	String turno;
	int idAreaEstudio;
	String areaEstudio;
	String estadoSolicitante;
	
}
