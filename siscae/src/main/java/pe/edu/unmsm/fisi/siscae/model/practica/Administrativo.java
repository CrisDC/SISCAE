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

public class Administrativo {

	private int idAdministrativo;
	
	private String codigoAdm;
	
	private DateTime fechaRegistro;
	
	private String usuarioRegistro;
	
	private DateTime fechaModificacion;
	
	private String usuarioModificacion;
	
	
}
