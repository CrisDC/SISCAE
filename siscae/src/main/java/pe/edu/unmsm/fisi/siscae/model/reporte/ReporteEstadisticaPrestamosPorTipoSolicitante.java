package pe.edu.unmsm.fisi.siscae.model.reporte;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.reporte.ReporteEstadisticaPrestamosPorAreaEstudio.ReporteEstadisticaPrestamosPorAreaEstudioBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaPrestamosPorTipoSolicitante {
	String areaEstudio;
	String nombreTipo;
	String numeroVisitas;
	float  promedioTiempo;

}
