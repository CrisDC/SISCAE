package pe.edu.unmsm.fisi.siscae.model.reporte;

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
public class ReporteEstadisticaInfraccionesPorEscuela {
	
	int idAreaEstudio;
	String areaEstudio;
	int idEscuelaPrograma;
	String escuelaPrograma;
	int numeroInfracciones;
}
