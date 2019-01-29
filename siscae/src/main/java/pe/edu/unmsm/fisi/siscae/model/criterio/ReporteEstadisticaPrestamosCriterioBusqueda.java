package pe.edu.unmsm.fisi.siscae.model.criterio;


import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaPrestamosCriterioBusqueda {
	
	//Criterios del periodo
	private String tipoPeriodo;
	private String serie;
	private String criterioSegmentacion;
	private String fechaInicio;
	private String fechaFin;
	private Integer mesInicio;
	private Integer mesFin;
	private Integer anioInicio;
	private Integer anioFin;
	private Integer semanaInicio;
	private Integer semanaFin;
	
	//Criterios de los select2 multiples
	private List<Integer> areasEstudio;
	private List<Integer> escuelas;
	private List<String> solicitantes;
	private List<Integer> recursos;
}
