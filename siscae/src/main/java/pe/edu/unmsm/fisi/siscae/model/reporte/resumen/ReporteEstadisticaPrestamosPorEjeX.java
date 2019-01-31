package pe.edu.unmsm.fisi.siscae.model.reporte.resumen;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaPrestamosPorEjeX {
	Integer numeroPrestamos;
	String ejeX;
	String estadiaTotal;
	String estadiaPromedio;
	
	//criterios
	String segmento;

}
