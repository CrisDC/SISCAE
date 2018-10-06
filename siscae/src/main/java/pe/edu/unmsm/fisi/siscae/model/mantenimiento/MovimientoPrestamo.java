package pe.edu.unmsm.fisi.siscae.model.mantenimiento;

import lombok.Data;

@Data
public class MovimientoPrestamo {
	
	String numDocumentoSolicitante;
    int idUsuario;
    String nombreUsuario;
    int idRecurso;
}