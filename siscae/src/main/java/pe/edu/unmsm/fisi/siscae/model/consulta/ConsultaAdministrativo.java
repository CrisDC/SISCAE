package pe.edu.unmsm.fisi.siscae.model.consulta;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pe.edu.unmsm.fisi.siscae.model.consulta.ConsultaSancionados.ConsultaSancionadosBuilder;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaAdministrativo {

	String nombre;
	String appPaterno;
	String appMaterno;
	String usuario;
	String cargo;
	String areaEstudio;

}
