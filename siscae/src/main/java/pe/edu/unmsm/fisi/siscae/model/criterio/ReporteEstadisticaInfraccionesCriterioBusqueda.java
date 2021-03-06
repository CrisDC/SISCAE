package pe.edu.unmsm.fisi.siscae.model.criterio;

import java.util.List;

import lombok.Data;

@Data
public class ReporteEstadisticaInfraccionesCriterioBusqueda {
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
	private String ejeX;
	//Criterios de los select2 multiples
	private List<Integer> areasEstudio;
	private List<Integer> escuelas;
	private List<String> solicitantes;
	private List<Integer> tipoInfracciones;
	private List<Integer> tipoEstados;
}

