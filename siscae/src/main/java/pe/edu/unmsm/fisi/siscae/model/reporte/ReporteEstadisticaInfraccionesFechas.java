package pe.edu.unmsm.fisi.siscae.model.reporte;

import java.sql.Time;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaInfracciones.ReporteEstadisticaInfraccionesBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaInfraccionesFechas {
	String numeroDocumento;
	String tipoDocumento;
	String nombreTipo;
	String appPaterno;
	String appMaterno;
	String nombre;
	int idEscuelaPrograma;
	String escuelaPrograma;
	int codigoInfraccion;
	String gravedad;
	String tipoInfraccion;
	String descripcion;
	int idAreaEstudio;
	String areaEstudio;
	String horaInfraccion;
	String anio;
	String mes;
	String dia;
	String turno;
}
