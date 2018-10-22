package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.sql.Time;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso.PrestamoRecursoBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolicitantesDetalles {
	String codigo;
	String appPaterno;
	String appMaterno;
	String nombre;
	String escuela;
	String numDocumento;
	String solicitante;
	
}
