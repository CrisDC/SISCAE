package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.mantenimiento.Recurso.RecursoBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Sancionado {
	
	private int idPersona;
	private String doc;
	private String nombre;
	private String apPat;
	private String appMat;
	private String fechaRe;
	private String fechaLi;
	private String tiempo;
	private String tipo;

}
