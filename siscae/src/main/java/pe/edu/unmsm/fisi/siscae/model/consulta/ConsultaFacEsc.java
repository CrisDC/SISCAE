package pe.edu.unmsm.fisi.siscae.model.consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaRankingAlumno.ConsultaRankingAlumnoBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaFacEsc {

	
	private String escuela;
    private String facultad;
    private int cantidad;
	
}
