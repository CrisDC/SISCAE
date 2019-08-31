package pe.edu.unmsm.fisi.siscae.model.criterio;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class PrestamoDetalle2CriterioBusqueda {

	//primera parte
		private String numeroDocumento;
		private String tipoPersona;
		private int tipoRecurso;
		private int recurso;
		private int areaEstudio;
		private String tipoPeriodo;
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
