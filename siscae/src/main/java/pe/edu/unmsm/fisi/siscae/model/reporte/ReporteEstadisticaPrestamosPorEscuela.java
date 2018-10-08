package pe.edu.unmsm.fisi.siscae.model.reporte;

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
public class ReporteEstadisticaPrestamosPorEscuela {
	int idEscuela;
	String escuela;
	String areaEstudio;
	String numeroPrestamo;
	float  promedioTiempo;
}
