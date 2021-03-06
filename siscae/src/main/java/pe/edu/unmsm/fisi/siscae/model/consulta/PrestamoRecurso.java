package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrestamoRecurso implements Comparable
{
	int idRecurso;
	String numero;
	String tipoRecurso;
	int maxCapacidad;
	String estado;
	String areaEstudio;
	String observacion;
	int cantidadPrestamos;
	@Override
	public int compareTo(Object o) {
		PrestamoRecurso pr = (PrestamoRecurso)o;
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
