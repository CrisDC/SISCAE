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
public class PrestamoRecursoTabla implements Comparable
{	
	int orden; // agregado para ordenar la tabla solo visualmente, solo sirve para eso
	int idRecurso;
	String numero;
	String tipoRecurso;
	int maxCapacidad;
	Date fechaPrestamo;
	String horaEntrada; // este tipo de datos si funciona
	Time horaSalida; // este tipo de datos si funciona
	String estado;
	String nombre;
	String appPaterno;
	String appMaterno;
	String codigoAlumno;
	String numDocumento;
	String areaEstudio;
	String observacion;
	int cantidadPrestamos;
	
	@Override
	public int compareTo(Object o) {
		PrestamoRecursoTabla pr = (PrestamoRecursoTabla)o;
		int n1=Integer.valueOf(this.numero);
		int n2=Integer.valueOf(pr.numero);
		if(n1==n2){
			return 1;
		}else{
			if(n1>n2){
				return 1;
			}else{
				return -1;
			}
		}
	}
}