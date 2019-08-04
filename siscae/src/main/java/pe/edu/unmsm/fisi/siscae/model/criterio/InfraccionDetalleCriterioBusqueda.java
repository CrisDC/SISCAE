package pe.edu.unmsm.fisi.siscae.model.criterio;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.criterio.ReporteEstadisticaPrestamosCriterioBusqueda.ReporteEstadisticaPrestamosCriterioBusquedaBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfraccionDetalleCriterioBusqueda {

	private String numDocumento;
	private int idTipoDocumento;
	private int tipoInfraccion;
	private int tipoEstado;
	
	//fechas
	private String fechaInicio;
	private String fechaFin;
	private Integer mesInicio;
	private Integer mesFin;
	private Integer anioInicio;
	private Integer anioFin;
	private Integer semanaInicio;
	private Integer semanaFin;
	
}
