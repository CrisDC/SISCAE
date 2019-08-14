package pe.edu.unmsm.fisi.siscae.model.consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaInfracciones {

	    String nombre;
	    String numeroDocumento;
	    String appPaterno;
	    String appMaterno;
	    String descripcion;
	    String fechaInfraccion;
	    String estadoInfraccion;
	    String estadoSolicitante;
	
}
