package pe.edu.unmsm.fisi.siscae.model.mantenimiento;


import java.util.Date;

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
	
	private Date fechaRegistro;
	
	private String usuarioRegistro;
	
	private Date fechaModificacion;
	
	private String usuarioModificacion;
	
	
}