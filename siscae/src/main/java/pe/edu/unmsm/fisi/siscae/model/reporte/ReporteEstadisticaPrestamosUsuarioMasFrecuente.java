package pe.edu.unmsm.fisi.siscae.model.reporte;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaPrestamosUsuarioMasFrecuente {
	String areaEstudio;
	String codigo;
	String numeroVisitas;
	String nombre;
	String appPaterno;
	String appMaterno;
}
