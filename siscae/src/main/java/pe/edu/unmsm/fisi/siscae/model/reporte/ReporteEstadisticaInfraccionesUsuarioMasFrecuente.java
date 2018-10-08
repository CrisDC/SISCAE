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
public class ReporteEstadisticaInfraccionesUsuarioMasFrecuente {
	String areaEstudio;
	String dni;
	String numeroInfracciones;
	String nombre;
	String appPaterno;
	String appMaterno;
}
