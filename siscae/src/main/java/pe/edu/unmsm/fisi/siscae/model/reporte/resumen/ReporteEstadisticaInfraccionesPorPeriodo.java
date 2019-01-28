package pe.edu.unmsm.fisi.siscae.model.reporte.resumen;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaInfraccionesPorPeriodo {
	Integer numeroInfracciones;
	String periodoInfraccion;
	String gradoDeIncidenciaPromedio;
}