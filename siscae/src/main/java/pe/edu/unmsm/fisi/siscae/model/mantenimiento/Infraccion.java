package pe.edu.unmsm.fisi.siscae.model.mantenimiento;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.sun.star.util.DateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class Infraccion {
	private Integer idInfraccion;
	private String descripcion;
	private DateTime fecha;
	private Boolean estado;
	private Integer idPersona;
	private Integer idTipoInfraccion;
	private DateTime fechaRegistro;
	private String usuarioRegistro;
	private DateTime fechaModificacion;
	private String usuarioModificacion;
	
	
	
	


}
