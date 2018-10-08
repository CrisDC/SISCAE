package pe.edu.unmsm.fisi.siscae.model.reporte;

import java.sql.Time;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaInfraccionesUsuarioMasFrecuente {
	String areaEstudio;
	String dni;
	String numeroInfracciones;
	String appPaterno;
	String appMaterno;
	String nombre;
	
}
