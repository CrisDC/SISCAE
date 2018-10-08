package pe.edu.unmsm.fisi.siscae.model.reporte;

import java.sql.Time;
import java.util.Date;

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

	String codigo;
	String nombre;
	String appPaterno;
	String appMaterno;
	String tipoInfraccion;
	Date fechaInfraccion;
	String estadoInfraccion;
	String areaEstudio;
}
