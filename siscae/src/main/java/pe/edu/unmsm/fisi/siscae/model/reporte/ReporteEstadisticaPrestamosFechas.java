package pe.edu.unmsm.fisi.siscae.model.reporte;

import java.sql.Time;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReporteEstadisticaPrestamosFechas {
	String recurso;
	int idEscuela;
	String escuela;
	String nombreTipo;
	int idPersona;
	String codigo;
	String nombre;
	String appPaterno;
	String appMaterno;
	int idAreaEstudio;
	String areaEstudio;
	String turno;
	String horaPrestamo;
	String anio;
	String mes;
	String dia;
	String estadia;
}
