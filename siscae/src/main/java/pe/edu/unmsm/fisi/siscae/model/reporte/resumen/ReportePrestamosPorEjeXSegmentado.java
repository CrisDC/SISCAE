package pe.edu.unmsm.fisi.siscae.model.reporte.resumen;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReportePrestamosPorEjeXSegmentado {
	private String ejeX;
	private List<ReportePrestamosPorEjeXSegmentadoDetalle> detalle;
}
