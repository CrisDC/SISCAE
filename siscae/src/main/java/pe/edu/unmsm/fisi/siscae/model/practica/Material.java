package pe.edu.unmsm.fisi.siscae.model.practica;


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

	private int idMaterial;
	
	private String nombreMaterial;
	
	private int idTipoMaterial;
	
	private DateTime fechaRegistro;
	
	private String usuarioRegistro;
	
	private DateTime fechaModificacion;
	
	private String usuarioModificacion;
	
	
}
