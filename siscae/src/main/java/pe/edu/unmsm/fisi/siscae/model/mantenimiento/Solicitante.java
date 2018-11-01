
package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.sql.Date;

import lombok.Data;

@Data
public class Solicitante {
	int idTipoDocumentoSolicitante;
    String numDocumentoSolicitante;
    String appPaterno;
    String appMaterno;
    String nombre;
    String sexo;
    Date fechaNac;
    String telefono;
    int tipoAcademico;
    String ocupacion;
    int idEscuela;
    String codigoAlumno;
    String usuario;
}