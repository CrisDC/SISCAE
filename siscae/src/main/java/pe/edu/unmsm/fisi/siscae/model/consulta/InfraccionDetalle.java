package pe.edu.unmsm.fisi.siscae.model.consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfraccionDetalle {
	
	String numDocumento;
	String appPaterno;
	String appMaterno;
	String nombre;
	String tipoPersona;
	String infraccion;
	String estado;
	String fecha;
	int idEstadoTabla;
	int idPersona;
	int idTipoInfraccion;
	int idInfraccion;
	String descripcion;
	String areaEstudio;
	
}
