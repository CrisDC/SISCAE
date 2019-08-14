package pe.edu.unmsm.fisi.siscae.model.consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
public class ConsultaInfracciones {

	    private String nombre;
	    private String numeroDocumento;
	    private String appPaterno;
	    private String appMaterno;
	    private String descripcion;
	    private String fechaInfraccion;
	    private String estadoInfraccion;
	    private String estadoSolicitante;
	
}
