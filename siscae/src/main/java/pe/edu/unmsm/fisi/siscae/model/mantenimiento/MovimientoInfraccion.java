package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.Data;

@Data
public class MovimientoInfraccion {

	String numDocumento;
	String nombreUsuario;
	String descripcion;
	Integer idTipoInfraccion;
	
}
