package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaRankingAlumno {

	
	private String nombres;
    private String codigo;
    private int cantidad;
    private String escuela;
    private int idArea;
    private int idEscuela;
    private int idFacultad;
    
	
}
