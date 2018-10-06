package pe.edu.unmsm.fisi.siscae.model.reporte;

import java.sql.Time;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso;
import pe.edu.unmsm.fisi.siscae.model.consulta.PrestamoRecurso.PrestamoRecursoBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticoPrestamos {
	String recurso;
	String escuela;
	String codigo;
	String nombre;
	String appPaterno;
	String appMaterno;
	String turno;
	Date fechaRegistro;
	Time estadia;
	String areaEstudio;
	
}
