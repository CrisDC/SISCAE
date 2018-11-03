package pe.edu.unmsm.fisi.siscae.model.consulta;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaSancionados.ConsultaSancionadosBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaAdministrativo implements Serializable {

	/**
     * 
     */
    private static final long serialVersionUID = 1L;
    private String nombre;
	private String appPaterno;
	private String appMaterno;
	private String usuario;
	private String cargo;
	private String areaEstudio;

}
