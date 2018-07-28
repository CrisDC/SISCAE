package pe.edu.unmsm.fisi.siscae.model.practica;


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

	private int idMaterial;
	
	private String nombreMaterial;
	
	private int idTipoMaterial;
	
	private Date fechaRegistro;
	
	private String usuarioRegistro;
	
	private Date fechaModificacion;
	
	private String usuarioModificacion;
	
	
}
