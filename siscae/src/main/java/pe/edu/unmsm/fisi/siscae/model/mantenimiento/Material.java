package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import com.sun.star.util.DateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor


public class Material {

	private Integer idMaterial;
	
	private String nombreMaterial;
	
	private Integer idTipoMaterial;
	
	private DateTime fechaRegistro;
	
	private String usuarioRegistro;
	
	private DateTime fechaModificacion;
	
	private String usuarioModificacion;
	
	
}
