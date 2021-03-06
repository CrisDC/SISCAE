package pe.edu.unmsm.fisi.siscae.model.reporte;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaInfraccionesPorTipoSolicitante {
	int idAreaEstudio;
	String areaEstudio;
	String nombreTipo;
	int numeroInfracciones;

}
